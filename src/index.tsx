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
import routes, { getSpecificRoute } from './routes';

const isOldVersion = localStorage.getItem('buildVersion') !== process.env.REACT_APP_buildVersion;

if (isOldVersion) {
	localStorage.clear();
	localStorage.setItem('buildVersion', process.env.REACT_APP_buildVersion as string);
}

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

export interface IRoutes {
	id: string;
	path: string;
	component: any;
	check?: () => boolean;
}

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
										{
											// routes is an list contains an object which has the route path and path, component, and a check function to see if the route should be rendered but check first if check is undefined
											routes.map((route: IRoutes) => {
												const Component = route.component;
												if (route.check) {
													return route.check() && <Route key={route.path} path={route.path} element={<Component />} />;
												}
												return <Route key={route.path} path={route.path} element={<Component />} />;
											})
										}
										{/* <Route path={getSpecificRoute("home")?.path} element={<App />} />
										<Route path={getSpecificRoute("website")?.path}  element={<Site />} />
										<Route path={getSpecificRoute("terms")?.path}  element={<TermsOfService />} />
										<Route path={getSpecificRoute("priacy")?.path}  element={<PrivacyPolicy />} />
										<Route path={getSpecificRoute("thankyou")?.path}  element={<ThanksPage />} />
										{
											process.env.NODE_ENV === 'development' && <Route path="/cms" element={<Cms />} />
										}
										<Route path={getSpecificRoute("404")?.path} element={<PageNotFound />} /> */}
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
