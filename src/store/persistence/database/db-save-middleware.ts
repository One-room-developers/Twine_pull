import {
	StoriesAction,
	StoriesState } from '../../stories';
import {
	createPassage,
	createStory,
	deletePassage,
	updatePassage,
	updateStory,
	deleteStory
} from './save';
import { 
	storyWithId, 
	storyWithName, 
	passageWithName,
	passageWithId
} from '../../stories';

let lastState: StoriesState;
export function DBsaveMiddleware(state: StoriesState, action: StoriesAction) {
	console.log("Log:DBsaveMiddleware")
	switch (action.type) {
		case 'createPassage': {
			const story = storyWithId(state, action.storyId);
			const passage = passageWithName(state, story.id, action.props.name);
			updateStory(story)
			createPassage(passage, story);
			break;
		}
		case 'createPassages': {
			const story = storyWithId(state, action.storyId);
			updateStory(story)
			action.props.forEach((props)=>{
					const passage = passageWithName(state, story.id, props.name);
					createPassage(passage, story)
				}
			);
			break;
		}

		case 'createStory':{
			const story = storyWithName(state, action.props.name);
			createStory(story);
			story.passages.forEach(passage => updatePassage(passage));
			break;
		}

		case 'updatePassage':{
			const story = storyWithId(state, action.storyId);
			const passage = passageWithId(state, action.storyId, action.passageId);
			updateStory(story)
			updatePassage(passage)
			break;
		}

		case 'updatePassages': {
			const story = storyWithId(state, action.storyId);
			updateStory(story);
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
			story.passages.forEach(passage => updatePassage(passage));
			break;
		}
		case 'deletePassage': {
			const story = storyWithId(state, action.storyId);
			const passage = passageWithId(lastState, action.storyId, action.passageId)
			updateStory(story)
			deletePassage(passage, story, lastState);
			break;
		}
		case 'deletePassages': {
			const story = storyWithId(state, action.storyId);
			updateStory(story)
			action.passageIds.forEach(passageId =>{
					const passage = passageWithId(lastState, action.storyId, passageId)
					deletePassage(passage, story, lastState)
				}
			);
			break;
		}
		case 'deleteStory' : {
			const story = storyWithId(lastState, action.storyId);
			deleteStory(story);
			break;
		}
		case 'init':
		case 'repair':
		default :
			console.log("Log : db-save-middleware / default - ")
			console.log(action)
			break;
	}
	lastState = state;
}
