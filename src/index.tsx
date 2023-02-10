import App from './App';
import React from 'react';
import './style/index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './lib/';
import { ThemeProvider } from './util/context/themeContext';
import { UniverseContextProvider } from './util/context/universeContext';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { PomodoroContextProvider } from './util/context/pomodoroContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<PomodoroContextProvider>
				<UniverseContextProvider>
					<ThemeProvider initialTheme>
						<Routes>
							<Route path="/" element={<App />} />
						</Routes>
					</ThemeProvider>
				</UniverseContextProvider>
			</PomodoroContextProvider>
		</Provider>
	</BrowserRouter>
);
