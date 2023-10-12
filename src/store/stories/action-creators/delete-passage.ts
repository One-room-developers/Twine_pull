import { StoriesActionOrThunk } from '../../undoable-stories';
import {
	Passage,
	Story,
	DeletePassageAction,
	DeletePassagesAction
} from '../stories.types';

/**
 * Deletes a passage.
 */

function updateNextNormalPassage( //normalPassage가 삭제될 때 nextNormalPassage를 수정해주는 코드
	story : Story, 
	dispatch : (actionOrThunk: StoriesActionOrThunk, annotation?: string) => void,
	removePassages : Passage[]
){
	removePassages = removePassages.filter(removePassage => { //normalPassage가 삭제될시만 실행
		if(removePassage.passageType === "normalPassage")
			return true;
		else
			return false;
	})

	story.passages.forEach(passage => {
		passage.options.forEach((option) => {
			for(let i =0; i<removePassages.length; i++)
				for(let j =0; j<option.nextNormalPassages.length; j++){
					if(option.nextNormalPassages[j] === removePassages[i].name){
						option.nextNormalPassages.splice(j, 1)
						debugger;
						dispatch({
							props : option,
							type: 'updatePassage',
							passageId: passage.id,
							storyId: story.id
						}
						)}
				}
		})
	})

}
export function deletePassage(
	story: Story,
	passage: Passage,
	dispatch : (actionOrThunk: StoriesActionOrThunk, annotation?: string) => void
): DeletePassageAction {
	if (!story.passages.some(p => p.id === passage.id)) {
		throw new Error('This passage does not belong to this story.');
	}
	
	updateNextNormalPassage(story, dispatch, [passage]);

	return {type: 'deletePassage', storyId: story.id, passageId: passage.id, passageName:passage.name};
}

/**
 * Deletes multiple passages.
 */
export function deletePassages(
	story: Story,
	passages: Passage[],
	dispatch : (actionOrThunk: StoriesActionOrThunk, annotation?: string) => void
): DeletePassagesAction {
	debugger;

	updateNextNormalPassage(story, dispatch, passages);

	return {
		type: 'deletePassages',
		storyId: story.id,
		passageIds: passages.map(passage => passage.id),
		passageNames : passages.map(passage => passage.name)
	};
}
