import React from 'react'

const initialWhatsNewContext = {
	version: "",
	versionName: "",
	isNew: false,
}

const localStorageName = 'whatsNewContext';

const getInitialWhatsNew = () => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const storedPrefs = window.localStorage.getItem('whatsNewContext');
		if (typeof storedPrefs === 'string') {
			return JSON.parse(storedPrefs);
		}

		window.localStorage.setItem(localStorageName, JSON.stringify(initialWhatsNewContext));
		return initialWhatsNewContext;
		
	}
}

export const WhatsNewContext = React.createContext();

export const WhatsNewContextProvider = ({ children }) => {
	const [ctx, setCtx] = React.useState(getInitialWhatsNew);

	const rawSetWhatsNew = (rawWhatsNewCtx) => {
		const stringifiedWhatsNewCtx = JSON.stringify(rawWhatsNewCtx);
		localStorage.setItem(localStorageName, stringifiedWhatsNewCtx);
	};

	React.useEffect(() => {
		rawSetWhatsNew(ctx);
	}, [ctx]);

	return (
		<WhatsNewContext.Provider value={{ ctx, setCtx }}>
			{children}
		</WhatsNewContext.Provider>
	);
}