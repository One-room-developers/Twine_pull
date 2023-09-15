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

export const StoriesContext = React.createContext<StoriesContextProps>({
	dispatch: () => {},
	stories: []
});

StoriesContext.displayName = 'Stories';

export const useStoriesContext = () => React.useContext(StoriesContext);

export const StoriesContextProvider: React.FC = props => {
	//스토리 관련 변수인가? 이 값을 반환하는 함수인가?
	const {stories: storiesPersistence} = usePersistence();

	//스토리 포멘 관련 변수인가? 이 값을 반환하는 함수인가?
	const {formats} = useStoryFormatsContext();

	const {reportError} = useStoreErrorReporter();
	const persistedReducer: React.Reducer<
		StoriesState,
		StoriesAction
	> = React.useMemo(
		() => (state, action) => {
			const newState = reducer(state, action); //새로운 stoires의 정보
			
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
