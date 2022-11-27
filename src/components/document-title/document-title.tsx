// 뭔지 모르겠음


import * as React from 'react';
import {Helmet} from 'react-helmet';
import {isElectronRenderer} from '../../util/is-electron';

export interface DocumentTitleProps {
	title: string;
}

/**
 * Sets the document title. This works around a bug with Electron and may not be
 * needed in later versions.
 */
export const DocumentTitle: React.FC<DocumentTitleProps> = ({title}) => {
	// Using `history.goBack()` doesn't seem to cause Electron to update the
	// window title bar--possibly tied to using a <HashRouter>. If it does in a
	// future version, we can just use react-helmet directly.

	React.useEffect(() => {                                          /** setTimeout(실행할 함수, 기다릴 시간) */
		if (isElectronRenderer()) {
			const timeout = window.setTimeout(() => {                   // 반환값 1. const timeout에 1 저장
				document.querySelector('title')!.innerHTML = title;       // title 태그의 내용을 새로만든 스토리의 제목으로 바꿈
			}, 0);

			return () => window.clearTimeout(timeout);                // setTimeout() 해제.
		}
	}, [title]);                  // title값이 바뀔 때마다 실행

	// HTML의 헤더값을 변경할 때 사용하는 리액트 컴포넌트
	// 새로 만든 스토리의 제목으로 title 변경
	return (
		<Helmet>                        
			<title>{title}</title>        
		</Helmet>
	);
};
