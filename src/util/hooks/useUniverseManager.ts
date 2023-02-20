import { bindActionCreators } from "@reduxjs/toolkit"
import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { creators } from "../../lib"
import { db } from "../../firebase"
import { query, collection, doc, onSnapshot, where } from "firebase/firestore"
import { Category, categoryDatabaseName, universeDatabaseName } from "../../cms/util"
import { UniverseState } from "../interfaces"
import { UniverseContext } from "../context/universeContext"
import { useNavigate } from "react-router"

export const useUniverseManager = () => {

	const universeState = useSelector((state: any) => state.universe)
	const universeManagerState : UniverseState["manager"] = useSelector((state: any) => state.universe.manager)
	const universeContext = useContext(UniverseContext)
	
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {
		setUniverse,
		setUniverseCategories,
		setUniversePickedCategory,
		setUniversePickedUniverse,
		setUniverseVolume,
		setUniverseMute,
	} = bindActionCreators(creators, dispatch)

	const PickCategory = (category: number) => {
		setUniversePickedCategory(category)
		setUniversePickedUniverse(0)
		universeContext.setCtx({
			...universeContext.ctx,
			universeCurrentCategortIndex: category,
			universeCurrentCategory: universeManagerState.pickedCategory,
			universeCurrentUniverseIndex: 0,
		})
	}

	const NextUniverse = () => {
		const { universes, universeIndex } = universeManagerState
		const nextUniverse = universeIndex + 1
		if (nextUniverse < universes.length) {
			setUniversePickedUniverse(nextUniverse)
		} else {
			setUniversePickedUniverse(0)
		}
	}

	const PreviousUniverse = () => {
		const { universes, universeIndex } = universeManagerState
		const nextUniverse = universeIndex - 1
		if (nextUniverse >= 0) {
			setUniversePickedUniverse(nextUniverse)
		} else {
			setUniversePickedUniverse(universes.length - 1)
		}
	}

	const getUniverseFromDatabase = async () => {
		const index = universeManagerState.universeIndex
		const id = universeManagerState.universes[index]

		if(!id) return

		const universeQuery = query(collection(db, universeDatabaseName), where("id", "==", id))
		const universeUnSubscribe = onSnapshot(universeQuery, (querySnapshot) => {
			const universe = querySnapshot.docs[0].data()

			setUniverse({
				id: universe.id,
				docId: universe.docId,
				title: universe.title,
				sourceType: universe.sourceType,
				sourceLink: universe.sourceLink,
				sourceUrlValue: universe.sourceUrlValue,
				startTime: universe.startTime,
				endTime: universe.endTime,
				contributer: universe.contributer,
			})

			universeContext.setCtx({
				...universeContext.ctx,
				universeCurrentUniverseIndex: index,
				universeCurrentUniverse: universe
			})
		})

		return () => {
			universeUnSubscribe()
		}
	}

	const getAllCategoriesFromDatabase = async () => {
		const categoriesQuery = query(collection(db, categoryDatabaseName))

		const categoriesUnSubscribe = onSnapshot(categoriesQuery, (querySnapshot) => {
			const categories: Category[] = [] 
			querySnapshot.docs.forEach((doc) => {
				if(doc.data().universes.length === 0) return

				categories.push({
					id: doc.data().id,
					docId: doc.id,
					title: doc.data().title,
					universes: doc.data().universes,
				})
			})

			setUniverseCategories(categories)
			setUniversePickedCategory(universeContext.ctx?.universeCurrentCategortIndex ?? 0)
			setUniversePickedUniverse(universeContext.ctx?.universeCurrentUniverseIndex ?? 0)
		})


		return () => {
			categoriesUnSubscribe()
		}
	}

	useEffect(() => {
		getAllCategoriesFromDatabase()

		setUniverseVolume(universeContext.ctx.universeCurrentVolume)
		setUniverseMute(universeContext.ctx.universeIsMuted)
	}, [])

	useEffect(() => {
		getUniverseFromDatabase()
	}, [universeManagerState.pickedCategory, universeManagerState.universes])

	useEffect(() => {
		getUniverseFromDatabase()
	}, [universeManagerState.universeIndex])

	return {
		categories: universeManagerState.categories,
		NextUniverse,
		PreviousUniverse,
		PickCategory,
	}
}

export default useUniverseManager;