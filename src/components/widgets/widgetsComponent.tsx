import { createPortal } from "react-dom"
import { UniverseControlsDynamic, UniverseControlsStatic, WorldClock } from "./gizmos"

export const WidgetsComponent = () => {

	return createPortal(
		<>
			<WorldClock />
			<UniverseControlsStatic />
			{/* <UniverseControlsDynamic /> */}
		</>
	, document.getElementById("widgetsInterface") as Element)
}

export default WidgetsComponent