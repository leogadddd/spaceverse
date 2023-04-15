import { FC, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import DividerComponent from "../app/components/divider"
import { Footer } from "./components/footer"
import { WidthLayout } from "./components/layouts/widthLayout"
import { Navigation } from "./components/navigation"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { HiInformationCircle } from "react-icons/hi"
import useAuthenticator from "./util/hooks/useAuthenticator"
import { useNavigate } from "react-router"
import Spinner from "./spinner"

export const SignUp = () => {

	const { register, isRegistering, error } = useAuthenticator()

	const navigate = useNavigate()

	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const [email, setEmail] = useState("")
	const [emailError, setEmailError] = useState(0)
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")


	const [passwordErrors, setPasswordErrors] = useState({
		uppercase: false,
		lowercase: false,
		number: false,
		special: false,
		_length: false
	})
	const passwordErrorCount = Object.values(passwordErrors).filter((value) => value === false).length

	const [confirmPasswordError, setConfirmPasswordError] = useState(0)

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	const toggleConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword)
	}

	const checkEmail = (email: string) => {
		const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
		return emailRegex.test(email)
	}

	const checkPassword = (password: string) => {
		setPasswordErrors({
			uppercase: /[A-Z]/.test(password),
			lowercase: /[a-z]/.test(password),
			number: /[0-9]/.test(password),
			special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
			_length: password.length >= 8
		})
	}

	const signUp = () => {
		console.log("Signing up...")

		if (
			emailError === 2 || emailError === 0 ||
			passwordErrorCount > 0 ||
			confirmPasswordError === 2 ||
			confirmPasswordError === 0 ||
			password === "" || confirmPassword === ""
		) {
			console.log("Error")
			return false
		}

		register(email, password, () => {
			console.log("Registered")
			navigate("/login")
		})
	}

	useEffect(() => {
		if (password.length === 0 || confirmPassword.length === 0)
			return setConfirmPasswordError(0)

		if (confirmPassword.length > 0) {
			if (confirmPassword === password) {
				setConfirmPasswordError(1)
			} else {
				setConfirmPasswordError(2)
			}
		} else {
			setConfirmPasswordError(0)
		}
	}, [confirmPassword, password])

	useEffect(() => {
		if (password.length > 0) {
			checkPassword(password)
		} else {
			setPasswordErrors({
				uppercase: false,
				lowercase: false,
				number: false,
				special: false,
				_length: false
			})
		}
	}, [password])

	useEffect(() => {
		if (email.length > 0) {
			if (checkEmail(email)) {
				setEmailError(1)
			} else {
				setEmailError(2)
			}
		} else {
			setEmailError(0)
		}
	}, [email])

	return createPortal(
		<div className="overflow-hidden">
			<Navigation />
			<div className="bg-spweb-darkup">
				<WidthLayout>
					<div className="flex flex-col items-center">
						<div className="min-h-[calc(100vh-60px)] max-w-[1000px] w-full flex flex-col gap-6 justify-start items-center px-8 py-16">
							<div className="flex flex-col gap-4 w-full max-w-[400px]">
								<h1 className="text-4xl text-center font-semibold text-sv-white tracking-wider">
									Register
								</h1>
								<DividerComponent />
								{/* <p className="text-sv-white text-center px-4">
								Sign up to get access to Spaceverse. We'll send you an email with a link to
								complete your registration.
							</p> */}
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
									{
										emailError === 2 && (
											<div className="flex flex-row gap-1 items-center">
												<HiInformationCircle className="text-sv-pomodoro-red" />
												<p className="text-sv-pomodoro-red text-xs font-semibold">
													Email is not valid
												</p>
											</div>
										)
									}
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
											placeholder={showPassword ? "Never Gonna Give You Up" : "***** ***** **** *** **"}
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
								<div className="flex flex-col gap-1">
									<label className="text-sv-white">
										Confirm Password
										<span className="text-sv-pomodoro-red">*</span>
									</label>
									<div className="flex flex-row rounded-md shadow-lg bg-sv-input-dark pointer-events-auto overflow-hidden brightness-90 hover:brightness-110 transition-all">
										<input
											type={showConfirmPassword ? "text" : "password"}
											className="bg-sv-input-dark text-sv-white flex-1 pl-4 py-3"
											placeholder={showConfirmPassword ? "Never Gonna Let You Down" : "***** ***** *** *** ****"}
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											tabIndex={3}
										/>
										<button
											onClick={toggleConfirmPassword}
											className="p-2 px-4 bg-sv-input-dark"
										>
											{
												showConfirmPassword ? <FiEyeOff className="text-sv-ring-dark" /> : <FiEye className="text-sv-ring-dark" />
											}
										</button>
									</div>
									{
										confirmPasswordError === 2 && (
											<div className="flex flex-row gap-1 items-center">
												<HiInformationCircle className="text-sv-pomodoro-red" />
												<p className="text-sv-pomodoro-red text-xs font-semibold">
													Passwords do not match
												</p>
											</div>
										)
									}
								</div>
								{
									(
										password !== "" || confirmPassword !== ""
									) && (
										<div className="flex flex-col gap-2">
											<p className={`${passwordErrorCount <= 0 ? "text-sv-pomodoro-green" : "text-sv-pomodoro-red"} text-xs font-semibold`}>
												Password should have:
											</p>
											<ul className="flex flex-col gap-1 pl-8 list-disc">
												<PasswordErrorListItem isFixed={passwordErrors._length} text={"At least 8 characters"} />
												<PasswordErrorListItem isFixed={passwordErrors.uppercase} text={"At least 1 uppercase letter"} />
												<PasswordErrorListItem isFixed={passwordErrors.lowercase} text={"At least 1 lowercase letter"} />
												<PasswordErrorListItem isFixed={passwordErrors.number} text={"At least 1 number"} />
											</ul>
										</div>
									)
								}
								<div className="flex flex-col gap-6 w-full pt-4 max-w-[400px]">
									<div className="flex flex-col gap-1">
										<DividerComponent />
										<p className="text-sv-white text-left text-xs opacity-50">
											We will send you an email with a link to complete your registration.
										</p>
									</div>
									<div className="flex flex-col gap-1 pt-16">
										<div>
											<p className="text-sv-white text-left text-xs">
												by clicking submit, you agree to our <a href="/terms" className="text-sv-accent hover:underline">Terms of Service</a> and <a href="/policy" className="text-sv-accent hover:underline">Privacy Policy</a>
											</p>
										</div>
										<div className="flex flex-col-reverse lg:flex-row gap-3">
											<a
												href="/login"
												tabIndex={4}
												className="w-full py-3 flex justify-center items-center rounded-md shadow-lg bg-sv-white text-sv-black font-semibold brightness-90 hover:brightness-110 transition-all"
											>
												Login
											</a>
											<div className="flex flex-col justify-center opacity-50">
												<p className="text-sv-white text-center lg:text-left">
													or
												</p>
											</div>
											<button
												tabIndex={5}
												disabled={(
													emailError === 2 || emailError === 0 ||
													passwordErrorCount > 0 ||
													confirmPasswordError === 2 ||
													confirmPasswordError === 0 ||
													password === "" || confirmPassword === ""
												)}
												onClick={signUp}
												className="w-full py-3 rounded-md shadow-lg bg-sv-accent text-sv-black font-semibold brightness-90 disabled:brightness-50 hover:brightness-110 transition-all"
											>
												{
													isRegistering ? <Spinner theme={1} /> : "Submit"
												}
											</button>
										</div>
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

export const PasswordErrorListItem: FC<{ isFixed: boolean, text: string }> = (props) => {

	const { isFixed, text } = props

	if (isFixed) {
		return (
			<li className="text-sv-pomodoro-green text-xs font-semibold">
				{text}
			</li>
		)
	} else {
		return (
			<li className="text-sv-pomodoro-red text-xs">
				{text}
			</li>
		)
	}
}

export default SignUp