import { MenuComponent } from './components/menu/menuComponent';
import { NavigationBarComponent } from './components/navigationBar';
import { ToolBarComponent } from './components/toolbar';
import { UniverseComponent } from './components/universe';
import { WidgetsComponent } from './components/widgets';
import { NotificationComponent } from './components/notification';
import { useEffect } from 'react';
import { getSpecificRoute } from '../routes';
import { useNavigate } from 'react-router';

const App = () => {

	const navigate = useNavigate()
	const isFinishSurvey = localStorage.getItem('finishedSurvey') === 'true'

	useEffect(() => {
		!isFinishSurvey && navigate(getSpecificRoute('welcome')?.path!)
	}, [])
	
	return (
		<>
			<UniverseComponent />
			<NavigationBarComponent />
			<ToolBarComponent />
			<WidgetsComponent />
			<MenuComponent />
			<NotificationComponent />
		</>
	);
}

export default App;
