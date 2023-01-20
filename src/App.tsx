import { NavigationBarComponent } from './components/navigationBar';
import { UniverseComponent } from './components/universe';
import { WidgetsComponent } from './components/widgets';

const App = () => {
	return (
		<>
			<UniverseComponent />
			<NavigationBarComponent />
			<WidgetsComponent />
		</>
	);
}

export default App;
