import {Passage, Story, StoriesState} from '../stories.types';
import {isPersistablePassageChange} from '../../persistence/persistable-changes';
import { passageWithId } from '../getters';

export function updatePassage(
	state: StoriesState,
	storyId: string,
	passageId: string,
	passageProps: Omit<Partial<Passage>, 'id' | 'story'>
) {
	let storyExists = false;
	let updated = false;
	debugger;
	let passage;
	const newState = state.map(story => {
		if (story.id !== storyId) {
			return story;
		}
		passage = passageWithId(state, storyId, passageId);
		storyExists = true;

		if (
			'name' in passageProps &&
			story.passages.some(
				passage =>
					passage.name === passageProps.name && passage.id !== passageId
			)
		) {
			console.warn(
				`There is already a passage in this story with name "${passageProps.name}", taking no action`
			);
			return story;
		}

		const newStory: Story = {
			...story,
			passages: story.passages.map(passage => {
				if (passage.id !== passageId) {
					return passage;
				}

				updated = true;
				const text_user = {text_user : "오하이오"}
				return {...passage, ...passageProps, ...text_user};
			})
		};

		if (updated) {
			if (isPersistablePassageChange(passageProps)) {
				newStory.lastUpdate = new Date();
			}

			return newStory;
		}

		console.warn(
			`Asked to update a passage with ID "${passageId}", but it does not exist in story ID ${storyId}, taking no action`
		);
		return story;
	});

	if (!storyExists) {
		console.warn(`No story in state with ID "${storyId}", taking no action`);
		return state;
	}

	if (!updated) {
		// Should have warned above.
		return state;
	}

	passage = passageWithId(state, storyId, passageId);
	return newState;
}
