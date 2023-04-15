import { useState } from "react"
import { createPortal } from "react-dom"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useNavigate } from "react-router"
import DividerComponent from "../app/components/divider"
import { Footer } from "./components/footer"
import { WidthLayout } from "./components/layouts/widthLayout"
import { Navigation } from "./components/navigation"
import Spinner from "./spinner"
import useAuthenticator from "./util/hooks/useAuthenticator"

export const SignIn = () => {

	const { authenticate, isAuthenticating, error } = useAuthenticator()

	const naigate = useNavigate()

	const [showPassword, setShowPassword] = useState(false)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	const Login = () => {
		console.log("logging in")

		if((
			password === "" || email === ""
		)) {
			console.log("error")
			return false
		}

		authenticate(email, password, () => {
			console.log("logged in")
			naigate("/")
		})
	}

	return createPortal(
		<div className="overflow-hidden">
			<Navigation />
			<div className="bg-spweb-darkup">
				<WidthLayout>
					<div className="flex flex-col items-center">
						<div className="min-h-[calc(100vh-60px)] max-w-[1000px] w-full flex flex-col gap-6 justify-start items-center px-8 py-16">
							<div className="flex flex-col gap-4 w-full max-w-[400px]">
								<h1 className="text-4xl text-center font-semibold text-sv-white tracking-wider">
									Log In
								</h1>
								<DividerComponent />
							</div>
							{/* ERROR DIV */}
							{
								error && (
									<div className="flex flex-col gap-4 w-full max-w-[400px]">
										<div className="flex flex-col justify-center items-center gap-2 py-4 px-4 bg-sv-error-dark shadow-lg corners">
											{/* <div className="flex flex-row justify-center items-center gap-1">
										<HiInformationCircle className="text-sv-pomodoro-red" />
									</div> */}
											<p className="text-sv-error-black text-center px-4 inline-block">
												{error}
											</p>
										</div>
									</div>
								)
							}
							<div className="flex flex-col gap-4 w-full max-w-[400px]">
								<div className="flex flex-col gap-1 pb-4">
									<label className="text-sv-white">
										Email
										<span className="text-sv-pomodoro-red">*</span>
									</label>
									<div className="flex flex-row rounded-md shadow-lg bg-sv-input-dark pointer-events-auto overflow-hidden brightness-90 hover:brightness-110 transition-all">
										<input
											type="email"
											className="flex-1 px-4 py-3 bg-sv-input-dark pointer-events-auto text-sv-white"
											placeholder={"johndoe@email.com"}
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											tabIndex={1}
										/>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<label className="text-sv-white">
										Password
										{/* <span className="text-sv-pomodoro-red">*</span> */}
									</label>
									<div className="flex flex-row rounded-md shadow-lg bg-sv-input-dark pointer-events-auto overflow-hidden brightness-90 hover:brightness-110 transition-all">
										<input
											type={showPassword ? "text" : "password"}
											className="bg-sv-input-dark text-sv-white flex-1 pl-4 py-3"
											placeholder="********"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											tabIndex={2}
										/>
										<button
											onClick={togglePassword}
											className="p-2 px-4 bg-sv-input-dark"
										>
											{
												showPassword ? <FiEyeOff className="text-sv-ring-dark" /> : <FiEye className="text-sv-ring-dark" />
											}
										</button>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-6 w-full pt-4 max-w-[400px]">
								<div className="flex flex-col gap-1">
									<DividerComponent />
									{/* <p className="text-sv-white text-left text-xs opacity-50">
										We will send you an email with a link to complete your registration.
									</p> */}
								</div>
								<div className="flex flex-col gap-1 pt-8">
									{/* <div>
										<p className="text-sv-white text-left text-xs">
											by clicking submit, you agree to our <a href="/terms" className="text-sv-accent hover:underline">Terms of Service</a> and <a href="/policy" className="text-sv-accent hover:underline">Privacy Policy</a>
										</p>
									</div> */}
									<div className="flex flex-col-reverse lg:flex-row gap-3">
										<a
											href="/register"
											tabIndex={4}
											className="w-full py-3 flex justify-center items-center rounded-md shadow-lg bg-sv-white text-sv-black font-semibold brightness-90 hover:brightness-110 transition-all"
										>
											Sign Up
										</a>
										<div className="flex flex-col justify-center opacity-50">
											<p className="text-sv-white text-center lg:text-left">
												or
											</p>
										</div>
										<button
											tabIndex={5}
											disabled={(
												password === "" || email === ""
											)}
											onClick={Login}
											className="w-full py-3 rounded-md shadow-lg bg-sv-accent text-sv-black font-semibold brightness-90 disabled:brightness-50 hover:brightness-110 transition-all"
										>
											{
												isAuthenticating ? <Spinner theme={1} /> : "Sign In"
											}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</WidthLayout>
			</div>
			<Footer />
		</div>
		, document.getElementById("site") as HTMLElement)
}

export default SignIn