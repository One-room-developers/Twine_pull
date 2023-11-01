import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {RouteToolbar} from '../../../components/route-toolbar';
import {AppActions, BuildActions} from '../../../route-actions';
import {Story} from '../../../store/stories';
import {Point} from '../../../util/geometry';
import {PassageActions} from './passage/passage-actions';
import {StoryActions} from './story/story-actions';
import {UndoRedoButtons} from './undo-redo-buttons';

export interface StoryEditToolbarProps {
	getCenter: () => Point;
	story: Story;
}

export const StoryEditToolbar: React.FC<StoryEditToolbarProps> = props => {
	const {getCenter, story} = props;
	//i18 인가 뭔가 하는 기능 안 쓰기.
	//const {t} = useTranslation();

	return (
		<RouteToolbar
			pinnedControls={<UndoRedoButtons />}
			tabs={
				//object를 인자로 받음
				{
				["장면 편집"]: (
						<PassageActions getCenter={getCenter} story={story} />
					),
				["업로드"]: <StoryActions story={story} />,
				// ["빌드"]: <BuildActions story={story} />,
				// ["Twine 설정"]: <AppActions />	
				// [t('common.passage')]: (
				// 	<PassageActions getCenter={getCenter} story={story} />
				// ),
				// [t('common.story')]: <StoryActions story={story} />,
				// [t('common.build')]: <BuildActions story={story} />,
				// [t('common.appName')]: <AppActions />
			}
		}
		/>
	);
};
