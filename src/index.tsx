import App from './App';
import './style/index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './lib/';
import { ThemeProvider } from './util/context/themeContext';
import { UniverseContextProvider } from './util/context/universeContext';
import { BrowserRouter, redirect } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
import { PomodoroContextProvider } from './util/context/pomodoroContext';
import Cms from './Cms';
import { SpotifyPlaylistContextProvider } from './util/context/spotifyPlaylistContext';
import { WidgetsContextProvider } from './util/context/widgetsContext';
import { WhatsNewContextProvider } from './util/context/whatsnewContext';

const isOldVersion = localStorage.getItem('buildVersion') !== process.env.REACT_APP_buildVersion;

if (isOldVersion) {
	localStorage.clear();
	localStorage.setItem('buildVersion', process.env.REACT_APP_buildVersion as string);
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
										<Route path="/app" element={<App />} />
										{
											process.env.NODE_ENV === 'development' && <Route path="/cms" element={<Cms />} />
										}
										<Route path="*" element={<Navigate to="/app" />} />
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
