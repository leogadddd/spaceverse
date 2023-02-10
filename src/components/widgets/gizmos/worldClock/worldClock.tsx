import { bindActionCreators } from "@reduxjs/toolkit"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { creators } from "../../../../lib"
import { settingsFieldType } from "../../../../util/enums"
import { subscribersSettingsFields } from "../../../../util/enums/subscribersName"
import { SettingsFieldState } from "../../../../util/interfaces"
import Widget from "../../widgetContainer"

export const WorldClock = () => {

	const dispatch = useDispatch()
	const {
		subscribeSettingsField,
		unsubscribeSettingsField,
	} = bindActionCreators(creators, dispatch)
	const settingsFieldState: SettingsFieldState | undefined = useSelector((state: any) => {
		const settingsField = state.settings.settingsFields as SettingsFieldState[]
		return settingsField.find((field) => field.name === subscribersSettingsFields.features.worldClock.is24Hour.name)
	})

	const [time, setTime] = useState<{ hours: string | number, hours24: number, minutes: any, ampm: string }>(currentTime())
	const [is24Hour, setIs24Hour] = useState<boolean>(settingsFieldState?.value as boolean)

	const updateClock = () => {

		let time = currentTime()

		setTime({
			hours: time.hours,
			hours24: time.hours24,
			minutes: time.minutes,
			ampm: time.ampm
		})
	}

	useEffect(() => {
		subscribeSettingsField({
			...subscribersSettingsFields.features.worldClock.is24Hour,
			value: false,
			type: settingsFieldType.TOGGLE,
			section: "Clock",
			tooltip: "are you in the military?"
		})

		return () => { unsubscribeSettingsField(subscribersSettingsFields.features.worldClock.is24Hour.name) }
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			updateClock()
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		setIs24Hour(settingsFieldState?.value as boolean)
	}, [settingsFieldState?.value])

	return (
		<Widget
			title="Clock"
			minWidth={200}
			statusText={`${time?.hours}:${time?.minutes} ${time?.ampm}`}
			defaultPosition={{ x: 10, y: 20 }}
		>
			<div className='pt-4 pb-4 flex flex-row justify-center items-center'>
				<span className='text-5xl  text-sv-black dark:text-sv-white flex flex-row items-center'>
					{
						is24Hour ? time?.hours24 : time?.hours
					}
					<span className='text-3xl mx-1'>:</span>
					<span className="text-5xl">{time?.minutes}</span>
					<span className='text-lg ml-2 font-normal opacity-50'>{time?.ampm}</span>
				</span>
			</div>
		</Widget>
	)
}

const currentTime = () => {
	const date = new Date()
	const hours = date.getHours() % 12 || 12
	const hours24 = date.getHours()
	const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
	const ampm = date.getHours() >= 12 ? 'PM' : 'AM'

	return { hours, hours24, minutes, ampm }
}

export default WorldClock