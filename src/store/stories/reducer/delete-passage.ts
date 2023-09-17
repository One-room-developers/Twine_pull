import { passageWithId } from '../getters';
import {StoriesState} from '../stories.types';

export function deletePassage(
	state: StoriesState,
	storyId: string,
	passageId: string,
) {
	let foundStory = false;
	let deleted = false;
	let passageName : string = passageWithId(state, storyId, passageId).name

	const newState = state.map(story => {
		if (story.id !== storyId) {
			return story;
		}

		foundStory = true;

		const newStory = {
			...story,
			passages: story.passages.filter(passage => {
				if (passage.id === passageId) {
					deleted = true;
					return false;
				}
				return true;
			}).map(passage => {
				let dummyPassage;
				dummyPassage = {
					...passage,
					options : passage.options.filter(option => {
						if(option === passageName)
							return false;
						else
							return true;
					})
				}
				return dummyPassage;
				
			})//이지원 추가코드 option passage가 제거되면 그 passage를 option 속성으로 갖는 것 모두 제거
			
		};

		if (deleted) {
			newStory.lastUpdate = new Date();
			return newStory;
		}

		return story;
	});

	if (!foundStory) {
		console.warn(`No story in state with ID "${storyId}", taking no action`);
		return state;
	}

	if (!deleted) {
		console.warn(
			`Asked to delete a passage with ID "${passageId}", but it does not exist in story ID ${storyId}, taking no action`
		);
		return state;
	}

	return newState;
}
