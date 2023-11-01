import {IconHelp} from '@tabler/icons';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {IconButton} from '../control/icon-button';
import {BackButton} from './back-button';
import './route-toolbar.css';
import { UploadStoryButton } from '../../routes/story-edit/toolbar/story/upload-story-button';
import { Story, storyWithId } from '../../store/stories';
import { useUndoableStoriesContext } from '../../store/undoable-stories';

export interface RouteToolbarProps {
	helpUrl?: string;
	pinnedControls?: React.ReactNode;
	tabs: Record<string, React.ReactNode>;
	story ?: Story
}

export const RouteToolbar: React.FC<RouteToolbarProps> = props => {
	// 여기 helpUrl 우리 껄로 바꾸면 됨
	const {helpUrl = 'https://twinery.org/2guide', pinnedControls, tabs} = props;
	const {t} = useTranslation();
	return (
		<div className="route-toolbar">
			<Tabs selectedTabClassName="selected">
				<div className="route-toolbar-top">
					<BackButton />
					<TabList className="route-toolbar-tablist">
						{Object.keys(tabs).map(tabName => (
							<Tab className="route-toolbar-tab" key={tabName}>
								{tabName}
							</Tab>
						))}
					</TabList>
					{
						(props.story) ? (<UploadStoryButton story = {props.story}></UploadStoryButton>) 
						: (<></>)
					}
					<div className="route-toolbar-pinned-controls">
						{pinnedControls}
						<IconButton
							icon={<IconHelp />}
						label={t('도움말')}
							onClick={() => window.open(helpUrl, '_blank')}
						/>
					</div>
				</div>
				<div>
					{Object.entries(tabs).map(([tabName, tabContent]) => (
						<TabPanel key={tabName}>{tabContent}</TabPanel>
					))}
				</div>
			</Tabs>
		</div>
	);
};
