import {IconTrash} from '@tabler/icons';
import 'element-closest';
import * as React from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import {useTranslation} from 'react-i18next';
import {IconButton} from '../../../../components/control/icon-button';
import {deletePassages, deletePassage, Passage, passageWithName, Story} from '../../../../store/stories';
import {useUndoableStoriesContext} from '../../../../store/undoable-stories';
import { parseLinks } from '../../../../util/parse-links';

export interface DeletePassagesButtonProps {
	passages: Passage[];
	story: Story;
}

export const DeletePassagesButton: React.FC<
	DeletePassagesButtonProps
> = props => {
	const {passages, story} = props;
	const {dispatch} = useUndoableStoriesContext();
	const {t} = useTranslation();
	const disabled = React.useMemo(() => {
		if (passages.length === 0) {
			return true;
		}

		return passages.some(passage => story.startPassage === passage.id);
	}, [passages, story.startPassage]);
	const handleClick = React.useCallback(() => {
		if (passages.length === 0) {
			return;
		}
		let deleteOptionPassages = [];
		let areadyDeletePassges = []
		passages.forEach((passage)=>{
			if(passage.passageType === 'normalPassage'){
				parseLinks(passage.text).forEach(nextPassage => {
					const optionPassage = story.passages.find(p => p.name === nextPassage); //전체 passage에서 현재 passage의 자식 찾기
					if(optionPassage){
						deleteOptionPassages.push(optionPassage);
					}
				})
			}
			else{
				areadyDeletePassges.push(passage);
			}
			dispatch((deletePassage(story, passage, dispatch)))
		})
		//이미 삭제한 option은 지워주기
		for(let i =0; i<areadyDeletePassges.length; i++){
			deleteOptionPassages = deleteOptionPassages.filter(deleteOptionPassage => (deleteOptionPassage !== areadyDeletePassges[i]))
		}
		deleteOptionPassages.forEach(optionPassage => {
			dispatch((deletePassage(story, optionPassage, dispatch)))
		})
	}, [dispatch, passages, story]);

	useHotkeys('Backspace,Delete', handleClick, [handleClick]);

	return (
		<IconButton
			disabled={disabled}
			icon={<IconTrash />}
			label={
				!disabled && passages.length > 1
					? t('common.deleteCount', {count: passages.length})
					: t('common.delete')
			}
			onClick={handleClick}
		/>
	);
};
