import React from 'react';
import { NavigationBar } from './components/navigationBar';
import { UniverseComponent } from './components/universe';

const App = () => {
	return (
		<>
			<UniverseComponent />
			<NavigationBar />
		</>
	);
}

export default App;
