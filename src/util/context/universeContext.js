import React from 'react'

const initialState = {
	universeCurrentCategortIndex: null,
	universeCurrentCategory: null,
	universeCurrentUniverseIndex: null,
	universeCurrentUniverse: null,
	universeCurrentVolume: 0,
	universeIsMuted: false,
}

const localStorageName = 'universeContext';

const getInitialUniverse = () => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const storedPrefs = window.localStorage.getItem(localStorageName);
		if (typeof storedPrefs === 'string') {
			return JSON.parse(storedPrefs);
		}

		window.localStorage.setItem(localStorageName, JSON.stringify(initialState));
		return initialState;
		
	}
}

export const UniverseContext = React.createContext();

export const UniverseContextProvider = ({ children }) => {
	const [ctx, setCtx] = React.useState(getInitialUniverse);

	const rawSetUniverse = (rawUniverseCtx) => {
		const stringifiedUniverseCtx = JSON.stringify(rawUniverseCtx);
		localStorage.setItem(localStorageName, stringifiedUniverseCtx);
	};

	React.useEffect(() => {
		rawSetUniverse(ctx);
	}, [ctx]);

	return (
		<UniverseContext.Provider value={{ ctx, setCtx }}>
			{children}
		</UniverseContext.Provider>
	);
}