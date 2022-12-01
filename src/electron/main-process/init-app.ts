/**
 * 일렉트론 실행 직후에 첫번째로 실행되는 함수
 * initApp
 * 
 * BrowserWindow 객체 생성
 * 랜더러 프로세스 생성
 */

import {app, BrowserWindow, dialog, screen, shell} from 'electron';
import path from 'path';
import {initIpc} from './ipc';
import {initLocales} from './locales';
import {initMenuBar} from './menu-bar';
import {backupStoryDirectory, createStoryDirectory} from './story-directory';

let mainWindow: BrowserWindow | null;

async function createWindow() {
	const screenSize = screen.getPrimaryDisplay().workAreaSize;

	mainWindow = new BrowserWindow({                // BrowserWindow(윈도우) 객체 생성
		height: Math.round(screenSize.height * 0.9),       // 아마도 화면 크기 설정하는 코드인듯
		width: Math.round(screenSize.width * 0.9),
		show: false,
		webPreferences: {
			// See preload.ts for why context isolation is disabled.
			contextIsolation: false,
			nodeIntegration: false,
			preload: path.resolve(__dirname, './preload.js')          
		}
	});
	mainWindow.loadURL(                    // 입력한 주소로 이동. 아래 코드에서는 index.html 파일을 실행
		// Path is relative to this file in the electron-build/ directory that's
		// created during `npm run build:electron-main`.
		// app.isPackaged
		`file://${path.resolve(__dirname, '../../../../renderer/index.html')}`
	);

	mainWindow.once('ready-to-show', () => {          // 랜더링이 완료되면 발생하는 이벤트
		mainWindow!.show();                             // 윈도우 생성

		/**
		 * mainWindow.webContents : 모든 웹 페이지와 관련된 이벤트와 작업을 수행하는 객체. 콘텐츠 표시 및 제어
		 * webContents.openDevTools : 개발자 도구를 연다.
		 */

		if (!app.isPackaged) {
			mainWindow!.webContents.openDevTools();
		}
	});
	mainWindow.on('closed', () => (mainWindow = null));

	// Load external links in the system browser.
	// 외부 링크를 연다

	mainWindow.webContents.on('will-navigate', (event, url) => {       // 새로운 페이지로 이동할 때 발생하는 이벤트
		shell.openExternal(url);
		event.preventDefault();
	});
	mainWindow.webContents.setWindowOpenHandler(({url}) => {         // 새로운 탭이 실행될 때, 윈도우를 설정
		shell.openExternal(url);
		return {action: 'deny'};                                // 윈도우를 캔슬
	});
}

export async function initApp() {
	try {
		await initLocales();
		await createStoryDirectory();
		await backupStoryDirectory();
		setInterval(backupStoryDirectory, 1000 * 60 * 20);
		initIpc();                                            // 메인 프로세스와 소통
		initMenuBar();
		createWindow();
	} catch (error) {
		// Not localized because that may be the cause of the error.

		dialog.showErrorBox(
			'An error occurred during startup.',
			(error as Error).message
		);
		app.quit();
	}
}
