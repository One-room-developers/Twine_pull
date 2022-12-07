import {Passage, Story, UpdatePassagesAction} from '../stories.types';

/**
 * Moves passages by an offset, e.g. after dragging.
 */
export function movePassages(
	story: Story,
	passageIds: string[],
	xChange: number,
	yChange: number
): UpdatePassagesAction {
	const passageUpdates: Record<string, Partial<Passage>> = {};

	if (!Number.isFinite(xChange) || !Number.isFinite(yChange)) {
		throw new Error('Offset must be a finite number.');
	}

	passageIds.forEach(passageId => {
		const passage = story.passages.find(p => p.id === passageId);

		if (!passage) {
			throw new Error(
				`There is no passage in this story with ID "${passageId}".`
			);
		}

		let left = Math.max(passage.left + xChange, 0);
		let top = Math.max(passage.top + yChange, 0);

		//큰 눈금 하나당 움직이도록 25 -> 100 으로 모두 바꿔줌.
		if (story.snapToGrid) {
			left = Math.round(left / 100) * 100;
			top = Math.round(top / 100) * 100;
		}

		passageUpdates[passage.id] = {left, top};
	});

	return {type: 'updatePassages', passageUpdates, storyId: story.id};
}
