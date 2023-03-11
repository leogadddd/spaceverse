import React, { useState, useEffect, FC } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { universeLoadingContainerVariants } from '../../util/constant'
import { UniverseState } from '../../util/interfaces/state/universeState'
import { useSelector } from 'react-redux'
import { UniverseLoadingProps } from './universeProps'

const UniverseLoadingScreen: FC<UniverseLoadingProps> = (props) => {

	const { isByPass } = props

	const universeState: UniverseState = useSelector((state: any) => state.universe)

	const [isUniverseLoading, _setIsUniverseLoading] = useState(universeState.isLoading)

	useEffect(() => {
		_setIsUniverseLoading(universeState.isLoading)

	}, [universeState.isLoading])

	return (
		<AnimatePresence mode="wait">
			{
				isUniverseLoading &&
				<m.div
					// id="universe-loading-screen"
					key="universe-loading-screen"
					variants={universeLoadingContainerVariants}
					initial="animate"
					animate={isUniverseLoading ? "animate" : "initial"}
					exit="initial"
					className={`flex justify-center items-center flex-col absolute left-0 right-0 top-0 bottom-0 z-0 ${isByPass ? "bg-sv-black" : "dark:bg-sv-white bg-sv-dark"}`}
				>
					<m.div
						variants={universeLoadingContainerVariants}
						initial="initial"
						animate={isUniverseLoading ? "animate" : "initial"}
						exit="initial"
						className="flex justify-center items-center flex-col"
					>
						{
							!isByPass && <>
								<h1 className="text-4xl font-bold text-sv-white dark:text-sv-black">
									Your Universe
								</h1>
								<IsLoadingAnimation />
							</>
						}

					</m.div>

				</m.div>
			}
		</AnimatePresence>
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
		<h1 className='text-lg text-sv-white dark:text-sv-black'>is loading{animation[frame]}</h1>
	)
}

export default UniverseLoadingScreen