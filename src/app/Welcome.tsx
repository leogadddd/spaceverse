import { AnimatePresence, motion } from "framer-motion"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { MdDomainVerification } from "react-icons/md"
import { useSelector } from "react-redux"
import { UniverseComponent } from "./components/universe"
import { UniverseType } from "./components/universe/universeProps"
import { UniverseState } from "./util/interfaces"
import { useNavigate } from "react-router"

export const Welcome = () => {

	const universeState: UniverseState = useSelector((state: any) => state.universe)
	const navigate = useNavigate()

	const welcomeBackground: UniverseType = {
		name: "Welcome to the Universe",
		link: "https://www.youtube.com/watch?v=_0kPcVW2gm4",
		value: "_0kPcVW2gm4",
		id: "_0kPcVW2gm4",
	}


	const [currentLayer, setCurrentLayer] = useState(0)

	const onNext = () => {
		setCurrentLayer(currentLayer + 1)

		// if last layer, then go to home
		if (currentLayer === layers.length - 1) {
			setTimeout(() => {
				navigate("/")
			}, 2000)
		}
	}

	const layers = [null, FirstPage, SecondPage]

	const getLayer = () => {
		const Layer = layers[currentLayer] as FC<PageProps>
		return Layer ? <Layer onNext={onNext} /> : null
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			if (currentLayer === 0) {
				setCurrentLayer(1)
			}
		}, 5000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<div className="absolute inset-0 h-screen w-screen bg-sv-dark opacity-90 z-50" />
			<UniverseComponent universe={welcomeBackground} />
			<div className="pointer-events-auto overflow-y-auto absolute inset-0 h-screen w-screen flex flex-col justify-center items-center z-50">
				<AnimatePresence mode="wait">
					{getLayer()}
				</AnimatePresence>
			</div>
		</>
	)
}

export interface PageProps {
	onNext: () => void
}

export const FirstPage: FC<PageProps> = (props) => {

	const { onNext } = props

	return (
		<AnimationLayer>
			<div className="pb-36">
				<h1 className="flex flex-col lg:flex-row justify-center items-center gap-5 text-sv-light">
					<span className="text-3xl tracking-wide">WELCOME TO</span><span className="text-6xl font-koulen tracking-wider">SPACEVERSE</span>
				</h1>
			</div>
			<WelcomeControls onNext={onNext} />
		</AnimationLayer>
	)
}

export const SecondPage: FC<PageProps> = (props) => {

	const { onNext } = props

	return (
		<AnimationLayer>
			<div className="flex-1 px-4 w-full max-w-[600px] py-16">
				<h1 className="text-2xl text-sv-light font-semibold">
					Please answer the following questions to help us get to know you better.
				</h1>
				<div>
					<div className="flex flex-col gap-3 mt-5">
						<div className="flex flex-col gap-1">
							<label className="text-sv-light">
								What is your name?
								<span className="text-sv-pomodoro-red">*</span>
							</label>
							<input
								className="px-4 py-3 rounded-md shadow-lg bg-sv-light pointer-events-auto"
								placeholder="Last, First"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-sv-light">
								What is your age?
								<span className="text-sv-pomodoro-red">*</span>
							</label>
							<input
								className="px-4 py-3 rounded-md shadow-lg bg-sv-light pointer-events-auto"
								placeholder="Age"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-sv-light">
								Reason for using Spaceverse?
								<span className="text-sv-pomodoro-red">*</span>
							</label>
							<textarea
								rows={3}
								className="px-4 py-3 min-h-[100px] max-h-[200px] rounded-md shadow-lg bg-sv-light pointer-events-auto"
								placeholder="Reason"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<label className="text-sv-light">What is your email?</label>
							<input
								className="px-4 py-3 rounded-md shadow-lg bg-sv-light pointer-events-auto"
								placeholder="Email (optional)"
							/>
						</div>
					</div>
				</div>
			</div>
			<WelcomeControls onNext={onNext} />
		</AnimationLayer>
	)
}

interface WelcomeControlsProps {
	onNext: () => void
}

export const WelcomeControls: FC<WelcomeControlsProps> = (props) => {

	const { onNext } = props

	return (
		<div className="px-4 h-[200px] flex justify-center items-center">
			<button onClick={onNext} className="pointer-events-auto flex items-center gap-2 px-5 py-2 bg-sv-light rounded-md shadow-lg">
				Next
			</button>
		</div>
	)
}

export interface AnimationLayerProps {
	children: React.ReactNode
	onNext?: () => void
}

export const AnimationLayer: FC<AnimationLayerProps> = (props) => {

	const { children } = props

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1, ease: "easeIn" }}
		>
			{children}
		</motion.div>
	)
}