import { updateOption } from '../../persistence/database';
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
		let passages = story.passages.filter(passage => {
			if (passage.id === passageId) {
				deleted = true;
				return false;
			}
			return true;
		})
		passages = passages.map(passage => {
			let dummyPassage;
			dummyPassage = {
				...passage,
				text : passage.text.replace(`\n\[\[${passageName}\]\]`,''),
				options : passage.options.filter(option => {
					if(option.name === passageName)
						return false;
					else
						return true;
				})
			}
			return dummyPassage;
		})//이지원 추가코드 option passage가 제거되면 그 passage를 부모 passage의 option 속성에서 모두 제거
		passages = passages.map(passage => {
			let dummyPassage;
			let options = passage.options;
			passage.options.forEach((option, index) => {
				for(let i =0; i<option.nextNormalPassages.length; i++){
					if(option.nextNormalPassages[i] === passageName){
						option.nextNormalPassages.splice(index, 1)
						updateOption(option); //개 어거지로 쓴 db 업데이트 코드
						return
					}
				}
				options[index].nextNormalPassages = option.nextNormalPassages;
			})
			dummyPassage = {
				...passage,
				options : options
			}
			return dummyPassage;
		})
		//이지원 추가코드 normal passage가 제거되면 그 passage를 nextNormalPassage로 갖는 것 모두 수정

		const newStory = {
			...story,
			passages: passages
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
