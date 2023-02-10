import Widget from "../../widgetContainer"
import { VscDebugRestart } from "react-icons/vsc"
import { FC, PropsWithChildren, useContext, useEffect, useState } from "react"
import { ModeSwitcherItemProps, PomodoroSettingsButtonProps, ShortBreakIndicatorItemProps, ShortBreakIndicatorProps, TimerAdderItemProps, TimerControlsOnStartProps, TimerControlsProps, TimerProps } from "./pomodoroProps"
import { pomodoroAdderTime, PomodoroState } from "../../../../util/interfaces/state/pomodoroState"
import { useDispatch, useSelector } from "react-redux"
import { creators } from "../../../../lib"
import { bindActionCreators } from "@reduxjs/toolkit"
import { store } from "../../../../lib"
import { pomodoroStates, pomodoroTimerStates } from "../../../../util/enums/pomodoro"
import { GoGear } from 'react-icons/go';
import { PomodoroContext } from "../../../../util/context/pomodoroContext"
import DividerComponent from "../../../divider"
import { AnimatePresence, motion } from "framer-motion"
import { SettingsFieldState } from "../../../../util/interfaces"
import { subscribersSettingsFields } from "../../../../util/enums/subscribersName"

export const Pomodoro = () => {

	const dispatch = useDispatch()
	const {
		setPomodoroTimerState,
		pomodoroTimerReset,
		pomodoroTimerTick,
		pomodoroTimerResetAll,
		pomodoroTimerComplete,
		setPomodoroStateDefaultDuration,
		addPomodoroAdderTime,
		removePomodoroAdderTime,
		setPomodoroMaxShortBreaks,
	} = bindActionCreators(creators, dispatch)
	const pomodoroState: PomodoroState = useSelector((state: any) => state.pomodoro)
	const pomodoroContext = useContext(PomodoroContext)

	const [timerMinutes, setTimerMinutes] = useState<string>("00")
	const [timerSeconds, setTimerSeconds] = useState<string>("00")

	const onStart = () => {
		if (pomodoroState.timerState === pomodoroTimerStates.STOP || pomodoroState.timerState === pomodoroTimerStates.PAUSE) {
			setPomodoroTimerState(pomodoroTimerStates.START)
			updateTimer()
		} else {
			setPomodoroTimerState(pomodoroTimerStates.PAUSE)
		}
	}

	const onReset = () => {
		setPomodoroTimerState(pomodoroTimerStates.STOP)
		pomodoroTimerReset()
	}

	const updateTimer = () => {

		const _pomodoroState = store.getState().pomodoro

		pomodoroTimerTick()

		if (_pomodoroState[_pomodoroState.state] === 0) {
			pomodoroTimerComplete()
		}
	}

	const updateTimerDisplay = () => {

		const _pomodoroState = store.getState().pomodoro
		const timer = _pomodoroState[_pomodoroState.state]

		const minutes = Math.floor(timer / 60)
		const seconds = timer % 60

		if (minutes < 10)
			setTimerMinutes("0" + Math.round(minutes).toString())
		else
			setTimerMinutes(Math.round(minutes).toString())

		if (seconds < 10)
			setTimerSeconds("0" + Math.round(seconds).toString())
		else
			setTimerSeconds(Math.round(seconds).toString())
	}

	const statusText = () => {
		const modes = {
			[pomodoroStates.POMODORO]: "Pomodoro",
			[pomodoroStates.SHORT_BREAK]: "Short Break",
			[pomodoroStates.LONG_BREAK]: "Long Break"
		}

		if (pomodoroState.timerState === pomodoroTimerStates.START) {
			return `${timerMinutes} : ${timerSeconds} - ${modes[pomodoroState.state]}`
		} else if (pomodoroState.timerState === pomodoroTimerStates.PAUSE) {
			return `${timerMinutes} : ${timerSeconds} - ${pomodoroState.state} - PAUSED`
		} else {
			return ""
		}
	}

	useEffect(() => {
		if (pomodoroState.timerState !== pomodoroTimerStates.START) return

		const interval = setInterval(() => {
			updateTimer()
		}, 1000)

		return () => clearInterval(interval)
	}, [pomodoroState.timerState])

	useEffect(() => {
		setPomodoroStateDefaultDuration({
			type: pomodoroStates.POMODORO,
			value: pomodoroContext.ctx.pomodoroDefault
		})

		setPomodoroStateDefaultDuration({
			type: pomodoroStates.SHORT_BREAK,
			value: pomodoroContext.ctx.shortBreakDefault
		})

		setPomodoroStateDefaultDuration({
			type: pomodoroStates.LONG_BREAK,
			value: pomodoroContext.ctx.longBreakDefault
		})

		setPomodoroMaxShortBreaks(pomodoroContext.ctx.pomodoroMaxShortBreaks)

		pomodoroContext.ctx.timerAdder.forEach((time: pomodoroAdderTime) => {
			addPomodoroAdderTime(time)
		})

		pomodoroTimerResetAll()

		return () => {
			pomodoroContext.ctx.timerAdder.forEach((time: pomodoroAdderTime) => {
				removePomodoroAdderTime(time.id)
			})
		}
	}, [])

	useEffect(() => {
		updateTimerDisplay()
	}, [pomodoroState.state, pomodoroState.timerState, pomodoroState[pomodoroState.state]])

	return (
		<Widget
			title="Timer"
			statusText={statusText()}
			minWidth={370}
			defaultPosition={{ x: 70, y: 40 }}
			settings={<TimerSettings />}
		>
			<div className="flex flex-col gap-[3px] px-5 py-4">
				<ModeSwitcher />
				<Timer
					timerMinutes={timerMinutes}
					timerSeconds={timerSeconds}
					timerState={pomodoroState.timerState}
					onStart={onStart}
					onReset={onReset}
				/>
				{/* <TimerAdder /> */}
				<ShortBreakIndicator
					shortBreaks={pomodoroState.shortBreaks}
					maxShortBreaks={pomodoroState.maxShortBreaks}
				/>
			</div>
		</Widget>
	)
}

export const TimerSettings: FC = () => {
	return (
		<div>
			<DividerComponent />
			<div className="flex flex-col gap-[3px] px-5 py-4">
				<div className="flex items-center">
					<h1 className="text-md text-sv-black dark:text-sv-white">
						Settings
					</h1>
				</div>
			</div>
		</div>
	)
}

export const TimerSettingsLayout: FC<PropsWithChildren> = (props) => {

	const { children } = props

	const settingsFieldState: SettingsFieldState | undefined = useSelector((state: any) => {
		const settingsField = state.settings.settingsFields as SettingsFieldState[]
		return settingsField.find((field) => field.name === subscribersSettingsFields.widgets.fancyMinimizer.name)
	})

	if (settingsFieldState?.value) {
		return (
			<motion.div
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: "auto" }}
				exit={{ opacity: 0, height: 0 }}
			>
				{children}
			</motion.div>
		)
	}

	return (
		<div>
			{children}
		</div>
	)
}

export const Timer: FC<TimerProps> = (props) => {

	const { timerMinutes, timerSeconds, timerState, onStart, onReset } = props

	return (
		<div className="flex justify-between py-2 pb-0">
			<div className="flex-1 inline-flex items-center">
				<h1 className="text-6xl text-sv-black dark:text-sv-white">
					{timerMinutes}
				</h1>
				<h1 className="text-4xl text-sv-black dark:text-sv-white pb-2">
					:
				</h1>
				<h1 className="text-6xl text-sv-black dark:text-sv-white">
					{timerSeconds}
				</h1>
			</div>
			<div className="flex gap-3 items-center">
				<StartButton
					state={timerState}
					onClick={onStart}
				/>
				<ResetButton onClick={onReset} />
			</div>
		</div>
	)
}

export const ModeSwitcher = () => {

	const dispatch = useDispatch()
	const {
		setPomodoroState
	} = bindActionCreators(creators, dispatch)
	const pomodoroState: PomodoroState = useSelector((state: any) => state.pomodoro)

	const states = () => {
		return [
			{
				label: "Pomodoro",
				state: pomodoroStates.POMODORO,
				onClick: () => setPomodoroState(pomodoroStates.POMODORO)
			},
			{
				label: "Short Break",
				state: pomodoroStates.SHORT_BREAK,
				onClick: () => setPomodoroState(pomodoroStates.SHORT_BREAK)
			},
			{
				label: "Long Break",
				state: pomodoroStates.LONG_BREAK,
				onClick: () => setPomodoroState(pomodoroStates.LONG_BREAK)
			}
		]
	}

	return (
		<div className="flex gap-2">
			<div className="relative flex-1 flex gap-1 items-center justify-between ring-1 dark:ring-sv-light35 ring-sv-dark35 corners p-[3px]">
				{
					states().map((state, index) => {
						return (
							<ModeSwitcherItem
								key={index}
								label={state.label}
								active={pomodoroState.state === state.state}
								onClick={state.onClick}
							/>
						)
					})
				}
			</div>
		</div>
	)
}

export const ModeSwitcherItem: FC<ModeSwitcherItemProps> = (props) => {

	const { onClick, active, label } = props

	const isActive = active ? "bg-teal-500 dark:bg-teal-700 hover:bg-teal-600 dark:hover:bg-teal-800" : "bg-transparent hover:dark:bg-sv-light10 hover:bg-sv-dark10"
	// "bg-transparent hover:dark:bg-sv-light10 hover:bg-sv-dark10"

	return (
		<button
			className={`flex-1 py-[2px] z-[20] ${isActive} corners transition-colors`}
			onClick={onClick}
		>
			<h1 className="text-sv-black dark:text-sv-white text-sm">
				{label}
			</h1>
		</button>
	)
}

export const TimerAdder = () => {

	const dispatch = useDispatch()
	const {
		pomodoroAddToTimer
	} = bindActionCreators(creators, dispatch)
	const pomodoroState: PomodoroState = useSelector((state: any) => state.pomodoro)

	const addTime = (adderTimer: pomodoroAdderTime) => {
		pomodoroAddToTimer(adderTimer)
	}

	return (
		<div className="flex gap-2">
			<div className="relative flex-1 flex gap-2 items-center justify-between">
				{
					pomodoroState.adderTimes.map((modeLabel, index) => {
						return (
							<TimerAdderItem
								key={index}
								onClick={() => addTime(modeLabel)}
								label={modeLabel.label}
								value={modeLabel.value}
							/>
						)
					})
				}
			</div>
		</div>
	)
}

export const TimerAdderItem: FC<TimerAdderItemProps> = (props) => {

	const { onClick, label, value } = props

	return (
		<button onClick={onClick} className="flex-1 p-[2px] z-[20] hover:dark:bg-sv-light10 hover:bg-sv-dark10 active:dark:opacity-50 active:opacity-50 ring-1 dark:ring-sv-light35 ring-sv-dark35 corners transition-all">
			<h1 className="text-sv-black dark:text-sv-white text-sm">
				{label}
			</h1>
		</button>
	)
}

export const ShortBreakIndicator: FC<ShortBreakIndicatorProps> = (props) => {

	const { shortBreaks, maxShortBreaks } = props

	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center justify-center pb-1">
				<h1 className="text-sv-black dark:text-sv-white text-sm opacity-50">
					Short Breaks:
				</h1>
			</div>
			{
				Array.from(Array(maxShortBreaks).keys()).map((index) => {
					if (shortBreaks === 0) (
						<ShortBreakIndicatorItem
							key={index}
							active={false}
						/>
					)

					if (shortBreaks > index) {
						return (
							<ShortBreakIndicatorItem
								key={index}
								active={true}
							/>
						)
					} else {
						return (
							<ShortBreakIndicatorItem
								key={index}
								active={false}
							/>
						)
					}
				})
			}
		</div>
	)
}

export const ShortBreakIndicatorItem: FC<ShortBreakIndicatorItemProps> = (props) => {

	const { active } = props

	return (
		<div className={`flex-1 h-[10px] rounded-full transition-colors duration-500 ${active ? "bg-teal-500 dark:bg-teal-700" : "bg-sv-dark35 dark:bg-sv-light35"}`}></div>
	)
}

export const StartButton: FC<TimerControlsOnStartProps> = (props) => {

	const { onClick, state } = props

	// const isRunningClass = isRunning ? "bg-red-500 dark:bg-red-700 hover:dark:bg-red-600 hover:bg-red-600" : "bg-transparent hover:dark:bg-sv-light10 hover:bg-sv-dark10"
	const stateClass = state === pomodoroTimerStates.STOP ? "bg-transparent hover:dark:bg-sv-light10 hover:bg-sv-dark10 " :
		state === pomodoroTimerStates.START ? "bg-green-500 dark:bg-green-700 hover:dark:bg-green-600 hover:bg-green-600" :
			"bg-gray-500 dark:bg-gray-700 hover:dark:bg-gray-600 hover:bg-gray-600"
	return (
		<button onClick={onClick} className={`${stateClass} w-20 text-sv-black dark:text-sv-white h-[40px] flex justify-center items-center ring-1 dark:ring-sv-light35 ring-sv-dark35 gap-1 corners flex-1 active:dark:opacity-50 active:opacity-50 transition-all`}>
			<h1 className="text-sv-black dark:text-sv-white">
				{state === pomodoroTimerStates.STOP ? "Start" : state === pomodoroTimerStates.START ? "Pause" : "Resume"}
			</h1>
		</button>
	)
}

export const ResetButton: FC<TimerControlsProps> = (props) => {

	const { onClick } = props

	return (
		<button onClick={onClick} className="px-3 h-[40px] w-[40px] flex justify-center items-center gap-1 ring-1 dark:ring-sv-light35 ring-sv-dark35 corners hover:dark:bg-sv-light10 hover:bg-sv-dark10 active:dark:opacity-50 active:opacity-50 transition-all">
			<VscDebugRestart className="text-sv-black dark:text-sv-white " />
		</button>
	)
}



export default Pomodoro