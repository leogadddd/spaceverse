import { AnimatePresence, motion } from "framer-motion"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { MdDomainVerification } from "react-icons/md"
import { useSelector } from "react-redux"
import { UniverseComponent } from "./components/universe"
import { UniverseType } from "./components/universe/universeProps"
import { UniverseState } from "./util/interfaces"

export const Welcome = () => {

	const universeState: UniverseState = useSelector((state: any) => state.universe)

	const welcomeBackground: UniverseType = {
		name: "Welcome to the Universe",
		link: "https://www.youtube.com/watch?v=_0kPcVW2gm4",
		value: "_0kPcVW2gm4",
		id: "_0kPcVW2gm4",
	}

	const layers = [null, <FirstPage />, <SecondPage />]

	const [currentLayer, setCurrentLayer] = useState(0)

	const getLayer = () => {
		return layers[currentLayer]
	}

	useEffect(() => {
		if (universeState.isLoading) return
		setCurrentLayer(1)
	}, [universeState.isLoading])

	return (
		<>
			<div className="absolute inset-0 h-screen w-screen bg-sv-dark opacity-90 z-50" />
			<UniverseComponent universe={welcomeBackground} />
			<div className="overflow-hidden absolute inset-0 h-screen w-screen flex flex-col justify-center items-center z-50">
				<AnimatePresence mode="wait">
					{getLayer()}
				</AnimatePresence>
			</div>
			<div>

			</div>
		</>
	)
}

export const FirstPage = () => {

	const onNext = () => {
		console.log("Next")
	}

	return (
		<AnimationLayer>
			<h1 className="flex flex-col  items-center gap-5 text-sv-light">
				<span className="text-3xl tracking-wide">WELCOME TO</span><span className="text-6xl font-koulen tracking-wider">SPACEVERSE</span>
			</h1>
			<WelcomeControls onNext={onNext} />
		</AnimationLayer>
	)
}

export const SecondPage = () => {

	return (
		<AnimationLayer>
			<h1 className="flex items-center gap-5 text-sv-light">

			</h1>
		</AnimationLayer>
	)
}

interface WelcomeControlsProps {
	onNext: () => void
}

export const WelcomeControls: FC<WelcomeControlsProps> = (props) => {

	const { onNext } = props

	return (
		<div className="absolute inset-0">
			<div className="absolute left-1/2 -translate-x-1/2 bottom-[20%] flex flex-col gap-5">
				<button onClick={onNext} className="flex items-center gap-2 px-5 py-2 bg-sv-light rounded-md shadow-lg">
					Next
				</button>
			</div>
		</div>
	)
}

export const AnimationLayer: FC<PropsWithChildren> = (props) => {

	const { children } = props

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 2, ease: "easeIn" }}
		>
			{children}
		</motion.div>
	)
}