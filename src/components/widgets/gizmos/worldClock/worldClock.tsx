import React, { useState, useEffect } from "react"
import Widget from "../../widgetContainer"

export const WorldClock = () => {

	const [time, setTime] = useState(currentTime())

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(currentTime())
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<Widget title="Clock" minWidth={200} defaultPosition={{ x: 10, y: 20}}>
			<div className='pt-4 pb-4 flex flex-row justify-center items-center'>
				<span className='text-4xl  text-sv-black dark:text-sv-white flex flex-row items-center'>
					<span>{time.hours}</span>
					<span className='text-2xl mx-1'>:</span>
					<span>{time.minutes}</span>
					<span className='text-sm ml-2 font-normal opacity-50'>{time.ampm}</span>
				</span>
			</div>
		</Widget>
	)
}

const currentTime = () => {
	const date = new Date()
	const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours() - 12
	const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
	const ampm = date.getHours() >= 12 ? 'PM' : 'AM'

	return { hours, minutes, ampm }
}

export default WorldClock