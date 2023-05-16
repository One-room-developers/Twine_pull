import sortBy from 'lodash/sortBy';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {MainContent} from '../../components/container/main-content';
import {SafariWarningCard} from '../../components/error';
import {
	AppDonationDialog,
	DialogsContextProvider,
	useDialogsContext
} from '../../dialogs';
import {usePrefsContext} from '../../store/prefs';
import {useDonationCheck} from '../../store/prefs/use-donation-check';
import {
	deselectAllStories,
	deselectStory,
	selectStory,
	useStoriesContext,
	importStories as importStoriesByStories, Story
} from '../../store/stories';
import {UndoableStoriesContextProvider} from '../../store/undoable-stories';
import {StoryListToolbar} from './toolbar/story-list-toolbar';
import {StoryCards} from './story-cards';
import {ClickAwayListener} from '../../components/click-away-listener';
import {importStories as importStoriesByImport} from '../../util/import'; 
import {testHtml} from './testHTml'

export const InnerStoryListRoute: React.FC = () => {
	const {dispatch: dialogsDispatch} = useDialogsContext();
	const {dispatch: storiesDispatch, stories} = useStoriesContext();
	const {prefs} = usePrefsContext();
	const {shouldShowDonationPrompt} = useDonationCheck();
	const {t} = useTranslation();
	let data :string = testHtml;

	//db와 스토리를 연동하기 위해 제작한 함수 - 이지원
	function handleImport(getStory: Story[]) {
		storiesDispatch(importStoriesByStories(getStory, stories)); //dispatch : useState 대신 사용하는 redux같은 것
	}
	const selectedStories = React.useMemo(
		() => stories.filter(story => story.selected),
		[stories]
	);
	
	const visibleStories = React.useMemo(() => {
		const filteredStories =
			prefs.storyListTagFilter.length > 0
				? stories.filter(story =>
						story.tags.some(tag => prefs.storyListTagFilter.includes(tag))
				  )
				: stories;

		switch (prefs.storyListSort) {
			case 'date':
				return sortBy(filteredStories, 'lastUpdated');
			case 'name':
				return sortBy(filteredStories, 'name');
		}
	}, [prefs.storyListSort, prefs.storyListTagFilter, stories]);

	// Any stories no longer visible should be deselected.

	React.useEffect(() => {
		for (const story of selectedStories) {
			if (story.selected && !visibleStories.includes(story)) {
				storiesDispatch(deselectStory(story));
			}
		}
	}, [selectedStories, stories, storiesDispatch, visibleStories]);

	React.useEffect(() => {
		if (shouldShowDonationPrompt()) {
			dialogsDispatch({type: 'addDialog', component: AppDonationDialog});
		}
	}, [dialogsDispatch, shouldShowDonationPrompt]);

	//제작 페이지 실행시 스토리를 불러오기 위해 쓴 코드 - 이지원
	React.useEffect(()=>{
		handleImport(importStoriesByImport(data));
	}, [])
	return (
		<div className="story-list-route">
			<StoryListToolbar selectedStories={selectedStories} />
			<ClickAwayListener
				ignoreSelector=".story-card"
				onClickAway={() => storiesDispatch(deselectAllStories())}
			>
				<MainContent
					title={t(
						prefs.storyListTagFilter.length > 0
							? 'routes.storyList.taggedTitleCount'
							: 'routes.storyList.titleCount',
						{count: visibleStories.length}
					)}
				>
					<SafariWarningCard />
					<div className="stories">
						{stories.length === 0 ? (
							<p>{t('routes.storyList.noStories')}</p>
						) : (
							<StoryCards
								onSelectStory={story =>
									storiesDispatch(selectStory(story, true))
								}
								stories={visibleStories}
							/>
						)}
					</div>
				</MainContent>
			</ClickAwayListener>
		</div>
	);
};

export const StoryListRoute: React.FC = () => (
	<UndoableStoriesContextProvider>
		<DialogsContextProvider>
			<InnerStoryListRoute />
		</DialogsContextProvider>
	</UndoableStoriesContextProvider>
);
