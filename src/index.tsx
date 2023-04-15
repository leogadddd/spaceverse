import "./style/index.css"
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/lib/';
import { ThemeProvider } from './app/util/context/themeContext';
import { UniverseContextProvider } from './app/util/context/universeContext';
import { BrowserRouter } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
import { PomodoroContextProvider } from './app/util/context/pomodoroContext';
import { SpotifyPlaylistContextProvider } from './app/util/context/spotifyPlaylistContext';
import { WidgetsContextProvider } from './app/util/context/widgetsContext';
import { WhatsNewContextProvider } from './app/util/context/whatsnewContext';
import routes, { ERoute, getSpecificRoute, IRoutes } from './routes';
import { auth } from './app/firebase';
import { ProtectedRoute } from "./protectedRoute";

// march 13, 2023 10:00 am - The day the website is released

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
										<Route path="/" element={
											localStorage.getItem("isFirstVisit") !== "true" ? <Navigate to={getSpecificRoute("website")?.path!} /> : localStorage.getItem("isFinishSurvey") !== "true" ? <Navigate to={getSpecificRoute("welcome")?.path!} /> : <Navigate to={getSpecificRoute("home")?.path!} />
										} />
										{
											routes.map((route: IRoutes) => {
												let Component = route.component;
												let check = route.check;
												let redirect = route.redirect;
												let path = route.path;
												let isPrivate = route.isPrivate;

												switch (route.routeType) {
													case ERoute.component:
														// simple component route
														if(isPrivate)
															return <Route key={route.id} path={path} element={<ProtectedRoute component={Component} />} />

														return <Route key={route.id} path={path} element={<Component />} />
													case ERoute.twoComponentWithCheck:
														// component with check route (if check is true, render component1, else render component2)
														let Component1 = Component[0];
														let Component2 = Component[1];

														if(isPrivate)
															return <Route key={route.id} path={path} element={<ProtectedRoute component={check!() ? Component2 : Component1} />} />

														return <Route key={route.id} path={path} element={check!() ? <Component1 /> : <Component2 />} />
													case ERoute.componentWithCheck:
														// component with check route (if check is true, render component, else render null)
														const isCheck = check!();

														if (isCheck) {
															if(isPrivate)
																return <Route key={route.id} path={path} element={<ProtectedRoute component={Component} />} />

															return <Route key={route.id} path={path} element={<Component />} />
														}

														return null;
													case ERoute.componentWithRedirectAndCheck:
														// component with check route (if check is true, render component, else redirect to redirect path)

														if(isPrivate)
															return <Route key={route.id} path={path} element={<ProtectedRoute component={check!() ? Component : <Navigate to={redirect!} />} />} />

														return <Route key={route.id} path={path} element={check!() ? <Component /> : <Navigate to={redirect!} />} />
													default:
														break;

												}

												return null
											})
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

// {
// 	process.env.NODE_ENV === 'development' || isReleased ? (
// 		<>
// 			<Route path="/" element={
// 				localStorage.getItem("isFirstVisit") !== "true" ? <Navigate to={getSpecificRoute("website")?.path!} /> : localStorage.getItem("isFinishSurvey") !== "true" ? <Navigate to={getSpecificRoute("welcome")?.path!} /> : <Navigate to={getSpecificRoute("home")?.path!} />
// 			} />
// 			{/* {
// 				(process.env.NODE_ENV === 'development' && isReleased) && (
// 					<>
// 						<Route path="/release" element={<CountdownTimer date={DateToBeReleased} />} />
// 					</>
// 				)
// 			} */}
// 			{
// 				// routes is an list contains an object which has the route path and path, component, and a check function to see if the route should be rendered but check first if check is undefined
// 				routes.map((route: IRoutes) => {
// 					let Component = route.component;

// 					if(route.redirect && route.check && route.component) {
// 						return <Route key={route.path} path={route.path} element={route.check() ? <Component /> : <Navigate to={route.redirect} />} />;
// 					} else if (route.redirect) {
// 						return <Route key={route.path} path={route.path} element={<Navigate to={route.redirect} />} />;
// 					} else if (typeof Component === "object" && route.check) {
// 						let Component1 = Component[0];
// 						let Component2 = Component[1];
// 						return <Route key={route.path} path={route.path} element={route.check() ? <Component1 /> : <Component2 />} />;
// 					} else if (route.check) {
// 						return route.check() && <Route key={route.path} path={route.path} element={<Component />} />;
// 					}
// 					return <Route key={route.path} path={route.path} element={<Component />} />;
// 				})
// 			}
// 		</>
// 	) : (
// 		<>
// 			<Route path="/release" element={<CountdownTimer date={DateToBeReleased} />} />
// 			<Route path="*" element={<Navigate to="/release" />} />
// 		</>
// 	)
// }
