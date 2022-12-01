import {app, dialog, ipcMain} from 'electron';
import {debounce, DebouncedFunc} from 'lodash';
import {i18n} from './locales';
import {saveJsonFile} from './json-file';
import {openWithTempFile} from './open-with-temp-file';
import {
	deleteStory,
	loadStories,
	renameStory,
	saveStoryHtml
} from './story-file';
import {loadStoryFormats} from './story-formats';
import {loadPrefs} from './prefs';
import {Story} from '../../store/stories';

export function initIpc() {

	/**
	 * 스토리를 ID로 각각 구분해서 관리한다는 소리인듯
	 */

	// We want to debounce story saves so we aren't constantly writing to disk.
	// However, we need to have individual debounced functions per story so that
	// saves on multiple stories in one interval aren't lost. So we maintain a set
	// of debounced functions keyed by story ID.
	//
	// These still take an argument because the individual invocations will see a
	// different story object each time.

	const storySavers: Record<
		string,
		DebouncedFunc<
			(event: any, story: Story, storyHtml: string) => Promise<void>
		>
	> = {};

	ipcMain.on('delete-story', async (event, story) => {            // 메인 프로세스에서 랜더러 프로세스와 통신
		try {
			await deleteStory(story);                          // 스토리 파일 삭제 함수
			event.sender.send('story-deleted', story);        // 정상적으로 삭제 되었다는 메세지
		} catch (error) {
			dialog.showErrorBox(
				i18n.t('electron.errors.storyDelete'),
				(error as Error).message
			);
			throw error;
		}
	});

	// These use handle() so that they can return data to the renderer process.
	// 뭔지 모르겠음

	ipcMain.handle('load-prefs', async () => {
		try {
			return await loadPrefs();
		} catch (error) {
			console.warn(`Could not load prefs, returning empty object: ${error}`);
			return {};
		}
	});

	ipcMain.handle('load-stories', loadStories);             // 스토리 파일 로딩

	ipcMain.handle('load-story-formats', async () => {        // 스토리 포맷 로딩
		try {
			return await loadStoryFormats();
		} catch (error) {
			console.warn(
				`Could not load story formats, returning empty array: ${error}`
			);
			return [];
		}
	});

	ipcMain.on('open-with-temp-file', (event, data: string, suffix: string) =>
		openWithTempFile(data, suffix)
	);

	// This doesn't use handle() because state reducers in the renderer process
	// can't be be asynchronous--we have to send a signal back.

	ipcMain.on('rename-story', async (event, oldStory, newStory) => {            // 스토리 파일 이름 바꾸기
		try {
			await renameStory(oldStory, newStory);
			event.sender.send('story-renamed', oldStory, newStory);
		} catch (error) {
			dialog.showErrorBox(
				i18n.t('electron.errors.storyRename'),
				(error as Error).message
			);
			throw error;
		}
	});

	ipcMain.on('save-json', async (event, filename: string, data: any) => {     // json 파일이 뭔지 모르겠음
		try {
			await saveJsonFile(filename, data);
		} catch (error) {
			dialog.showErrorBox(
				i18n.t('electron.errors.jsonSave'),
				(error as Error).message
			);
			throw error;
		}
	});

	ipcMain.on('save-story-html', async (event, story, storyHtml) => {     // 스토리 HTML 파일 저장
		try {
			if (typeof storyHtml !== 'string') {
				throw new Error('Asked to save non-string as story HTML');
			}

			if (storyHtml.trim() === '') {
				throw new Error('Asked to save empty string as story HTML');
			}

			if (!storySavers[story.id]) {
				storySavers[story.id] = debounce(             // debounce는 함수가 호출되는 속도를 제한하는 리액트 훅
					async (
						saverEvent: any,
						saverStory: Story,
						saverStoryHtml: string
					) => {
						try {
							await saveStoryHtml(saverStory, saverStoryHtml);
							saverEvent.sender.send('story-html-saved', saverStory);
						} catch (error) {
							dialog.showErrorBox(
								i18n.t('electron.errors.storySave'),
								(error as Error).message
							);
							throw error;
						}
					},
					1000,
					{leading: true, trailing: true}
				);
			}

			storySavers[story.id](event, story, storyHtml);
		} catch (error) {
			dialog.showErrorBox(
				i18n.t('electron.errors.storySave'),
				(error as Error).message
			);
			throw error;
		}
	});

	app.on('will-quit', async () => {
		if (Object.keys(storySavers).length > 0) {
			// Flush all pending story saves.

			for (const storyId of Object.keys(storySavers)) {
				console.log(`Flushing pending story saves for story ID ${storyId}`);
				await storySavers[storyId].flush();
			}

			console.log('All pending story saves flushed successfully');
		} else {
			console.log('No pending story saves to flush');
		}
	});
}
