import { WidgetsActionTypes } from "../../../util/enums/widgetsActionTypes"
import { convertPercentageToPixels, convertPixelToPercentage } from "../../../util/percentageDimensionConverter"
import { WidgetsAction } from "../actions"

export const localStorageWidgetsName = "widgetsContext"

export const widgetsMiddleware = (store: any) => (next: any) => (action: WidgetsAction) => {

	const result = next(action)

	const actionType = action.type
	const storeState = store.getState()

	switch (actionType) {
		case WidgetsActionTypes.SUBSCRIBE_WIDGET:
			let { id, name, position, isMinimized, isActive, size } = action.payload

			let widget = {
				id: id,
				name: name,
				position: {
					x: convertPixelToPercentage(position.x, storeState.widgets.WindowSizes.width - size.width),
					y: convertPixelToPercentage(position.y, storeState.widgets.WindowSizes.height - size.height)
				},
				isMinimized: isMinimized,
				isActive: isActive,
			}

			let widgetsContext = localStorage.getItem(localStorageWidgetsName)
			if (widgetsContext === null) {
				widgetsContext = JSON.stringify([widget])
			} else {
				const widgetsContextArray = JSON.parse(widgetsContext)
				const widgetIndex = widgetsContextArray.findIndex((widget: any) => widget.id === id)
				if (widgetIndex === -1) {
					widgetsContextArray.push(widget)
				} else {
					widgetsContextArray[widgetIndex] = {...widget}

					action.payload.position = {
						x: convertPercentageToPixels(widgetsContextArray[widgetIndex].position.x, storeState.widgets.WindowSizes.width - size.width),
						y: convertPercentageToPixels(widgetsContextArray[widgetIndex].position.y, storeState.widgets.WindowSizes.height - size.height)
					}
					action.payload.isMinimized = widgetsContextArray[widgetIndex].isMinimized
					action.payload.isActive = widgetsContextArray[widgetIndex].isActive
				}
				widgetsContext = JSON.stringify(widgetsContextArray)
			}
			localStorage.setItem(localStorageWidgetsName, widgetsContext)
			break;
		case WidgetsActionTypes.UPDATE_LOCATION:
			let id2 = action.id
			let { x, y } = action.payload

			let widgetsContext2 = localStorage.getItem(localStorageWidgetsName)
			if (widgetsContext2 !== null) {
				const widgetsContextArray2 = JSON.parse(widgetsContext2)
				const widgetIndex2 = widgetsContextArray2.findIndex((widget: any) => widget.id === id2)
				if (widgetIndex2 !== -1) {
					widgetsContextArray2[widgetIndex2].position = {
						x: convertPixelToPercentage(x, storeState.widgets.WindowSizes.width - storeState.widgets.widgets[widgetIndex2].size.width),
						y: convertPixelToPercentage(y, storeState.widgets.WindowSizes.height - storeState.widgets.widgets[widgetIndex2].size.height)
					}
					widgetsContext2 = JSON.stringify(widgetsContextArray2)
					localStorage.setItem(localStorageWidgetsName, widgetsContext2)
				}
			}
			break;
		case WidgetsActionTypes.SET_ACTIVE_WIDGET:
			let { id: id3, isActive: isActive3 } = action.payload

			let widgetsContext3 = localStorage.getItem(localStorageWidgetsName)
			if (widgetsContext3 !== null) {
				const widgetsContextArray3 = JSON.parse(widgetsContext3)
				const widgetIndex3 = widgetsContextArray3.findIndex((widget: any) => widget.id === id3)
				if (widgetIndex3 !== -1) {
					widgetsContextArray3[widgetIndex3].isActive = isActive3
					widgetsContext3 = JSON.stringify(widgetsContextArray3)
					localStorage.setItem(localStorageWidgetsName, widgetsContext3)
				}
			}
			break;
		case WidgetsActionTypes.SET_MINIMIZED_WIDGET:
			let { id: id4, isMinimized: isMinimized4 } = action.payload

			let widgetsContext4 = localStorage.getItem(localStorageWidgetsName)
			if (widgetsContext4 !== null) {
				const widgetsContextArray4 = JSON.parse(widgetsContext4)
				const widgetIndex4 = widgetsContextArray4.findIndex((widget: any) => widget.id === id4)
				if (widgetIndex4 !== -1) {
					widgetsContextArray4[widgetIndex4].isMinimized = isMinimized4
					widgetsContext4 = JSON.stringify(widgetsContextArray4)
					localStorage.setItem(localStorageWidgetsName, widgetsContext4)
				}
			}
			break;
	}

	return result
}

export default widgetsMiddleware