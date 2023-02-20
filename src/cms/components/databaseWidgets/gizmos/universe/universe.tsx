import { useEffect, useState } from "react"
import { Universe, useCategoryDatabase, useUniverseDatabase } from "../../../../util"
import DatabaseWidgetContainer from "../../databaseWidgetContainer"
import { DatabaseWidgetFormFieldProps, DatabaseWidgetFormType } from "../../databaseWidgetProps"
import DatabaseWidgetTemplate from "../../databaseWidgetTemplate"

export const UniverseDatabase = () => {

	const { universes, addUniverse, deleteUniverse } = useUniverseDatabase()
	const { categories } = useCategoryDatabase()

	// fields
	const [title, setTitle] = useState("")
	const [category, setCategory] = useState("")
	const [sourceLink, setSourceLink] = useState("")
	const [startTime, setStartTime] = useState(0)
	const [endTime, setEndTime] = useState(null as number | null)
	const [contributer, setContributer] = useState("")

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
		},
		{
			name: "category",
			type: DatabaseWidgetFormType.SELECT,
			label: "Category",
			value: category,
			// options might be null
			options: categories?.map(category => {
				return {
					label: category.title,
					value: category.docId
				} as DatabaseWidgetFormFieldProps
			}) ?? [],
			onChange: (value: string) => {
				setCategory(value)
			}
		},
		{
			name: "contributer",
			type: DatabaseWidgetFormType.TEXT,
			label: "Contributer",
			placeholder: "please enter a contributer",
			value: contributer,
			onChange: (value: string) => {
				setContributer(value)
			}
		},
		{
			name: "sourceLink",
			type: DatabaseWidgetFormType.TEXT,
			label: "Source Link",
			placeholder: "please enter a source link",
			value: sourceLink,
			onChange: (value: string) => {
				setSourceLink(value)
			}
		},
		{
			name: "startTime",
			type: DatabaseWidgetFormType.NUMBER,
			label: "Start Time",
			placeholder: "please enter a start time",
			value: startTime,
			onChange: (value: number) => {
				setStartTime(value)
			}
		},
		{
			name: "endTime",
			type: DatabaseWidgetFormType.NUMBER,
			label: "End Time",
			placeholder: "please enter an end time",
			value: endTime,
			onChange: (value: number) => {
				if (value === 0) setEndTime(null)
				setEndTime(value)
			}
		}
	]

	const handleAddUniverse = async () => {
		await addUniverse({
			title,
			category,
			sourceLink,
			startTime,
			endTime,
			contributer
		})

		setTitle("")
		setCategory("")
		setSourceLink("")
		setStartTime(0)
		setEndTime(null)
		setContributer("")
	}

	const handleDeleteUniverse = async (universe: Universe) => {
		const confirm = window.confirm(`Are you sure you want to delete ${universe.title}?`)

		if (confirm) {
			await deleteUniverse(universe)
		}
	}

	return (
		<DatabaseWidgetContainer
			title="Universe Database"
			minWidth={500}
			defaultPosition={{ x: 35, y: 25 }}
		>
			<DatabaseWidgetTemplate
				onAddRow={handleAddUniverse}
				onRemoveRow={handleDeleteUniverse}
				rows={universes}
				fields={fields}
			/>
		</DatabaseWidgetContainer>
	)
}

export default UniverseDatabase