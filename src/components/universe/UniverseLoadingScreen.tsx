import React, { useState, useEffect, FC } from 'react'
import { UniverseProps } from './universeProps'

const UniverseLoadingScreen : FC<UniverseProps> = (props) => {

	const { isLoading } = props

	if (!isLoading) return null

	return (
		<div className='absolute left-0 right-0 top-0 bottom-0 z-10 flex justify-center items-center flex-col bg-sv-white'>
			<h1 className='text-4xl font-bold'>Your Universe</h1>
			<IsLoadingAnimation />
		</div>
	)
}

const IsLoadingAnimation = () => {

	const [frame, setFrame] = useState(0)
	const animation = ['.', '..', '...']

	const animate = () => {
		setFrame(frame => frame >= animation.length - 1 ? 0 : frame + 1)
	}

	useEffect(() => {
		const inter = setInterval(() => {
			animate()
		}, 500)

		return () => clearInterval(inter)
	})

	return (
		<h1 className='text-lg'>is loading{animation[frame]}</h1>
	)
}

export default UniverseLoadingScreen