import { useState } from "react"
import { Category, useCategoryDatabase } from "../../../../util"
import DatabaseWidgetContainer from "../../databaseWidgetContainer"
import { DatabaseWidgetFormType } from "../../databaseWidgetProps"
import DatabaseWidgetTemplate from "../../databaseWidgetTemplate"

export const CategoryDatabase = () => {

	const { categories, addCategory, deleteCategory } = useCategoryDatabase()

	// fields
	const [title, setTitle] = useState("")

	const fields = [
		{
			name: "title",
			type: DatabaseWidgetFormType.TEXT,
			label: "Title",
			value: title,
			placeholder: "please enter a title",
			onChange: (value: string) => {
				// max length of 50
				if (value.length > 50) return
				setTitle(value)
			}
		}
	]

	const handleAddCategory = async () => {
		await addCategory({
			title
		})

		setTitle("")
	}

	const handleDeleteCategory = async (category: Category) => {
		const confirm = window.confirm(`Are you sure you want to delete ${category.title}?`)

		if (confirm) {
			await deleteCategory(category)
		}
	}

	return (
		<DatabaseWidgetContainer
			title="Category Database"
			minWidth={350}
			defaultPosition={{ x: 25, y: 20 }}
		>
			<DatabaseWidgetTemplate
				fields={fields}
				onAddRow={handleAddCategory}
				onRemoveRow={handleDeleteCategory}
				rows={categories}
			/>
		</DatabaseWidgetContainer>
	)
}