import React from 'react'

const initialPomodoroContext = {
	pomodoroDefault: 25,
	shortBreakDefault: 5,
	longBreakDefault: 15,
	pomodoroMaxShortBreaks: 4,
	timerAdder: [
		{
			id: '5mins-adder',
			label: '+5mins',
			value: 5,
		},
		{
			id: '15mins-adder',
			label: '+15mins',
			value: 15,
		},
		{
			id: '25mins-adder',
			label: '+25mins',
			value: 25,
		},
	]
}

const localStorageName = 'pomodoroContext';

const getInitialPomodoro = () => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const storedPrefs = window.localStorage.getItem('pomodoroContext');
		if (typeof storedPrefs === 'string') {
			return JSON.parse(storedPrefs);
		}

		window.localStorage.setItem(localStorageName, JSON.stringify(initialPomodoroContext));
		return initialPomodoroContext;
		
	}
}

export const PomodoroContext = React.createContext();

export const PomodoroContextProvider = ({ children }) => {
	const [ctx, setCtx] = React.useState(getInitialPomodoro);

	const rawSetPomodoro = (rawPomodoroCtx) => {
		const stringifiedPomodoroCtx = JSON.stringify(rawPomodoroCtx);
		localStorage.setItem(localStorageName, stringifiedPomodoroCtx);
	};

	React.useEffect(() => {
		rawSetPomodoro(ctx);
	}, [ctx]);

	return (
		<PomodoroContext.Provider value={{ ctx, setCtx }}>
			{children}
		</PomodoroContext.Provider>
	);
}