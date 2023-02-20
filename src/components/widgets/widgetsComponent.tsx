import { bindActionCreators } from "@reduxjs/toolkit"
import { createContext, useEffect } from "react"
import { createPortal } from "react-dom"
import { useDispatch } from "react-redux"
import { creators } from "../../lib"
import { settingsFieldType } from "../../util/enums"
import { subscribersSettingsFields } from "../../util/enums/subscribersName"
import { Pomodoro, SpotifyPlaylistPlayer, UniverseControlsDynamic, WorldClock } from "./gizmos"
import { BrownNoiseGenerator } from "./gizmos/BrownNoiseGenerator"

export const WidgetsComponent = () => {

	const dispatch = useDispatch()
	const {
		subscribeSettingsField,
		unsubscribeSettingsField,
	} = bindActionCreators(creators, dispatch)

	useEffect(() => {
		subscribeSettingsField({
			...subscribersSettingsFields.widgets.fancyMinimizer,
			value: false,
			type: settingsFieldType.TOGGLE,
			section: "Widgets",
		})

		return () => { unsubscribeSettingsField(subscribersSettingsFields.widgets.fancyMinimizer.name) }
	}, [])

	return createPortal(
		<>
			<WorldClock />
			<UniverseControlsDynamic />
			<Pomodoro />
			<SpotifyPlaylistPlayer />
			<BrownNoiseGenerator />
		</>
		, document.getElementById("widgetsInterface") as Element)
}

export default WidgetsComponent