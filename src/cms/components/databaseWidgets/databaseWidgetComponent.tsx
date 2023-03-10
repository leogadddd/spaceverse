import { createPortal } from "react-dom"
import {
	CategoryDatabase
} from "./gizmos"
import { UniverseDatabase } from "./gizmos/universe"

export const DatabaseWidgetComponent = () => {

	return createPortal(
		<>
			<DatabaseWidgetsInterfaceDesign />
			<CategoryDatabase />
			<UniverseDatabase />
		</>
		, document.getElementById("widgetsInterface") as HTMLElement)
}

export const DatabaseWidgetsInterfaceDesign = () => {

	return (
		<>
			<div className="absolute inset-7 top-14 ring-1 dark:ring-sv-light35 ring-sv-ring-dark corners opacity-50" />
		</>
	)
}

export default DatabaseWidgetComponent;