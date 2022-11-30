import {IconFileImport} from '@tabler/icons';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {IconButton} from '../../../../components/control/icon-button';
import {StoryImportDialog, useDialogsContext} from '../../../../dialogs';

export const ImportStoryButton: React.FC = () => {
	//useDialogsContext 함수가 HTML import하는 기능
	const {dispatch} = useDialogsContext();

	const {t} = useTranslation();

	return (
		<IconButton
			icon={<IconFileImport />}
			label={t('common.import')}
			onClick={() =>
				dispatch({type: 'addDialog', component: StoryImportDialog})
			}
		/>
	);
};
