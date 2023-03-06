import { pomodoroStates, pomodoroTimerStates } from "../../../util/enums/pomodoro";
import { PomodoroActionTypes } from "../../../util/enums/pomodoroActionTypes";
import { pomodoroAdderTime } from "../../../util/interfaces/state/pomodoroState";

interface pomodoroActionSetState {
	type: PomodoroActionTypes.SET_POMODORO_STATE;
	value: pomodoroStates;
}

interface pomodoroActionSetTimerState {
	type: PomodoroActionTypes.SET_POMODORO_TIMER_STATE;
	value: pomodoroTimerStates;
}

interface pomodoroActionSetMaxShortBreaks {
	type: PomodoroActionTypes.SET_POMODORO_MAX_SHORT_BREAKS;
	value: number;
}

interface pomodoroActionSetShortBreaks {
	type: PomodoroActionTypes.SET_POMODORO_SHORT_BREAKS;
	value: number;
}

interface pomodoroActionSetStateDefaultDuration {
	type: PomodoroActionTypes.SET_POMODORO_STATE_DEFAULT_DURATION;
	state: pomodoroStates;
	value: number;
}

interface pomodoroActionSetActions {
	type: PomodoroActionTypes.TIMER_TICK | PomodoroActionTypes.TIMER_RESET | PomodoroActionTypes.TIMER_RESET_ALL | PomodoroActionTypes.TIMER_START | PomodoroActionTypes.TIMER_PAUSE | PomodoroActionTypes.TIMER_STOP | PomodoroActionTypes.TIMER_COMPLETE;
}

interface pomodoroActionAddAdderTime {
	type: PomodoroActionTypes.ADD_ADDERTIME;
	value: pomodoroAdderTime;
}

interface pomodoroActionRemoveAdderTime {
	type: PomodoroActionTypes.REMOVE_ADDERTIME;
	value: string;
}

interface pomodoroActionAddPomodoro {
	type: PomodoroActionTypes.ADD_POMODORO_TIMER_ADDER;
	value: pomodoroAdderTime;
}

export type pomodoroAction = | pomodoroActionSetState | pomodoroActionSetTimerState | pomodoroActionSetMaxShortBreaks | pomodoroActionSetShortBreaks | pomodoroActionSetStateDefaultDuration | pomodoroActionSetActions | pomodoroActionAddAdderTime | pomodoroActionRemoveAdderTime | pomodoroActionAddPomodoro;