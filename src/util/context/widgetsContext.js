import React from 'react'

const initialState = []

export const localStorageWidgetsName = "widgetsContext"

const getInitialWidgets = () => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const storedPrefs = window.localStorage.getItem(localStorageWidgetsName);
		if (typeof storedPrefs === 'string') {
			return JSON.parse(storedPrefs);
		}

		window.localStorage.setItem(localStorageWidgetsName, JSON.stringify(initialState));
		return initialState;
		
	}
}

export const WidgetsContext = React.createContext();

export const WidgetsContextProvider = ({ children }) => {
	const [ctx, setCtx] = React.useState(getInitialWidgets);

	React.useEffect(() => {
		localStorage.setItem(localStorageWidgetsName, JSON.stringify(ctx));
	}, [ctx]);

	return (
		<WidgetsContext.Provider value={{ ctx, setCtx }}>
			{children}
		</WidgetsContext.Provider>
	);
}