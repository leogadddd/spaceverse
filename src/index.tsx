import App from './app/App';
import "./style/index.css"
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/lib/';
import { ThemeProvider } from './app/util/context/themeContext';
import { UniverseContextProvider } from './app/util/context/universeContext';
import { BrowserRouter } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
import { PomodoroContextProvider } from './app/util/context/pomodoroContext';
import Cms from './cms/Cms';
import { SpotifyPlaylistContextProvider } from './app/util/context/spotifyPlaylistContext';
import { WidgetsContextProvider } from './app/util/context/widgetsContext';
import { WhatsNewContextProvider } from './app/util/context/whatsnewContext';
import Site from './website/site';
import PageNotFound from './website/404';
import TermsOfService from './website/termsOfService';
import PrivacyPolicy from './website/privacyPolicy';
import ThanksPage from './website/thanksPage';

const isOldVersion = localStorage.getItem('buildVersion') !== process.env.REACT_APP_buildVersion;


if (isOldVersion) {
	localStorage.clear();
	localStorage.setItem('buildVersion', process.env.REACT_APP_buildVersion as string);
}

const isNotTheFirstTime = localStorage.getItem('isNotTheFirstTimeContext') === 'true';

if (isNotTheFirstTime) {
	// check if the user is on the universe page
	if (!window.location.pathname.includes('/universe')) {
		// if so, redirect to the home page
		window.location.href = '/universe';
	}
}

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<WhatsNewContextProvider>
				<WidgetsContextProvider>
					<SpotifyPlaylistContextProvider>
						<PomodoroContextProvider>
							<UniverseContextProvider>
								<ThemeProvider initialTheme>
									<Routes>
										<Route path="/universe" element={<App />} />
										<Route path="/" element={<Site />} />
										<Route path="/terms" element={<TermsOfService />} />
										<Route path="/privacy" element={<PrivacyPolicy />} />
										<Route path="/thankyou" element={<ThanksPage />} />
										{
											process.env.NODE_ENV === 'development' && <Route path="/cms" element={<Cms />} />
										}
										<Route path="*" element={<PageNotFound />} />
									</Routes>
								</ThemeProvider>
							</UniverseContextProvider>
						</PomodoroContextProvider>
					</SpotifyPlaylistContextProvider>
				</WidgetsContextProvider>
			</WhatsNewContextProvider>
		</Provider>
	</BrowserRouter>
);
