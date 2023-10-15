import * as React from 'react';
import {GlobalErrorBoundary} from './components/error';
import {LoadingCurtain} from './components/loading-curtain/loading-curtain';
import {LocaleSwitcher} from './store/locale-switcher';
import {PrefsContextProvider} from './store/prefs';
import {Routes} from './routes';
import {StoriesContextProvider} from './store/stories';
import {StoryFormatsContextProvider} from './store/story-formats';
import {StateLoader} from './store/state-loader';
import {ThemeSetter} from './store/theme-setter';
import {QueryClient, QueryClientProvider} from 'react-query';
import 'focus-visible';
import './styles/typography.css';
import './styles/focus-visible-shim.css';
import {RecoilRoot} from "recoil";


const queryClient = new QueryClient()

export const App: React.FC = () => {
	return (
		<GlobalErrorBoundary>
			<PrefsContextProvider>
				<LocaleSwitcher />
				<ThemeSetter />
				<StoryFormatsContextProvider>
					<StoriesContextProvider>
								<React.Suspense fallback={<LoadingCurtain />}>
									<RecoilRoot>
										<QueryClientProvider client={queryClient}>
											<Routes />
										</QueryClientProvider>
									</RecoilRoot>
								</React.Suspense>
					</StoriesContextProvider>
				</StoryFormatsContextProvider>
			</PrefsContextProvider>
		</GlobalErrorBoundary>
	);
};
