import { Dispatch } from "react";
import { pomodoroStates, pomodoroTimerStates } from "../../../util/enums/pomodoro";
import { PomodoroActionTypes } from "../../../util/enums/pomodoroActionTypes";
import { pomodoroAdderTime, pomodoroDefaultDurationProps } from "../../../util/interfaces/state/pomodoroState";
import { pomodoroAction } from "../actions";


export const setPomodoroState = (state: pomodoroStates) => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.SET_POMODORO_STATE,
			value: state,
		});
	}
}

export const setPomodoroTimerState = (state: pomodoroTimerStates) => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.SET_POMODORO_TIMER_STATE,
			value: state,
		});
	}
}

export const setPomodoroMaxShortBreaks = (maxShortBreaks: number) => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.SET_POMODORO_MAX_SHORT_BREAKS,
			value: maxShortBreaks,
		});
	}
}

export const setPomodoroShortBreaks = (shortBreaks: number) => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.SET_POMODORO_SHORT_BREAKS,
			value: shortBreaks,
		});
	}
}

export const setPomodoroStateDefaultDuration = (pomodoroDuration: pomodoroDefaultDurationProps) => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.SET_POMODORO_STATE_DEFAULT_DURATION,
			state: pomodoroDuration.type,
			value: pomodoroDuration.value,
		});
	}
}

export const pomodoroTimerTick = () => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.TIMER_TICK,
		});
	}
}

export const pomodoroTimerReset = () => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.TIMER_RESET,
		});
	}
}

export const pomodoroTimerResetAll = () => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.TIMER_RESET_ALL,
		});
	}
}

export const pomodoroTimerStart = () => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.TIMER_START,
		});
	}
}

export const pomodoroTimerPause = () => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.TIMER_PAUSE,
		});
	}
}

export const pomodoroTimerStop = () => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.TIMER_STOP,
		});
	}
}

export const pomodoroTimerComplete = () => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.TIMER_COMPLETE,
		});
	}
}

export const addPomodoroAdderTime = (adderTime: pomodoroAdderTime) => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.ADD_ADDERTIME,
			value: adderTime,
		});
	}
}

export const removePomodoroAdderTime = (adderTimeId: string) => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.REMOVE_ADDERTIME,
			value: adderTimeId,
		});
	}
}

export const pomodoroAddToTimer = (adderTime: pomodoroAdderTime) => {
	return (dispatch: Dispatch<pomodoroAction>) => {
		dispatch({
			type: PomodoroActionTypes.ADD_POMODORO_TIMER_ADDER,
			value: adderTime,
		});
	}
}