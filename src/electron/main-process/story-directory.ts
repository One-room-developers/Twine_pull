import {app, shell} from 'electron';
import {copy, mkdirp, readdir, remove, stat} from 'fs-extra';
import {join} from 'path';
import {i18n} from './locales';

/**
 * Returns the full path of the user's story directory.
 * 유저 스토리의 경로 반환
 */
export function storyDirectoryPath() {
	return join(
		app.getPath('documents'),
		i18n.t('common.appName'),
		i18n.t('electron.storiesDirectoryName')
	);
}

/**
 * Creates the stories directory, if it doesn't already exist. If it does exist,
 * this does nothing. In either case, it returns a promise that resolves once
 * done.
 * 
 * 스토리 디렉토리가 없다면 디렉토리를 생성.
 * 스토리 publish 하거나 archive 하면 다운로드 폴더에 저장되는데
 */
export async function createStoryDirectory() {
	return await mkdirp(storyDirectoryPath());
}

/**
 * Shows the story directory in the user's file browser.
 * 다운로드 폴더 경로를 보여줌
 */
export async function revealStoryDirectory() {
	return await shell.openPath(storyDirectoryPath());
}

/**
 * Creates a backup of the entire story directory.
 * 스토리 디렉토리 백업 생성
 */
export async function backupStoryDirectory(maxBackups = 10) {
	console.log('Backing up story library');

	const backupPath = join(
		app.getPath('documents'),
		i18n.t('common.appName'),
		i18n.t('electron.backupsDirectoryName')
	);
	const now = new Date();
	const backupDirectoryName = join(
		backupPath,
		`${now.getFullYear()}-${
			now.getMonth() + 1
		}-${now.getDate()} ${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
	);

	await copy(storyDirectoryPath(), backupDirectoryName);
	console.log(`Backed up story library to ${backupDirectoryName}`);

	const backupDirs = (await readdir(backupPath, {withFileTypes: true})).filter(
		file => file.isDirectory() && file.name[0] !== '.'
	);

	if (backupDirs.length > maxBackups) {
		console.log(
			`There are ${backupDirs.length} story library backups; pruning`
		);

		const backups = await Promise.all(
			backupDirs.map(async directory => {
				const stats = await stat(join(backupPath, directory.name));

				return {stats, name: directory.name};
			})
		);

		backups.sort((a, b) => a.stats.mtimeMs - b.stats.mtimeMs);

		const toDelete = backups.slice(0, backups.length - maxBackups);

		await Promise.allSettled(
			toDelete.map(file => {
				const directoryName = join(backupPath, file.name);

				console.log(`Deleting ${directoryName}`);
				return remove(directoryName);
			})
		);
	}
}
