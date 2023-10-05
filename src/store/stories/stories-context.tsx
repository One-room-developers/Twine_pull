import * as React from 'react';
import useThunkReducer from 'react-hook-thunk-reducer';
import {usePersistence} from '../persistence/use-persistence';
import {reducer} from './reducer';
import {
	StoriesContextProps,
	StoriesAction,
	StoriesState
} from './stories.types';
import {useStoryFormatsContext} from '../story-formats';
import {useStoreErrorReporter} from '../use-store-error-reporter';
import { DBsaveMiddleware } from '../persistence/database';

export const StoriesContext = React.createContext<StoriesContextProps>({
	dispatch: () => {},
	stories: []
});

StoriesContext.displayName = 'Stories';

export const useStoriesContext = () => React.useContext(StoriesContext);

export const StoriesContextProvider: React.FC = props => {
	const {stories: storiesPersistence} = usePersistence();

	const {formats} = useStoryFormatsContext();

	const {reportError} = useStoreErrorReporter();
	const persistedReducer: React.Reducer<
		StoriesState,
		StoriesAction
	> = React.useMemo(
		() => (state, action) => {
			const newState = reducer(state, action); //새로운 stoires의 정보
			//이지원 제작
			//db에 데이터를 저장하는 코드
			DBsaveMiddleware(newState, action)

			try {
				storiesPersistence.saveMiddleware(newState, action, formats); //format은 electron 때문에 넘겨주는 것. local에선 작동 안하는 의미없는 값.
			} catch (error) {
				reportError(error, 'store.errors.cantPersistStories');
			}

			

			return newState;
		},
		[formats, reportError, storiesPersistence]
	);
	const [stories, dispatch] = useThunkReducer(persistedReducer, []);

	return (
		<StoriesContext.Provider value={{dispatch, stories}}>
			{props.children}
		</StoriesContext.Provider>
	);
};
