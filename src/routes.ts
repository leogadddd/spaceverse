import App from "./app/App";
import Cms from "./cms/Cms";
import PageNotFound from "./website/404";
import PrivacyPolicy from "./website/privacyPolicy";
import Site from "./website/site";
import TermsOfService from "./website/termsOfService";
import ThanksPage from "./website/thanksPage";
import { isMobile } from "react-device-detect";
import NoMobile from "./website/NoMobile";
import Resources from "./website/resources";
import Welcome from "./app/Welcome";
import SignUp from "./website/signUp";
import SignIn from "./website/signIn";
import { auth } from "./app/firebase";

export enum ERoute {
	component = "componentRoute",
	twoComponentWithCheck = "twoComponentWithCheckRoute",
	componentWithCheck = "componentWithCheckRoute",
	componentWithRedirectAndCheck = "componentWithRedirectAndCheckRoute",
	twoRedirectWithCheck = "twoRedirectWithCheckRoute",
}

export interface IRoutes {
	id: string;
	routeType: ERoute;
	isPrivate?: boolean;
	path: string;
	component: any;
	check?: () => boolean;
	redirect?: string;
}

const routes: IRoutes[] = [
	{
		id: 'register',
		routeType: ERoute.componentWithRedirectAndCheck,
		path: '/register',
		component: SignUp,
		redirect: '/',
		check: () => {
			return auth.currentUser === null;
		}
	},
	{
		id: 'login',
		routeType: ERoute.componentWithRedirectAndCheck,
		path: '/login',
		component: SignIn,
		redirect: '/',
		check: () => {
			return auth.currentUser === null;
		}	
	},
	{
		id: 'home',
		routeType: ERoute.twoComponentWithCheck,
		isPrivate: true,
		path: '/universe',
		component: [App, NoMobile],
		check: () => {
			return isMobile;
		}
	},
	{
		id: 'welcome',
		routeType: ERoute.component,
		isPrivate: true,
		path: '/welcome',
		component: Welcome
	},
	{
		id: 'website',
		routeType: ERoute.component,
		path: '/website',
		component: Site,
	},
	{
		id: '404',
		routeType: ERoute.component,
		path: '*',
		component: PageNotFound,
	},
	{
		id: 'privacy',
		routeType: ERoute.component,
		path: '/privacy',
		component: PrivacyPolicy,
	},
	{
		id: 'terms',
		routeType: ERoute.component,
		path: '/terms',
		component: TermsOfService,
	},
	{
		id: 'thankyou',
		routeType: ERoute.component,
		path: '/thankyou',
		component: ThanksPage,
	},
	{
		id: 'resources',
		routeType: ERoute.component,
		isPrivate: true,
		path: '/resources',
		component: Resources,
	},
	{
		id: 'cms',
		routeType: ERoute.componentWithCheck,
		path: '/cms',
		component: Cms,
		check: () => {
			return process.env.NODE_ENV === 'development';
		}
	}
]

export const getSpecificRoute = (id: string) => {
	return routes.find(route => route.id === id);
}

export default routes;