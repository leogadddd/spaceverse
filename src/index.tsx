import App from './App';
import React from 'react';
import './style/index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './lib/';
import { ThemeProvider } from './util/context/themeContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<ThemeProvider initialTheme>
			<App />
		</ThemeProvider>
	</Provider>
);
