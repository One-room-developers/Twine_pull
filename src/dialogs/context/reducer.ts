import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {DialogsAction, DialogsState} from '../dialogs.types';

//dialog 창의 크기를 조정하거나 삭제하는 함수가 담겨있다
export const reducer: React.Reducer<DialogsState, DialogsAction> = (
	state, //창이 안띄어져 있으면 그냥 배열값 출력되는 듯
	action //story-edit-route에서 전달받은 인자값이 들어있음
) => {
	switch (action.type) {
		case 'addDialog': //story-edit-route에서 실행하는 dialogDispatch 
			// If the dialog has been previously added, expand and/or highlight it.
			// Otherwise, add it to the end.

			let exists = false;
			const editedState = state.map(stateDialog => { //창이 없으면 state에 값이 없어서 editStaet는 그냥 공배열
				if (
					isEqual(stateDialog, {
						// Ignore collapsed, highlighted, and maximized properties for comparison.
						collapsed: stateDialog.collapsed,
						component: action.component,
						highlighted: stateDialog.highlighted,
						maximized: stateDialog.maximized,
						props: action.props
					})
				) {
					exists = true;
					return {...stateDialog, collapsed: false, highlighted: true};
				}

				return stateDialog;
			});

			if (exists) {
				return editedState;
			}

			return [
				// ...state,
				{
					collapsed: false,
					component: action.component,
					highlighted: false,
					maximized: false,
					props: action.props
				}
			];

		//dialog 창의 크기를 조정하거나 삭제하는 함수들
		case 'removeDialog':
			return state.filter((dialog, index) => index !== action.index);
			//반환 값을 찍어보면 하나만 반환한다. js의 구조분해할당에서는 인자의 값이 없으면 들어가지 않는다. 그러니까 dialogs의 값만 업데이트 하고 dispatch는 수정하지 않는 것이다

		case 'setDialogCollapsed':
			let a = state.map((dialog, index) =>
				index === action.index
					? {...dialog, collapsed: action.collapsed}
					: dialog
			);
			debugger;
			return state.map((dialog, index) =>
				index === action.index
					? {...dialog, collapsed: action.collapsed}
					: dialog
			);
			

		case 'setDialogHighlighted':
			return state.map((dialog, index) =>
				index === action.index
					? {...dialog, highlighted: action.highlighted}
					: dialog
			);

		case 'setDialogMaximized':
			return state.map((dialog, index) => ({
				...dialog,
				maximized: index === action.index ? action.maximized : false
			}));
	}
};
