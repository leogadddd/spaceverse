import { MenuComponent } from './components/menu/menuComponent';
import { NavigationBarComponent } from './components/navigationBar';
import { ToolBar } from './components/toolbar';
import { UniverseComponent } from './components/universe';
import { WidgetsComponent } from './components/widgets';

const App = () => {
	return (
		<>
			<UniverseComponent />
			<NavigationBarComponent />
			<ToolBar />
			<WidgetsComponent />
			<MenuComponent />
		</>
	);
}

export default App;
