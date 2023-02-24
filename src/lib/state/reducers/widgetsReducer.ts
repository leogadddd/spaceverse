import { WidgetsActionTypes } from "../../../util/enums/widgetsActionTypes";
import { Widget, WidgetsState } from "../../../util/interfaces/state/widgetsState";
import { WidgetsAction } from "../actions";

const initialState: WidgetsState = {
	widgets: [],
	widgetHighestOrder: 100,
	WindowSizes: {
		width: 0,
		height: 0
	}
}

export const widgetsReducer = (state = initialState, action: WidgetsAction) => {
	switch (action.type) {
		case WidgetsActionTypes.SUBSCRIBE_WIDGET:
			if(state.widgets.find(widget => widget.id === action.payload.id)) return state;

			return {
				...state,
				widgets: [...state.widgets, {
					...action.payload,
					order: state.widgetHighestOrder
				}],
				widgetHighestOrder: state.widgetHighestOrder + 1
			}
		case WidgetsActionTypes.UNSUBSCRIBE_WIDGET:
			if(!state.widgets.find(widget => widget.id === action.payload)) return state;

			return {
				...state,
				widgets: state.widgets.filter(widget => widget.id !== action.payload)
			}
		case WidgetsActionTypes.UPDATE_LOCATION:
			if(!state.widgets.find(widget => widget.id === action.id)) return state;

			return {
				...state,
				widgets: state.widgets.map(widget => {
					if (widget.id === action.id) {
						return {
							...widget,
							position: action.payload
						}
					}
					return widget;
				})
			}
		case WidgetsActionTypes.UPDATE_ORDER:
			if(!state.widgets.find(widget => widget.id === action.value)) return state;

			let isAlreadyHighestOrder = false;

			const getOrder = (widget: Widget) => {
				if(widget.order === state.widgetHighestOrder) {
					isAlreadyHighestOrder = true;
					return widget.order;
				}

				return state.widgetHighestOrder;
			}

			return {
				...state,
				widgets: state.widgets.map(widget => {
					if (widget.id === action.value) {
						return {
							...widget,
							order: getOrder(widget)
						}
					}

					return widget
				}),
				widgetHighestOrder: isAlreadyHighestOrder ? state.widgetHighestOrder : state.widgetHighestOrder + 1
			}
		case WidgetsActionTypes.SET_ACTIVE_WIDGET:
			if(!state.widgets.find(widget => widget.id === action.payload.id)) return state;

			return {
				...state,
				widgets: state.widgets.map(widget => {
					if (widget.id === action.payload.id) {
						return {
							...widget,
							isActive: action.payload.isActive,
							order: action.payload.isActive ? state.widgetHighestOrder : widget.order
						}
					}

					return widget;
				}),
				widgetHighestOrder: action.payload.isActive ? state.widgetHighestOrder + 1 : state.widgetHighestOrder
			}
		case WidgetsActionTypes.SET_MINIMIZED_WIDGET:
			if(!state.widgets.find(widget => widget.id === action.payload.id)) return state;

			return {
				...state,
				widgets: state.widgets.map(widget => {
					if (widget.id === action.payload.id) {
						return {
							...widget,
							isMinimized: action.payload.isMinimized
						}
					}

					return widget;
				})
			}
		case WidgetsActionTypes.SET_WIDGET_SIZE:
			if(!state.widgets.find(widget => widget.id === action.payload.id)) return state;
			
			return {
				...state,
				widgets: state.widgets.map(widget => {
					if (widget.id === action.payload.id) {
						return {
							...widget,
							size: {
								...widget.size,
								width: action.payload.width,
								height: action.payload.height
							}
						}
					}

					return widget;
				})
			}
		case WidgetsActionTypes.SET_WINDOW_SIZE:
			return {
				...state,
				WindowSizes: action.payload
			}		
		default:
			return state;
	}
}

export default widgetsReducer
export type widgetsState = ReturnType<typeof widgetsReducer>