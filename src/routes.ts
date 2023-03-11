import { IRoutes } from ".";
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
import { Welcome } from "./app/Welcome";

const routes: IRoutes[] = [
	{
		id: 'home',
		path: '/universe',
		component: [App, App],
		check: () => {
			return isMobile;
		}
	},
	{
		id: 'welcome',
		path: '/welcome',
		component: Welcome
	},
	{
		id: 'website',
		path: '/website',
		component: Site,
	},
	{
		id: '404',
		path: '*',
		component: PageNotFound,
	},
	{
		id: 'privacy',
		path: '/privacy',
		component: PrivacyPolicy,
	},
	{
		id: 'terms',
		path: '/terms',
		component: TermsOfService,
	},
	{
		id: 'thankyou',
		path: '/thankyou',
		component: ThanksPage,
	},
	{
		id: 'release',
		path: '/release',
		component: null,
		redirect: '/'
	},
	{
		id: 'resource',
		path: '/resource',
		component: Resources,
	},
	{
		id: 'cms',
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