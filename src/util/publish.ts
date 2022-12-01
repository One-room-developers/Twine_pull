import escape from 'lodash/escape';
import {Passage, Story} from '../store/stories';
import {AppInfo} from './app-info';
import {i18n} from './i18n';

export interface PublishOptions {
	/**
	 * Options that will be passed as-is to the format in the `options` attribute
	 * of the published `<tw-storydata>` tag.
	 * 
	 * 스토리 파일의 포맷
	 * 스토리 파일이 HTML형태로 저장될 때, 가장 바깥에 <tw-storydata> 태그가 있음
	 * <tw-storydata>의 format 속성에 전달되는 값
	 */
	formatOptions?: string;

	/**
	 * ID of the passage to start the story at. This overrides what is set at the
	 * story level.
	 * 
	 * 시작 passage의 아이디
	 * 뒷문장은 무슨 소린지 모르겠음
	 */
	startId?: string;

	/**
	 * If true, publishing will proceed even if the story has no starting passage
	 * set and one wasn't set manually.
	 * 
	 * 스토리의 시작 passage가 설정되어 있지 않더라도 HTML파일로 만들어진다.
	 */
	startOptional?: boolean;
}

/**
 * Returns a filename for an archive file.
 * 
 * 아카이브 파일의 파일명을 반환
 */
export function archiveFilename() {
	const timestamp = new Date().toLocaleString().replace(/[/:\\]/g, '.');    // 지정된 지역에서 표현하는 방식의 날짜를 문자열로 리턴

	return i18n.t('store.archiveFilename', {timestamp});         // 해당 지역의 문자열로 번역
}

/**
 * Publishes an archive of stories, e.g. all stories in one file with no story
 * format binding.
 * 
 * 아카이브 파일 퍼블리싱.
 * 모든 스토리 파일을 한꺼번에 내보냄
 */
export function publishArchive(stories: Story[], appInfo: AppInfo) {
	return stories.reduce((output, story) => {
		// Force publishing even if there is no start point set.
		// 스토리에 시작 지점이 없더라도 강제적으로 퍼블리싱

		return (
			output + publishStory(story, appInfo, {startOptional: true}) + '\n\n'
		);
	}, '');
}

/**
 * Publishes a passage to an HTML fragment. This takes a id argument because
 * passages are numbered sequentially in published stories, not with a UUID.
 * 
 * passage를 HTML 조각으로 퍼블리싱.
 * <tw-passagedata> 태그로 감싸는 걸 말하는 것 같음
 * escape()는 &, <, > 등의 특수문자들을 그에 대응하는 HTML 요소로 변환해줌
 * join()은 배열 요소 사이사이에 입력한 내용을 집어넣어준다. 밑에 코드에서는 공백을 넣었다
 */
export function publishPassage(passage: Passage, localId: number) {
	return (
		`<tw-passagedata pid="${escape(localId.toString())}" ` +
		`name="${escape(passage.name)}" ` +
		`tags="${escape(passage.tags.join(' '))}" ` +
		`position="${passage.left},${passage.top}" ` +
		`size="${passage.width},${passage.height}">` +
		`${escape(passage.text)}</tw-passagedata>`
	);
}

/**
 * Does a "naked" publish of a story -- creating an HTML representation of it,
 * but without any story format binding.
 * 
 * 스토리 HTML파일의 초기 형태
 * 스토리 포맷이 없는 상태인듯
 */
export function publishStory(
	story: Story,
	appInfo: AppInfo,
	{formatOptions, startId, startOptional}: PublishOptions = {}
) {
	startId = startId ?? story.startPassage;

	// Verify that the start passage exists.
	// 시작 passage가 있는지 검사

	if (!startOptional) {
		if (!startId) {
			throw new Error(
				'There is no starting point set for this story and none was set manually.'
			);
		}

		if (!story.passages.find(p => p.id === startId)) {
			throw new Error(
				'The passage set as starting point for this story does not exist.'
			);
		}
	}

	// The id of the start passage as it is published (*not* a UUID).
	/**
	 * 스토리 파일의 시작 passage
	 * 이 밑으로 스토리 HTML파일을 생성하는 코드
	 */

	let startLocalId;
	let passageData = '';

	story.passages.forEach((p, index) => {
		passageData += publishPassage(p, index + 1);

		if (p.id === startId) {
			startLocalId = index + 1;
		}
	});

	const tagData = Object.keys(story.tagColors).reduce(
		(result, tag) =>
			result +
			`<tw-tag name="${escape(tag)}" color="${escape(
				story.tagColors[tag]
			)}"></tw-tag>`,
		''
	);

	return (
		`<tw-storydata name="${escape(story.name)}" ` +
		`startnode="${startLocalId || ''}" ` +
		`creator="${escape(appInfo.name)}" ` +
		`creator-version="${escape(appInfo.version)}" ` +
		`format="${escape(story.storyFormat)}" ` +
		`format-version="${escape(story.storyFormatVersion)}" ` +
		`ifid="${escape(story.ifid)}" ` +
		`options="${escape(formatOptions)}" ` +
		`tags="${escape(story.tags.join(' '))}" ` +
		`zoom="${escape(story.zoom.toString())}" hidden>` +
		`<style role="stylesheet" id="twine-user-stylesheet" ` +
		`type="text/twine-css">` +
		story.stylesheet +
		`</style>` +
		`<script role="script" id="twine-user-script" ` +
		`type="text/twine-javascript">` +
		story.script +
		`</script>` +
		tagData +
		passageData +
		`</tw-storydata>`
	);
}

/**
 * Publishes a story and binds it to the source of a story format.
 * 
 * use-publishing.ts에서 아래 함수를 호출
 * formatSource를 받아서 위에서 생성한 스토리 파일을 스토리 포맷에 맞게 바인딩
 */
export function publishStoryWithFormat(
	story: Story,
	formatSource: string,
	appInfo: AppInfo,
	{formatOptions, startId}: PublishOptions = {}
) {
	if (!formatSource) {
		throw new Error('Story format source cannot be empty.');
	}

	let output = formatSource;        

	// We use function replacements to protect the data from accidental
	// interactions with the special string replacement patterns.

	/**
	 * formatSource에 스토리 파일의 이름과 데이터를 넣어서 반환
	 */

	output = output.replace(/{{STORY_NAME}}/g, () => escape(story.name));
	output = output.replace(/{{STORY_DATA}}/g, () =>
		publishStory(story, appInfo, {formatOptions, startId})
	);

	return output;
}
