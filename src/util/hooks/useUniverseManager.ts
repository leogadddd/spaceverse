import { useContext } from "react"
import { bindActionCreators } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { creators } from "../../lib"
import { UniverseState } from "../interfaces/state/universeState"
import { query, collection, onSnapshot, where } from "firebase/firestore"
import { db } from "../../firebase"
import { UniverseContext } from "../context/universeContext"
import { useSearchParams, useNavigate } from "react-router-dom"

export const useUniverseManager = () => {

	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {
		setUniverse,
		setUniverseCategory,
		setUniverseVolume,
		setUniverseMute
	} = bindActionCreators(creators, dispatch)
	const universeContext = useContext(UniverseContext)
	const universeState: UniverseState = useSelector((state: any) => state.universe)
	const [universeId, _setUniverseId] = useState<number>(0)
	const [maxUniverseId, setMaxUniverseId] = useState(0)

	useEffect(() => {
		if (searchParams.get("univ") === null) {
			_setUniverseId(universeContext.ctx.universeCurrent)
			navigate({
				search: `?univ=${universeContext.ctx.universeCurrent}`,
			})
		} else {
			_setUniverseId(parseInt(searchParams.get("univ") as string))
		}

		setUniverseVolume(universeContext.ctx.universeVolume)
		setUniverseMute(universeContext.ctx.universeMute)

		const q = query(collection(db, "universe"))

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setMaxUniverseId(querySnapshot.size)
		})

		return () => {
			unsubscribe()
		}
	}, [])

	useEffect(() => {
		const universeQuery = query(collection(db, "universe"), where("id", "==", universeId))

		const universeUnsubscribe = onSnapshot(universeQuery, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				setUniverse({
					id: doc.data().id,
					docId: doc.id,
					title: doc.data().title,
					sourceType: doc.data().sourceType,
					sourceLink: doc.data().sourceLink,
					sourceUrlValue: doc.data().sourceUrlValue,
					contributer: null,
					category: doc.data().category,
				})
			})
		})

		return () => {
			universeUnsubscribe()
		}
	}, [universeId])

	useEffect(() => {
		if (universeState.category === null) return

		const categoryQuery = query(collection(db, "category"), where("id", "==", universeState.category))

		const categoryUnsubscribe = onSnapshot(categoryQuery, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				setUniverseCategory({
					id: doc.data().id,
					docId: doc.id,
					title: doc.data().title,
				})
			})
		})

		return () => {
			categoryUnsubscribe()
		}
	}, [universeState.category])


	const setUniverseId = (id: number) => {
		_setUniverseId(id)
		setUniverseVolume(universeContext.ctx.universeVolume)
		universeContext.setCtx({
			...universeContext.ctx,
			universeCurrent: id,
		})
		navigate({
			search: `?univ=${id}`,
		})
	}

	const nextUniverse = () => {
		console.log("nextUniverse")
		if (universeId < maxUniverseId - 1) {
			setUniverseId(universeId + 1)
		} else {
			setUniverseId(0)
		}
	}

	const previousUniverse = () => {
		console.log("previousUniverse")
		if (universeId > 0) {
			setUniverseId(universeId - 1)
		} else {
			setUniverseId(maxUniverseId - 1)
		}
	}

	return [nextUniverse, previousUniverse]
}

export default useUniverseManager