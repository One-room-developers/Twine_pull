import {app} from 'electron';
import {initApp} from './init-app';

app.on('ready', initApp);                         // 앱 모듈이 실행되면 initApp 함수 실행
app.on('window-all-closed', () => app.quit());
