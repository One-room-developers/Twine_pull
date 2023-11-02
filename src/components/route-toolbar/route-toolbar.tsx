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
import styled from "styled-components";
import MakeEpiSliderContainer from '../../routes/home/MakeEpiSliderContainer';

const InfoContainer = styled.div`
	position: fixed;
    top : 0;
    left : 0;
    right : 0;
    bottom: 0;
    margin : auto;
	z-index: 100;
    width : 100%;
    height : 100%;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;
`
const CloseBtnContainer = styled.div`
	width: 900px;
	display: flex;
	justify-content: flex-end;
	margin-top: 7px;
`
const CloseBtn = styled.div`
	font-size: 20px;
	color: var(--main-white);
	padding: 3px;
	z-index: 101;
	border-bottom: 1px solid white;
	line-height: 120%;
	&:hover{
		cursor: pointer;
	};
`
export interface RouteToolbarProps {
	helpUrl?: string;
	pinnedControls?: React.ReactNode;
	tabs: Record<string, React.ReactNode>;
	story ?: Story
}

export const RouteToolbar: React.FC<RouteToolbarProps> = props => {
	// 여기 helpUrl 우리 껄로 바꾸면 됨
	const {pinnedControls, tabs} = props;
	const {t} = useTranslation();

	const [infoMode, setInfoMode] = React.useState(false);

	return (
		<div className="route-toolbar">
			{infoMode ? <InfoContainer>
				<MakeEpiSliderContainer/>
				<CloseBtnContainer>
					<CloseBtn onClick={() => setInfoMode(false)}>닫기</CloseBtn>
				</CloseBtnContainer>
			</InfoContainer> : <></>}
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
							onClick={() => setInfoMode(true)}
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
