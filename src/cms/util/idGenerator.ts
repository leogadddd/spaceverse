
import { db } from "../../app/firebase"
import { doc, getDoc } from "firebase/firestore"

export const generateId = (dbName: string) => {

	const IdLength = parseInt(process.env.REACT_APP_databaseDocIdLength!) || 10

	// generate a random id for 10 characters mixed with numbers and letters (a-z, A-Z, 0-9) and special characters
	const randomId = () => {
		let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-"
		// randomize the order of the characters
		characters = characters.split("").sort(() => Math.random() - 0.5).join("")

		let result = ""
		for (let i = 0; i < IdLength; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length))
		}
		return result
	}

	// check if the id is already in use
	const checkId = async () => {
		const docRef = doc(db, dbName, id)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return false
		} else {
			return true
		}
	}

	let id = randomId()

	while (!checkId()) {
		id = randomId()
	}

	return id 
}