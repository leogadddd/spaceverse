import { pomodoroTimerStates } from "../../../../util/enums/pomodoro"

export interface ModeSwitcherItemProps {
	onClick: () => void
	active: boolean
	label: string
}

export interface TimerAdderItemProps {
	onClick: () => void
	label: string
	value: number
}

export interface TimerProps {
	timerState: pomodoroTimerStates
	timerMinutes: string
	timerSeconds: string
	onStart: () => void
	onReset: () => void
}

export interface TimerControlsProps {
	onClick: () => void
}

export interface TimerControlsOnStartProps {
	onClick: () => void
	state: pomodoroTimerStates
}

export interface ShortBreakIndicatorProps {
	shortBreaks: number
	maxShortBreaks: number
}
export interface ShortBreakIndicatorItemProps {
	active: boolean
}

export interface PomodoroSettingsButtonProps {
	onClick: () => void
}

export interface PomodoroSettingsNumberInputProps {
	title: string
	value: number
	onChange: (value: number) => void
}