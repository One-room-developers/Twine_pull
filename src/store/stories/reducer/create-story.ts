import uuid from 'tiny-uuid';
import {passageDefaults, storyDefaults} from '../defaults';
import {Story, StoriesState} from '../stories.types';
import axios from 'axios';
import SessionStorageAPI from '../../../routes/login/session';

export function createStory(state: StoriesState, storyProps: Partial<Story>) {
	if ('id' in storyProps && state.some(story => story.id === storyProps.id)) {
		console.warn(
			`There is already a story in state with ID "${storyProps.id}", taking no action`
		);
		return state;
	}

	if (
		'name' in storyProps &&
		state.some(story => story.name === storyProps.name)
	) {
		console.warn(
			`There is already a story in state with name "${storyProps.name}", taking no action`
		);
		return state;
	}
	const sessionStorage = new SessionStorageAPI();
	const userNickname : string = sessionStorage.getItem("userNickname");
	debugger;
	const storyId = uuid()
	const  storyPk : string = storyId + userNickname;

	let story: Story = {
		id: storyId,
		...storyDefaults(),
		ifid: uuid().toUpperCase(),
		lastUpdate: new Date(),
		passages: [],
		tags: [],
		tagColors: {},
		pk: storyPk,
		userNickname : userNickname,
		...storyProps
	};

	// If we are prepopulating the story with passages, make sure they have the
	// correct ID linkage, and at least make sure basic properties are set.

	story.passages = story.passages.map(passage => ({
		...passageDefaults,
		...passage,
		story: story.id
	}));

	return [...state, story];
}
