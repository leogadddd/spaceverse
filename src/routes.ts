import { IRoutes } from ".";
import App from "./app/App";
import Cms from "./cms/Cms";
import PageNotFound from "./website/404";
import PrivacyPolicy from "./website/privacyPolicy";
import Site from "./website/site";
import TermsOfService from "./website/termsOfService";
import ThanksPage from "./website/thanksPage";

const routes: IRoutes[] = [
	{
		id: 'home',
		path: '/',
		component: App,
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