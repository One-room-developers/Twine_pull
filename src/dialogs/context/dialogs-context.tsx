import * as React from 'react';
import useThunkReducer, {Thunk} from 'react-hook-thunk-reducer';
import {reducer} from './reducer';
import {Dialogs} from './dialogs';
import {DialogsAction, DialogsState} from '../dialogs.types';

export interface DialogsContextProps {
	dispatch: React.Dispatch<DialogsAction | Thunk<DialogsState, DialogsAction>>;
	dialogs: DialogsState;
}

export const DialogsContext = React.createContext<DialogsContextProps>({
	dispatch: () => {},
	dialogs: []
});

DialogsContext.displayName = 'Dialogs';

export const useDialogsContext = () => React.useContext(DialogsContext);

export const DialogsContextProvider: React.FC = props => {
	const [dialogs, dispatch] = useThunkReducer(reducer, []); //thunkreducer는 객체 대신 함수를 반환할 수 있게 해주는 것 같다. useState대신에 사용했다.
															  //dispatch에 reducer.ts의 함수가 들어간다

	return (
		<DialogsContext.Provider value={{dispatch, dialogs}}>
			{props.children}
			<Dialogs />
		</DialogsContext.Provider>
	);
};