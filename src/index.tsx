import App from './App';
import './style/index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './lib/';
import { ThemeProvider } from './util/context/themeContext';
import { UniverseContextProvider } from './util/context/universeContext';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { PomodoroContextProvider } from './util/context/pomodoroContext';
import Cms from './Cms';
import { SpotifyPlaylistContextProvider } from './util/context/spotifyPlaylistContext';
import { WidgetsContextProvider } from './util/context/widgetsContext';

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
			<WidgetsContextProvider>
				<SpotifyPlaylistContextProvider>
					<PomodoroContextProvider>
						<UniverseContextProvider>
							<ThemeProvider initialTheme>
								<Routes>
									<Route path="/" element={<App />} />
									{
										process.env.NODE_ENV === 'development' && <Route path="/cms" element={<Cms />} />
									}
								</Routes>
							</ThemeProvider>
						</UniverseContextProvider>
					</PomodoroContextProvider>
				</SpotifyPlaylistContextProvider>
			</WidgetsContextProvider>
		</Provider>
	</BrowserRouter>
);
