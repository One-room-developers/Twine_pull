import * as React from 'react';
import {useScrollbarSize} from 'react-scrollbar-size';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {useDialogsContext} from '.';
import {usePrefsContext} from '../../store/prefs';
import { passageWithId } from '../../store/stories';
import { useUndoableStoriesContext } from '../../store/undoable-stories';
import { storyWithId } from '../../store/stories';
import { useState} from "react";
import './dialogs.css';
import {UserDialog} from './components/UserDialog';

let story;
let passage;

const DialogTransition: React.FC = props =>{ 
	
	const [userDialogText, setUserDialogText] = useState();

	return (
	//이곳에 DialogTransition의 css를 적용함
	//classNames는 뒤에 '-enter-done'이라는 문장이 붙음. 아마 CSSTranstion.d.ts 파일에서 후처리를 해줌. 거기에 주석으로 설명되어 있음
		
		<div>
			<UserDialog passage={passage} story={story} onWrite={function(value){
											setUserDialogText(value)
										}}></UserDialog>
			<CSSTransition classNames="hidden pop" timeout={200} {...props} userDialogText={userDialogText} >
				{props.children}
			</CSSTransition>
		</div>
	);
}


export const Dialogs: React.FC = props => { //텍스트 편집 창
	const {height, width} = useScrollbarSize();
	const {prefs} = usePrefsContext();
	const {dispatch, dialogs} = useDialogsContext();
	const [userDialogText, setUserDialogText] = useState();
	
	const hasUnmaximized = dialogs.some(dialog => !dialog.maximized);
	// const containerStyle: React.CSSProperties = {
	// 	paddingLeft: `calc(100% - (${prefs.dialogWidth}px + 2 * (var(--grid-size))))`,
	// 	marginBottom: height,
	// 	marginRight: width
	// };
	// const maximizedStyle: React.CSSProperties = {
	// 	marginRight: hasUnmaximized
	// 		? `calc(${prefs.dialogWidth}px + var(--grid-size))`
	// 		: 0
	// };

	const containerStyle: React.CSSProperties = {
		paddingLeft: `calc(100% - (850px + 2 * (var(--grid-size))))`,
		marginBottom: height,
		marginRight: width
	};
	const maximizedStyle: React.CSSProperties = {
		marginRight: hasUnmaximized
			? `calc(850px + var(--grid-size))`
			: 0
	};

	//dialog 변경을 위해 추가한 코드
	const {stories} = useUndoableStoriesContext();
	
	return (
		<div className="dialogs" style={containerStyle}>
			<TransitionGroup component={null}>
				{dialogs.map((dialog, index) => {
					//dialog 변경을 위해 추가한 코드
					passage = passageWithId(stories, dialogs[0].props.storyId, dialogs[0].props.passageId)
					story = storyWithId(stories, dialogs[0].props.storyId);
					
					

					const managementProps = {
						collapsed: dialog.collapsed,
						highlighted: dialog.highlighted,
						maximized: dialog.maximized,
						onChangeCollapsed: (collapsed: boolean) =>
							dispatch({type: 'setDialogCollapsed', collapsed, index}), //대화 상자 축소 
						onChangeHighlighted: (highlighted: boolean) =>
							dispatch({type: 'setDialogHighlighted', highlighted, index}),
						onChangeMaximized: (maximized: boolean) =>
							dispatch({type: 'setDialogMaximized', maximized, index}),
						onClose: () => dispatch({type: 'removeDialog', index})
					};
					return (
						//결국 실행되는 dialog창은 아래의 값

						/*더블 클릭을 하면 함수가 실행되어 컴포넌트가 생성되는게 아니라, 
						이미 생성된 컴포넌트가 바뀌는 구조.
						더블 클릭 시 story-edit-route의 함수가 실행되고 dialog의 값이 바뀌면서 
						usecontext로 dialogs를 사용하고 있는 이 파일의 Transition Group 함수가 다시 랜더링 되고
						아래 함수가 다시 실행 된다*/
						<DialogTransition key={index}> 
							{dialog.maximized ? (
								<div className="maximized " style={maximizedStyle}>
									<dialog.component {...dialog.props} {...managementProps} />
								</div>
							) : (
									<dialog.component {...dialog.props} {...managementProps} />
							)}
						</DialogTransition>
					);
				})}
			</TransitionGroup>
		</div>
	);
};
