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
import CountdownTimer from './website/Countdown';

// march 13, 2023
const DateToBeReleased = new Date(2023, 2, 13, 10, 0).getTime();
const Today = new Date().getTime();

const isReleased = DateToBeReleased < Today;

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
	redirect?: string;
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
											process.env.NODE_ENV === 'development' || isReleased ? (
												<>
													<Route path="/" element={
														localStorage.getItem("isFirstVisit") !== "true" ? <Navigate to={getSpecificRoute("website")?.path!} /> : localStorage.getItem("isFinishSurvey") !== "true" ? <Navigate to={getSpecificRoute("welcome")?.path!} /> : <Navigate to={getSpecificRoute("home")?.path!} />
													} />
													{/* {
														(process.env.NODE_ENV === 'development' && isReleased) && (
															<>
																<Route path="/release" element={<CountdownTimer date={DateToBeReleased} />} />
															</>
														)
													} */}
													{
														// routes is an list contains an object which has the route path and path, component, and a check function to see if the route should be rendered but check first if check is undefined
														routes.map((route: IRoutes) => {
															let Component = route.component;

															if (route.redirect) {
																return <Route key={route.path} path={route.path} element={<Navigate to={route.redirect} />} />;
															} else if (typeof Component === "object" && route.check) {
																let Component1 = Component[0];
																let Component2 = Component[1];
																return <Route key={route.path} path={route.path} element={route.check() ? <Component1 /> : <Component2 />} />;
															} else if (route.check) {
																return route.check() && <Route key={route.path} path={route.path} element={<Component />} />;
															}
															return <Route key={route.path} path={route.path} element={<Component />} />;
														})
													}
												</>
											) : (
												<>
													<Route path="/release" element={<CountdownTimer date={DateToBeReleased} />} />
													<Route path="*" element={<Navigate to="/release" />} />
												</>
											)
										}
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
