import escapeRegExp from 'lodash/escapeRegExp';
import {Thunk} from 'react-hook-thunk-reducer';
import {passageWithName, passageWithNameAsStory, storyWithId} from '../getters';
import {Passage, StoriesAction, StoriesState, Story, option} from '../stories.types';
import {createNewlyLinkedPassages} from './create-newly-linked-passages';
import {deleteOrphanedPassages} from './delete-orphaned-passages';
import { parseLinks } from '../../../util/parse-links';

export interface UpdatePassageOptions {
	dontUpdateOthers?: boolean;
}

/**
 * General update of a passage.
 */

//진짜 dispatch() 및 하위 passage 생성, 상위 passage의 텍스트 변경
export function updatePassage(
	story: Story,
	passage: Passage,
	props: Partial<Passage>,
	options: UpdatePassageOptions = {}
): Thunk<StoriesState, StoriesAction> {
	if (!story.passages.some(p => p.id === passage.id)) {
		throw new Error('This passage does not belong to this story.');
	}

	if (
		'name' in props &&
		story.passages
			.filter(p => p.name === props.name)
			.some(p => p.id !== passage.id)
	) {
		throw new Error(`There is already a passage named "${props.name}".`);
	}

	return (dispatch, getState) => { //thunk-reducer이라는 node.js 파일에 dispatch와 getState를 넣어 실행하는 코드가 있음
		// Do the passage update itself.
		const oldName = passage.name;
		const oldText = passage.text;
		//thunk-reducer.js의 dispatch
		dispatch({
			props,
			type: 'updatePassage',
			passageId: passage.id,
			storyId: story.id
		});

		// Side effects from changes.

		if (!options.dontUpdateOthers && props.text) {
			dispatch(deleteOrphanedPassages(story, passage, props.text, oldText));

			// We need to get an up-to-date version of the story so placement of new
			// passages is correct.
			//
			// still causes passage bounces sometimes :( this is because the placement
			// algorithm works differently based on the number of passages it sees.
			// will anyone care?? could there be a 'suggested positions'? how would we
			// communicate back and forth?

			const updatedStory = storyWithId(getState(), story.id);

			//하위 passage 생성
			dispatch(
				createNewlyLinkedPassages(updatedStory, passage, props.text, oldText, props.options)
			);
		}

		if (props.name) {
			const oldNameEscaped = escapeRegExp(oldName);

			// We only need to escape $ stuff in the new name, because it will be the
			// second argument to replace(). This is a little mindbending, but the
			// purpose of this is to replace $ with $$.

			const newNameEscaped = props.name.replace(/\$/g, '$$$$');

			const simpleLinkRegexp = new RegExp(
				'\\[\\[' + oldNameEscaped + '(\\]\\[.*?)?\\]\\]',
				'g'
			);
			const compoundLinkRegexp = new RegExp(
				'\\[\\[(.*?)(\\||->)' + oldNameEscaped + '(\\]\\[.*?)?\\]\\]',
				'g'
			);
			const reverseLinkRegexp = new RegExp(
				'\\[\\[' + oldNameEscaped + '(<-.*?)(\\]\\[.*?)?\\]\\]',
				'g'
			);
			
			
			let newName = props.name;
			if(passage.passageType === "normalPassage"){
				if(oldName !== newName){
					passage.options.forEach(option => {
						const optionPassage = passageWithNameAsStory(story, option.name);
						optionPassage.parentOfOption = newName;
					})
				}
			}
			story.passages.forEach(relinkedPassage => {
				if (
					simpleLinkRegexp.test(relinkedPassage.text) ||
					compoundLinkRegexp.test(relinkedPassage.text) ||
					reverseLinkRegexp.test(relinkedPassage.text)
				) {
					debugger;
					let newText = relinkedPassage.text;

					newText = newText.replace(
						simpleLinkRegexp,
						'[[' + newNameEscaped + '$1]]'
					);
					newText = newText.replace(
						compoundLinkRegexp,
						'[[$1$2' + newNameEscaped + '$3]]'
					);
					newText = newText.replace(
						reverseLinkRegexp,
						'[[' + newNameEscaped + '$1$2]]'
					);

					let oldOptionForParent = relinkedPassage.options; //

					const nexOptionForParent : option[] = oldOptionForParent.map(option => {
						debugger;
						if(option.name === oldName){
							option.name = newName;
							if(props.text) //option passage에서 제목을 입력 안하고 작성완료를 눌렀을 때 대비
								option.nextNormalPassages = parseLinks(props.text)
						}
						return option;
					})
					updatePassage( //지금 업데이트하는 passage의 상위 부모를 바꿔줌
						story,
						relinkedPassage,
						{
							text: newText,
							options : nexOptionForParent
						},
						options
					)(dispatch, getState);
				}
			});
		}
	};
}
