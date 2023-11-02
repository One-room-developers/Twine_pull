import {IconAB, } from '@tabler/icons';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {IconButton} from '../../../../components/control/icon-button';
import {StoryStylesheetDialog, useDialogsContext} from '../../../../dialogs';
import {Passage, Story, passageWithIdAsStory, passageWithNameAsStory} from '../../../../store/stories';
import { uploadStory } from '../../../../store/persistence/database';

export interface StoryTestButtonProps {
	story: Story;
}

export const StoryTestButton: React.FC<StoryTestButtonProps> = props => {

	return (
        <>
		<IconButton
			icon={<IconAB/>}
			label={'에피소드 테스트'}
			onClick={() =>
				{
                }
			}
		/>
        {props.children}
        </>
	);
};
