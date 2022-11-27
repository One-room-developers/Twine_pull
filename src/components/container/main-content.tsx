import classNames from 'classnames';
import * as React from 'react';
import {Point} from '../../util/geometry';
import {DocumentTitle} from '../document-title/document-title';
import './main-content.css';

export interface MainContentProps                      // 스토리 카드의 메인 콘텐츠(본문?)
	extends React.ComponentPropsWithoutRef<'div'> {      // HTML<div> 태그
	grabbable?: boolean;                                 // 그랩 가능 여부
	padded?: boolean;                                    // 
	title?: string;                                      // 스토리 카드 제목?
}

export const MainContent = React.forwardRef<HTMLDivElement, MainContentProps>(       // forwardRef:자식 컴포넌트의 태그에 ref를 넣는 용도
	(props, ref) => {
		const {children, grabbable, title} = props;                 // children, grabbable, title 프로퍼티로 전달
		const containerRef = React.useRef<HTMLDivElement>(null);    // containerRef에 div 엘리멘트를 다룰 수 있게 함?
		const className = classNames('main-content', {
			padded: props.padded ?? true
		});

		React.useImperativeHandle(
			ref,
			() => containerRef.current as HTMLDivElement
		);

		React.useEffect(() => {                      /** 두번째 인자 []가 변경될 때마다 특정 작업을 실행하는 함수
		                                                 []가 비어있으면 처음 호출될 때만 실행
																										 []를 생략하면 컴포넌트가 리렌더링 될 때마다 실행 됨  */
			if (containerRef.current) {
				containerRef.current.focus();            // containerRef의 현재 엘리먼트에 포커스 유지
			}
		}, []);

		React.useEffect(() => {                                   // grabbable값이 바뀔 때마다 호출
			const container = containerRef.current;                // container는 현재 선택한 div
			let dragScrollStart: Point;
			let dragMouseStart: Point;

			function moveListener(event: PointerEvent) {                           // div 드래그
				if (container) {                                                    // container가 true라면
					container.scrollLeft =
						dragScrollStart.left + (dragMouseStart.left - event.clientX);
					container.scrollTop =
						dragScrollStart.top + (dragMouseStart.top - event.clientY);
				}
			}

			function stopGrab(event: PointerEvent) {                      // div 놓기
				if (!container) {                                           // container == false일 때, return
					return;
				}

				container.releasePointerCapture(event.pointerId);               // container의 현재 pointerId를 엘리먼트에서 해제한다
				container.removeEventListener('pointerleave', stopGrab);         // div에서 포인터 해제
				container.removeEventListener('pointermove', moveListener);      // div 드래그
				container.style.cursor = '';                                    // 커서 스타일 기본으로 변경
				event.preventDefault();                                         // 엘리멘트의 기본 기능 차단
			}

			function upListener(event: PointerEvent) {                     // 포인터가 활성화 되어있지 않으면 시작하는 이벤트
				if (event.button === 2) {                                   // 버튼 우클릭 시
					stopGrab(event);                                         // stopGrab 호출
				}                                                          // 우클릭하면 div 놓는 기능
			}

			function downListener(event: PointerEvent) {                 // 마우스를 누르면 발생하는 이벤트
				if (event.button !== 2 || !container) {
					return;
				}

				container.setPointerCapture(event.pointerId);                     // 해당 div 포인터를 유지하는 기능
				container.addEventListener('pointerleave', stopGrab);             
				container.addEventListener('pointermove', moveListener);
				container.addEventListener('pointerup', upListener);
				container.style.cursor = 'grabbing';                           // 커서 모양 바뀜
				dragScrollStart = {
					left: container.scrollLeft,
					top: container.scrollTop
				};
				dragMouseStart = {left: event.clientX, top: event.clientY};
				event.preventDefault();
			}

			function ignoreContext(event: Event) {                            // 마우스 우클릭 시 메뉴가 나오지 않게함
				event.preventDefault();
			}

			if (grabbable && container) {                                       // div 선택, div잡을 수 있는 상태이면
				container.addEventListener('pointerdown', downListener);
				container.addEventListener('contextmenu', ignoreContext);         // contextmenu : 우클릭하였을 때 발생하는 이벤트.
				return () => {
					container.removeEventListener('pointerdown', downListener);          // 
					container.removeEventListener('contextmenu', ignoreContext);
				};
			}
		}, [grabbable]);


		// 새로 만든 스토리의 제목을 DocumentTitle로 넘겨서 HTML 형태로 저장
		return (
			<div className={className} ref={containerRef}>                 
				{title && (
					<>
						<DocumentTitle title={title} />             
						<h1>{title}</h1>
					</>
				)}
				{children}
			</div>
		);
	}
);
