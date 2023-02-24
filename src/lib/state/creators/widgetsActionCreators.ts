import { WidgetsActionTypes } from "../../../util/enums/widgetsActionTypes"
import { Widget } from "../../../util/interfaces/state/widgetsState"


export const subscribeWidget = (widget: Widget) => {
	return {
		type: WidgetsActionTypes.SUBSCRIBE_WIDGET,
		payload: widget
	}
}

export const unsubscribeWidget = (id: string) => {
	return {
		type: WidgetsActionTypes.UNSUBSCRIBE_WIDGET,
		payload: id
	}
}

export const updatePosition = (id: string, position: { x: number, y: number }) => {
	return {
		type: WidgetsActionTypes.UPDATE_LOCATION,
		id,
		payload: position
	}
}

export const updateOrder = (id: string) => {
	return {
		type: WidgetsActionTypes.UPDATE_ORDER,
		value: id
	}
}

export const setActiveWidget = (id: string, isActive: boolean) => {
	return {
		type: WidgetsActionTypes.SET_ACTIVE_WIDGET,
		payload: {
			id,
			isActive
		}
	}
}

export const setMinimizedWidget = (id: string, isMinimized: boolean) => {
	return {
		type: WidgetsActionTypes.SET_MINIMIZED_WIDGET,
		payload: {
			id,
			isMinimized
		}
	}
}

export const setWindowSize = (width: number, height: number) => {
	return {
		type: WidgetsActionTypes.SET_WINDOW_SIZE,
		payload: {
			width,
			height
		}
	}
}

export const setWidgetSize = (id: string, width: number, height: number) => {
	return {
		type: WidgetsActionTypes.SET_WIDGET_SIZE,
		id,
		payload: {
			width,
			height
		}
	}
}
