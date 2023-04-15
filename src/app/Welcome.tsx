import { AnimatePresence, motion } from "framer-motion"
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { UniverseComponent } from "./components/universe"
import { UniverseType } from "./components/universe/universeProps"
import { UniverseState } from "./util/interfaces"
import { useNavigate } from "react-router"
import { getSpecificRoute } from "../routes"
import { db } from "./firebase/"
import { doc, setDoc } from "firebase/firestore"
import { generateId } from "./util/idGenerators"

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
				navigate(getSpecificRoute("home")?.path!)
			}, 1000)
		}
	}

	const layers = [ZeroPage, FirstPage, SecondPage, ThirdPage]

	const getLayer = () => {
		const Layer = layers[currentLayer] as FC<PageProps>
		return Layer ? <Layer key={`welcomeLayer-${currentLayer}`} onNext={onNext} /> : null
	}

	useEffect(() => {

		// if user is already in the database, then go to home
		const isFinishSurvey = localStorage.getItem('finishedSurvey') === 'true'
		if (isFinishSurvey) {
			navigate(getSpecificRoute('home')?.path!)
		}

		const timer = setTimeout(() => {
			if (currentLayer === 0) {
				setCurrentLayer(1)
			}
		}, 5000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<div className="absolute inset-0 w-screen bg-sv-dark opacity-90 z-50" />
			<UniverseComponent universe={welcomeBackground} />
			<div className="pointer-events-auto overflow-y-auto absolute inset-0 w-screen flex justify-center z-50">
				<AnimatePresence mode="wait">
					{getLayer()}
				</AnimatePresence>
			</div>
		</>
	)
}

export default Welcome

export interface PageProps {
	onNext: () => void
}

export const ZeroPage: FC<PageProps> = (props) => {

	const { onNext } = props

	return (
		<AnimationLayer>
			<div className="h-full flex justify-center items-center">
				<h1 className="flex flex-col lg:flex-row justify-center items-center gap-5 text-sv-light">
					<span className="text-1xl tracking-wide">loading...</span>
				</h1>
			</div>
		</AnimationLayer>
		)
}

export const FirstPage: FC<PageProps> = (props) => {

	const { onNext } = props

	return (
		<AnimationLayer>
			<div className="pb-36 h-[calc(100%-200px)] flex justify-center items-center">
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

	const [isChanged, setIsChanged] = useState(false)

	const [name, setName] = useState("")
	const [age, setAge] = useState("0-10")
	const [reason, setReason] = useState("")
	const [email, setEmail] = useState("")
	const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false)

	useEffect(() => {
		setIsChanged(false)

		if (name && age && reason) {
			setIsChanged(true)
		}
	}, [name, age, reason])

	const onSubmit = async () => {
		const docId = generateId("z.survey.1")

		await setDoc(doc(db, "z.survey.1", docId), {
			name,
			age,
			reason,
			email,
			subscribeToNewsletter
		})

		localStorage.setItem("finishedSurvey", "true")
		onNext()
	}

	return (
		<AnimationLayer>
			<div className="flex-1 px-4 w-full max-w-[600px] min-h-[calc(100%-200px)] py-16">
				<div className="flex flex-col justify-center">
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
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label className="text-sv-light">
									What is your age?
									<span className="text-sv-pomodoro-red">*</span>
								</label>
								<select
									className="px-4 py-3 rounded-md shadow-lg bg-sv-light pointer-events-auto"
									name="age"
									id="age"
									value={age}
									onChange={(e) => setAge(e.target.value)}
								>
									<option value="0-10">0-10</option>
									<option value="11-20">11-20</option>
									<option value="21-27">21-27</option>
									<option value="28-35">28 and above</option>
								</select>
							</div>
							<div className="flex flex-col gap-1">
								<label className="text-sv-light">
									Reason(s) for using Spaceverse?
									<span className="text-sv-pomodoro-red">*</span>
								</label>
								<textarea
									rows={3}
									className="px-4 py-3 min-h-[100px] max-h-[200px] rounded-md shadow-lg bg-sv-light pointer-events-auto"
									placeholder="Reason"
									value={reason}
									onChange={(e) => setReason(e.target.value)}
								/>
							</div>
							<div className="flex flex-col gap-1 pt-2">
								<label className="text-sv-light">What is your email?</label>
								<input
									className="px-4 py-3 rounded-md shadow-lg bg-sv-light pointer-events-auto"
									placeholder="Email (optional)"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="flex flex-row items-center gap-2 pb-4">
								{/* check if subscribe to newsletter */}
								<input 
								type="checkbox" 
								name="wantNewsLetter" 
								id="wantNewsLetter"
								className="appearance-none-none w-4 h-4 corners shadow-lg bg-sv-light pointer-events-auto"
								checked={subscribeToNewsletter}
								onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
								 />
								<label className="text-sv-light" htmlFor="wantNewsLetter">
									Subscribe to our newsletter
								</label>								
							</div>
							<div className="flex flex-col gap-1 py-2 text-sm">
								<span className="text-sv-light">
									by clicking next, you agree to our <a href="/terms" className="text-sv-accent">Terms of Service</a> and <a href="/policy" className="text-sv-accent">Privacy Policy</a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AnimatePresence>
				{
					isChanged && (
						<WelcomeControls onNext={onSubmit} />
					)
				}
			</AnimatePresence>
		</AnimationLayer>
	)
}

export const ThirdPage: FC<PageProps> = (props) => {

	const { onNext } = props

	useEffect(() => {
		const timer = setTimeout(() => {
			onNext()
		}, 3000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<AnimationLayer>
			<div className="pb-36 h-[calc(100%-200px)] px-4 flex flex-col gap-8 justify-center items-center">
				<h1 className="text-8xl">
					✔️
				</h1>
				<h1 className="flex flex-col lg:flex-row justify-center items-center gap-5 text-sv-light">
					<span className="text-3xl tracking-wide font-semibold text-center">Thank you for your time!</span>
				</h1>
				<p className="text-sv-light text-center">
					Redirecting you to the App...
				</p>

				<p className="text-sv-light text-center">
					if you are not redirected, click <a href={getSpecificRoute("home")?.path} className="text-sv-accent">here</a>
				</p>
			</div>
		</AnimationLayer>
	)
}

interface WelcomeControlsProps {
	onNext: () => void
}

export const WelcomeControls: FC<WelcomeControlsProps> = (props) => {

	const { onNext } = props

	return (
		<motion.div
			className="px-4 h-[200px] flex justify-center items-center"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: .1, ease: "easeInOut" }}
		>
			<button onClick={onNext} className="pointer-events-auto flex items-center gap-2 px-5 py-2 bg-sv-accent rounded-md shadow-lg font-semibold">
				Next
			</button>
		</motion.div>
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
			transition={{ duration: .5, ease: "easeIn" }}
			layout
		>
			{children}
		</motion.div>
	)
}