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
import axios from 'axios';

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

			//이지원 제작
			//db에 데이터를 저장하는 코드
			//local storage에서 값 변수에 불러오기
			async function create(){
				const storiesState = state;
				let passagesState = [];
				storiesState.forEach((storyState)=>{
					passagesState.push(storyState.passages)
				});
				await storiesState.forEach((storyState)=>{
					axios({
						method: "POST",
						url: `${process.env.REACT_APP_API_URL}/game_play/create_story`,
						data: {
							id: storyState.id,
							if_id: storyState.ifid,
							name: storyState.name,
							start_passage: storyState.startPassage,
							script: storyState.script,
							selected: storyState.selected,
							snap_to_grid: storyState.snapToGrid,
							story_format: storyState.storyFormat,
							story_format_version: storyState.storyFormatVersion,
							zoom: storyState.zoom,
						},
					})
					.then((res) => {
					})
					.catch((error) => {
						console.log(error);
					});
				})
				// await passagesState.forEach((passageState)=>{
				// 	axios({
				// 		method: "POST",
				// 		url: `${process.env.REACT_APP_API_URL}/game_play/create_passage`,
				// 		data: {
				// 			id: passageState.id,
				// 			name: passageState.name,
				// 			passage_type: passageState.passageType,
				// 			story: passageState.story,
				// 			text: passageState.text,
				// 			text_user: passageState.text_user,
				// 			height: passageState.height,
				// 			highlighted: passageState.highlighted,
				// 			left: passageState.left,
				// 			selected: passageState.selected,
				// 			top: passageState.top,
				// 			width: passageState.width 
				// 		}
				// 	})
				// 	.then((res) => {
				// 	})
				// 	.catch((error) => {
				// 		console.log(error);
				// 	});
				// })
			}

			async function update() {
				const storiesState = state;
				let passagesState = [];
				storiesState.forEach((storyState)=>{
					passagesState.push(storyState.passages)
				});
				await storiesState.forEach((storyState)=>{
					axios({
						method: "POST",
						url: `${process.env.REACT_APP_API_URL}/game_play/create_story`,
						data: {
							name: storyState.name,
							start_passage: storyState.startPassage,
							script: storyState.script,
							selected: storyState.selected,
							snap_to_grid: storyState.snapToGrid,
							story_format: storyState.storyFormat,
							story_format_version: storyState.storyFormatVersion,
							zoom: storyState.zoom,
						},
					})
					.then((res) => {
					})
					.catch((error) => {
						console.log(error);
					});
				})
				// await passagesState.forEach((passageState)=>{
				// 	axios({
				// 		method: "POST",
				// 		url: `${process.env.REACT_APP_API_URL}/game_play/create_passage`,
				// 		data: {
				// 			id: passageState.id,
				// 			name: passageState.name,
				// 			passage_type: passageState.passageType,
				// 			story: passageState.story,
				// 			text: passageState.text,
				// 			text_user: passageState.text_user,
				// 			height: passageState.height,
				// 			highlighted: passageState.highlighted,
				// 			left: passageState.left,
				// 			selected: passageState.selected,
				// 			top: passageState.top,
				// 			width: passageState.width 
				// 		}
				// 	})
				// 	.then((res) => {
				// 	})
				// 	.catch((error) => {
				// 		console.log(error);
				// 	});
				// })
			}
			if(action.type === 'createPassage'){
				create()
			}
			else if(action.type === 'updatePassage'){
				update()
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
