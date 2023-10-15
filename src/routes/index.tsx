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
import { SelectRoute } from './select/select-route';
import { GamePlayRoute } from './game-play/game-play-route';
import { LoginRoute } from './login';
import { SignupRoute } from './signup';
import { BoardRoute, ThreadRoute, WriteRoute, ModifyRoute } from './board';
import { GameUploadRoute } from './game-upload'
import { StoryInfoRoute } from './game-upload'
import { ExceptionRoute } from './exception';
import { BetaInfo } from './info';
import {ReactQueryDevtools} from "react-query/devtools"
import ScrollToTop from "./ScrollToTop"
import { DataBaseLoader } from '../store/database/DataBaseLoader';
import { StateLoader } from '../store/state-loader';



export const Routes: React.FC = () => {
	const [isDBLoading, setisDBLoading] = React.useState(false);
	//const {prefs} = usePrefsContext(); //store, 리덕스를 대체하기 위해 만든 훅
	
	// A <HashRouter> is used to make our lives easier--to load local story
	// formats, we need the document HREF to reflect where the HTML file is.
	// Otherwise we'd have to store the actual location somewhere, which will
	// differ between web and Electron contexts.

	//console.log(prefs.welcomeSeen);
	return (//라우터 변경시 위아래 둘 다 바꿔줘야됨!!!
		<HashRouter>
				<ScrollToTop />
				<Switch>
					<Route exact path="/">
						<HomeRoute />
					</Route>
					<Route exact path="/select">
						<SelectRoute />
					</Route>
					<Route exact path="/login">
						<LoginRoute />
					</Route>
					<Route exact path="/signup">
						<SignupRoute />
					</Route>
					<Route path="/gameplay/:genre">
						<GamePlayRoute />
					</Route>
					<Route exact path="/story-list">
						<DataBaseLoader>
							<StateLoader>
								<StoryListRoute />
							</StateLoader>
						</DataBaseLoader>
					</Route>
					<Route path={`/thread/:viewId`}>
                    	<ThreadRoute />    
					</Route>
					<Route path={`/modify/:viewId`}>
                    	<ModifyRoute />    
					</Route>
					<Route path={"/write"}>
						<WriteRoute />
					</Route>
					<Route path="/board/:category">
						<BoardRoute />
					</Route>
					<Route path="/storyInfo/:storyDbId">
						<StoryInfoRoute />
					</Route>
					<Route path="/game-upload/:category/:pageNum">
						<GameUploadRoute />
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
						<StateLoader>
							<StoryEditRoute />
						</StateLoader>
					</Route>

					<Route path="/beta">
						<BetaInfo />
					</Route>

					<Route
						path="*"
						render={path => {
							console.warn(
								`No route for path "${path.location.pathname}", rendering story list`
							);
							return <ExceptionRoute />;
						}}
					></Route>
				</Switch>
			{/* <ReactQueryDevtools initialIsOpen={true} /> */}
		</HashRouter>
	);
};
