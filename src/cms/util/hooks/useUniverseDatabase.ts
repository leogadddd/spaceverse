import { collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../firebase"
import { getTypeAndUrlValue } from "../../../util/urlParser"
import { generateId } from "../idGenerator"
import { Category, createUniverseProps, Universe } from "../interface/database"
import { categoryDatabaseName } from "./useCategoryDatabase"

export const universeDatabaseName = "universe"

export const useUniverseDatabase = () => {

	

	const [universes, setUniverses] = useState<Universe[] | null>(null)

	useEffect(() => {
		const universeRef = collection(db, universeDatabaseName)

		const universeQuery = query(universeRef)

		const universeUnsubscribe = onSnapshot(universeQuery, (querySnapshot) => {
			const universes: Universe[] = []
			const sortedUniverses = querySnapshot.docs.sort((a, b) => a.data().id - b.data().id)
			sortedUniverses.forEach((doc) => {
				universes.push({
					docId: doc.id,
					id: doc.data().id,
					title: doc.data().title,
					category: doc.data().category,
					sourceType: doc.data().sourceType,
					sourceLink: doc.data().sourceLink,
					sourceUrlValue: doc.data().sourceUrlValue,
					startTime: doc.data().startTime,
					endTime: doc.data().endTime,
					createTime: doc.data().createTime,
					updateTime: doc.data().updateTime,
					contributer: doc.data().contributer,
				})
			})

			setUniverses(universes)
		})

		return () => {
			universeUnsubscribe()
		}
	}, [])

	const addUniverse = async (newUniverse: createUniverseProps) => {
		// id is assigned length of universes + 1 because id starts from 0 and length starts from 1
		const id = universes!.length > 0 ? universes![universes!.length - 1].id + 1 : 0
		const docId = generateId(universeDatabaseName)
		const { type, urlValue } = getTypeAndUrlValue(newUniverse.sourceLink)

		const contributer = newUniverse.contributer || "Spaceverse"

		await setDoc(doc(db, universeDatabaseName, docId), {
			id,
			title: newUniverse.title,
			category: newUniverse.category,
			sourceType: type,
			sourceLink: newUniverse.sourceLink,
			sourceUrlValue: urlValue,
			startTime: newUniverse.startTime,
			endTime: newUniverse.endTime,
			createTime: new Date().getTime(),
			updateTime: new Date().getTime(),
			contributer: contributer,
		} as Universe)

		// add this universe to the category it belongs to
		const categoryRef = doc(db, categoryDatabaseName, newUniverse.category)
		// get the universes array from the category
		const categoryData = getDoc(categoryRef)
		const category = (await categoryData).data() as Category

		// add the new universe to the universes array
		// check if the universes array is empty or null
		if (category.universes) {
			category.universes.push(id)
		} else {
			category.universes = [id]
		}

		// update the category
		await setDoc(categoryRef, {
			...category,
			updateTime: new Date().getTime(),
		})


	}

	const updateUniverse = async (updatedData: Universe) => {
		const docId = updatedData.docId

		if (docId) {
			await setDoc(doc(db, universeDatabaseName, docId), {
				...updatedData,
				updateTime: new Date().getTime(),
			})
		}
	}

	const deleteUniverse = async (universe: Universe) => {
		const docId = universe.docId

		if (docId) {
			await deleteDoc(doc(db, universeDatabaseName, docId))

			// remove this universe from the category it belongs to
			const categoryRef = doc(db, categoryDatabaseName, universe.category)
			// get the universes array from the category
			const categoryData = getDoc(categoryRef)
			const category = (await categoryData).data() as Category

			// remove the universe from the universes array
			category.universes = category.universes.filter((universeId) => universeId !== universe.id)

			// update the category
			await setDoc(categoryRef, {
				...category,
				updateTime: new Date().getTime(),
			})
		}
	}

	return {
		universes,
		addUniverse,
		updateUniverse,
		deleteUniverse,
	}
}