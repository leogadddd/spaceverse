import { pomodoroStates, pomodoroTimerStates } from "../../../util/enums/pomodoro";
import { PomodoroActionTypes } from "../../../util/enums/pomodoroActionTypes";
import { PomodoroState } from "../../../util/interfaces/state/pomodoroState";
import { pomodoroAction } from "../actions";

const initialState: PomodoroState = {
	state: pomodoroStates.POMODORO,
	timerState: pomodoroTimerStates.STOP,
	maxShortBreaks: 4,
	shortBreaks: 0,
	pomodoro: 0,
	shortBreak: 0,
	longBreak: 0,
	pomodoroDefaultDuration: 0,
	shortBreakDefaultDuration: 0,
	longBreakDefaultDuration: 0,
	adderTimes: []
}

export const pomodoroReducer = (state = initialState, action: pomodoroAction): PomodoroState => {
	switch (action.type) {
		case PomodoroActionTypes.SET_POMODORO_STATE:
			return {
				...state,
				state: action.value
			}
		case PomodoroActionTypes.SET_POMODORO_TIMER_STATE:
			return {
				...state,
				timerState: action.value
			}
		case PomodoroActionTypes.SET_POMODORO_MAX_SHORT_BREAKS:
			return {
				...state,
				maxShortBreaks: action.value,
				shortBreaks: 0
			}
		case PomodoroActionTypes.SET_POMODORO_SHORT_BREAKS:
			return {
				...state,
				shortBreaks: action.value
			}
		case PomodoroActionTypes.SET_POMODORO_STATE_DEFAULT_DURATION:
			return {
				...state,
				[`${action.state}DefaultDuration`]: action.value
			}
		case PomodoroActionTypes.TIMER_TICK:
			
			return {
				...state,
				[state.state]: state[state.state] <= 0 ? 0 : Math.round(state[state.state] - 1)
			}
		case PomodoroActionTypes.TIMER_RESET:
			return {
				...state,
				pomodoro: state.pomodoroDefaultDuration * 60,
				shortBreak: state.shortBreakDefaultDuration * 60,
				longBreak: state.longBreakDefaultDuration * 60,
				state: pomodoroStates.POMODORO,
				shortBreaks: 0
			}
		case PomodoroActionTypes.TIMER_RESET_ALL:
			return {
				...state,
				pomodoro: state.pomodoroDefaultDuration * 60,
				shortBreak: state.shortBreakDefaultDuration * 60,
				longBreak: state.longBreakDefaultDuration * 60,
				shortBreaks: 0,
			}
		case PomodoroActionTypes.TIMER_START:
			return {
				...state,
				timerState: pomodoroTimerStates.START
			}
		case PomodoroActionTypes.TIMER_PAUSE:
			return {
				...state,
				timerState: pomodoroTimerStates.PAUSE
			}
		case PomodoroActionTypes.TIMER_STOP:
			return {
				...state,
				timerState: pomodoroTimerStates.STOP
			}
		case PomodoroActionTypes.TIMER_COMPLETE:
			const newState = () => {
				if(state.state === pomodoroStates.POMODORO && state.shortBreaks < state.maxShortBreaks) {
					return pomodoroStates.SHORT_BREAK
				} else if(state.state === pomodoroStates.POMODORO && state.shortBreaks >= state.maxShortBreaks) {
					return pomodoroStates.LONG_BREAK
				} else {
					return pomodoroStates.POMODORO
				}
			}

			const newShortBreak = () => {
				if(state.state === pomodoroStates.SHORT_BREAK) {
					return state.shortBreaks + 1
				} else if(state.shortBreaks >= state.maxShortBreaks) {
					return 0
				}else {
					return state.shortBreaks
				}
			}

			return {
				...state,
				shortBreaks: newShortBreak(),
				state: newState(),
				[state.state]: state[`${state.state}DefaultDuration`] * 60
			}
		case PomodoroActionTypes.ADD_ADDERTIME:
			return {
				...state,
				adderTimes: [...state.adderTimes, action.value]
			}
		case PomodoroActionTypes.REMOVE_ADDERTIME:
			return {
				...state,
				adderTimes: state.adderTimes.filter(addertime => addertime.id !== action.value)
			}
		case PomodoroActionTypes.ADD_POMODORO_TIMER_ADDER:
			return {
				...state,
				[state.state]: state[state.state] + action.value.value * 60
			}
		default:
			return state
	}
}

export default pomodoroReducer
export type pomodoroState = ReturnType<typeof pomodoroReducer>