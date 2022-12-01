import * as React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {usePrefsContext} from '../store/prefs';
import {StoryFormatListRoute} from './story-format-list';
import {StoryEditRoute} from './story-edit';
import {StoryListRoute} from './story-list';
import {StoryPlayRoute} from './story-play';
import {StoryProofRoute} from './story-proof';
import {StoryTestRoute} from './story-test';
import { HomeRoute } from './home';
import { SelectRoute } from './select';
import { GamePlayRoute } from './game-play';

export const Routes: React.FC = () => {
	const {prefs} = usePrefsContext();

	// A <HashRouter> is used to make our lives easier--to load local story
	// formats, we need the document HREF to reflect where the HTML file is.
	// Otherwise we'd have to store the actual location somewhere, which will
	// differ between web and Electron contexts.

	console.log(prefs.welcomeSeen);

	return (
		<HashRouter>
			{prefs.welcomeSeen ? (
				<Switch>
					<Route exact path="/">
						<HomeRoute />
					</Route>
					<Route exact path="/select">
						<SelectRoute />
					</Route>
					<Route exact path="/game-play">
						<GamePlayRoute />
					</Route>
					<Route exact path="/story-list">
						<StoryListRoute />
					</Route>
					<Route path="/story-formats">
						<StoryFormatListRoute />
					</Route>
					<Route path="/stories/:storyId/play">
						<StoryPlayRoute />
					</Route>
					<Route path="/stories/:storyId/proof">
						<StoryProofRoute />
					</Route>
					<Route path="/stories/:storyId/test/:passageId">
						<StoryTestRoute />
					</Route>
					<Route path="/stories/:storyId/test">
						<StoryTestRoute />
					</Route>
					<Route path="/stories/:storyId">
						<StoryEditRoute />
					</Route>
					<Route
						path="*"
						render={path => {
							console.warn(
								`No route for path "${path.location.pathname}", rendering story list`
							);
							return <StoryListRoute />;
						}}
					></Route>
				</Switch>
			) : (
				<Switch>
					<Route exact path="/">
						<HomeRoute />
					</Route>
					<Route exact path="/select">
						<SelectRoute />
					</Route>
					<Route exact path="/game-play">
						<GamePlayRoute />
					</Route>
					<Route exact path="/story-list">
						<StoryListRoute />
					</Route>
					<Route path="/story-formats">
						<StoryFormatListRoute />
					</Route>
					<Route path="/stories/:storyId/play">
						<StoryPlayRoute />
					</Route>
					<Route path="/stories/:storyId/proof">
						<StoryProofRoute />
					</Route>
					<Route path="/stories/:storyId/test/:passageId">
						<StoryTestRoute />
					</Route>
					<Route path="/stories/:storyId/test">
						<StoryTestRoute />
					</Route>
					<Route path="/stories/:storyId">
						<StoryEditRoute />
					</Route>
					<Route
						path="*"
						render={path => {
							console.warn(
								`No route for path "${path.location.pathname}", rendering story list`
							);
							return <StoryListRoute />;
						}}
					></Route>
				</Switch>
			)}
		</HashRouter>
	);
};
