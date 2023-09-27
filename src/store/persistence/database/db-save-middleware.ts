import {
	StoriesAction,
	StoriesState } from '../../stories';
import {
	createPassage,
	createStory,
	deletePassage,
	updatePassage,
	updateStory
} from './save';
import { 
	storyWithId, 
	storyWithName, 
	passageWithName,
	passageWithId
} from '../../stories';

export function DBsaveMiddleware(state: StoriesState, action: StoriesAction) {
	console.log("Log:DBsaveMiddleware")
	console.log(action.type);
	switch (action.type) {
		case 'createPassage': {
			const story = storyWithId(state, action.storyId);
			const passage = passageWithName(state, story.id, action.props.name);
			createPassage(passage);
			break;
		}
		case 'createPassages': {
			const story = storyWithId(state, action.storyId);
			action.props.forEach((props)=>{
					const passage = passageWithName(state, story.id, props.name);
					createPassage(passage)
				}
			);
			break;
		}

		case 'createStory':{
			const story = storyWithName(state, action.props.name);
			createStory(story);
			break;
		}

		case 'updatePassage':{
			const story = storyWithId(state, action.storyId);
			const passage = passageWithId(state, action.storyId, action.passageId);
			updatePassage(passage)
			break;
		}

		case 'updatePassages': {
			const story = storyWithId(state, action.storyId);
			Object.keys(action.passageUpdates).forEach(passageId =>{
				const passage = passageWithId(state, action.storyId, passageId);
				updatePassage(passage)
				}
			);
			break;
		}

		case 'updateStory': {
			const story = storyWithId(state, action.storyId);
			updateStory(story);
			break;
		}
		case 'deletePassage': {
			deletePassage(action.passageId);
			break;
		}
		case 'deletePassages': {
			const story = storyWithId(state, action.storyId);
			action.passageIds.forEach(passageId =>
				deletePassage(passageId)
			);
			break;
		}

		case 'init':
		case 'repair':
		default :
			break;
	}
}
