import { useEffect, useState } from "react"
import { auth } from "../../../app/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth"
import { FirebaseError } from "firebase/app"

export const useAuthenticator = () => {

	const [authUser, setAuthUser] = useState<any>(null)

	const [isRegistering, setIsRegistering] = useState(false)
	const [isAuthenticating, setIsAuthenticating] = useState(false)

	const [error, setError] = useState("")

	const authenticate = (username: string, password: string, callback?: () => void) => {
		setIsAuthenticating(true)
		setPersistence(auth, browserSessionPersistence)
			.then(() => {
				signInWithEmailAndPassword(auth, username, password)
					.then(() => {
						setIsAuthenticating(false)
						setError("")
						// if (callback) callback()
					})
					.catch((error) => {
						setError(ErrorInterpreter(error))
						setIsAuthenticating(false)
					})
			})
			.catch((error) => {
				setError(ErrorInterpreter(error))
				setIsAuthenticating(false)
			})
	}

	const register = (username: string, password: string, callback?: () => void) => {
		setIsAuthenticating(true)
		setPersistence(auth, browserSessionPersistence)
			.then(() => {
				createUserWithEmailAndPassword(auth, username, password)
					.then(() => {
						setIsRegistering(false)
						setError("")
						// if (callback) callback()
					})
					.catch((error) => {
						setError(ErrorInterpreter(error))
						setIsRegistering(false)
					})
			})
			.catch((error) => {
				setError(ErrorInterpreter(error))
				setIsRegistering(false)
			})
	}

	const logout = () => {
		signOut(auth)
			.then(() => {
				setIsAuthenticating(false)
				setError("")
			})
	}

	useEffect(() => {
		// check if user is already logged in
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthUser(user)
				setIsAuthenticating(false)
				setError("")
				// console.log("User is logged in")
				// console.log(user)

			} else {
				setAuthUser(null)
				setIsAuthenticating(false)
				setError("")
			}
		})

		return () => unsubscribe()

	}, [])

	return {
		authenticate,
		register,
		logout,
		isAuthenticating,
		isRegistering,
		error,
		authUser,
	}
}

const ErrorInterpreter = (error: FirebaseError) => {
	switch (error.code) {
		case "auth/invalid-email":
			return "Invalid email address"
		case "auth/user-disabled":
			return "User account has been disabled"
		case "auth/user-not-found":
			return "Email address/password combination is incorrect"
		case "auth/wrong-password":
			return "Email address/password combination is incorrect"
		case "auth/email-already-in-use":
			return "Email address already in use"
		case "auth/weak-password":
			return "Password is too weak"
		default:
			return error.message
	}
}

export default useAuthenticator