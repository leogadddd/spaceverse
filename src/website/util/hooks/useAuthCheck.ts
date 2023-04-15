import { useEffect, useState } from "react"
import { auth } from "../../../app/firebase"

export const useAuthCheck = () => {

	const [isLogged, setIsLogged] = useState(false)
	const [checkingStatus, setCheckingStatus] = useState(true)

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsLogged(true)
			}

			setCheckingStatus(false)
		})
	}, [])

	return { isLogged, checkingStatus }
}

export default useAuthCheck