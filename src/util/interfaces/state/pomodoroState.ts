import { pomodoroStates, pomodoroTimerStates } from "../../enums/pomodoro";

export interface pomodoroAdderTime {
	id: string;
	label: string;
	value: number;
}

export interface PomodoroState {
	state: pomodoroStates
	timerState: pomodoroTimerStates
	maxShortBreaks: number
	shortBreaks: number
	pomodoro: number
	shortBreak: number
	longBreak: number
	pomodoroDefaultDuration: number
	shortBreakDefaultDuration: number
	longBreakDefaultDuration: number
	adderTimes: pomodoroAdderTime[]
}

export interface pomodoroDefaultDurationProps {
	type: pomodoroStates
	value: number
}