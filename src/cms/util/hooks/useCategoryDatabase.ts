import { collection, doc, onSnapshot, query, setDoc, deleteDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../firebase"
import { createCategoryProps } from "../../components/databaseWidgets/gizmos/category/categoryProps"
import { generateId } from "../idGenerator"
import { Category, createCategory } from "../interface"

export const categoryDatabaseName = "category"

export const useCategoryDatabase = () => {

	

	const [categories, setCategories] = useState<Category[] | null>(null)

	useEffect(() => {
		const categoryRef = collection(db, categoryDatabaseName)

		const categoryQuery = query(categoryRef)

		const categoryUnsubscribe = onSnapshot(categoryQuery, (querySnapshot) => {
			const categories: Category[] = []
			const sortedCategories = querySnapshot.docs.sort((a, b) => a.data().id - b.data().id)
			sortedCategories.forEach((doc) => {
				categories.push({
					id: doc.data().id,
					docId: doc.id,
					title: doc.data().title,
					createTime: doc.data().createTime,
					updateTime: doc.data().updateTime,
					universes: doc.data().universes,
					universesLen: doc.data().universes.length,
				})
			})

			setCategories(categories)
		})

		return () => {
			categoryUnsubscribe()
		}
	}, [])

	const addCategory = (newCategory : createCategoryProps) => {
		// id get the last id and add 1

		const id = categories!.length > 0 ? categories![categories!.length - 1].id + 1 : 0
		const docId = generateId(categoryDatabaseName)

		setDoc(doc(db, categoryDatabaseName, docId), {
			id,
			docId,
			title: newCategory.title,
			createTime: new Date().getTime(),
			updateTime: new Date().getTime(),
			universes: [],
			universesLen: 0,
		} as createCategory)
	}

	const updateCategory = async (updatedData: Category) => {
		const docId = updatedData.docId

		if (docId) {
			await setDoc(doc(db, categoryDatabaseName, docId), updatedData)
		}
	}

	const deleteCategory = async (category: Category) => {
		const docId = category.docId

		if (docId) {
			await deleteDoc(doc(db, categoryDatabaseName, docId))
		}
	}
		

	return { categories, addCategory, deleteCategory, updateCategory }
}