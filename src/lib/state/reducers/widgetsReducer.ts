import { WidgetsActionTypes } from "../../../util/enums/widgetsActionTypes";
import { Widget, WidgetsState } from "../../../util/interfaces/state/widgetsState";
import { WidgetsAction } from "../actions";

const initialState: WidgetsState = {
	widgets: [],
	widgetHighestOrder: 100
}

export const widgetsReducer = (state = initialState, action: WidgetsAction) => {
	switch (action.type) {
		case WidgetsActionTypes.SUBSCRIBE_WIDGET:
			return {
				...state,
				widgets: [...state.widgets, {
					...action.payload,
					order: state.widgetHighestOrder
				}],
				widgetHighestOrder: state.widgetHighestOrder + 1
			}
		case WidgetsActionTypes.UNSUBSCRIBE_WIDGET:
			return {
				...state,
				widgets: state.widgets.filter(widget => widget.id !== action.payload)
			}
		case WidgetsActionTypes.UPDATE_LOCATION:
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
			return {
				...state,
				widgets: state.widgets.map(widget => {
					if (widget.id === action.payload.id) {
						return {
							...widget,
							isActive: action.payload.isActive
						}
					}
				})
			}
		case WidgetsActionTypes.SET_MINIMIZED_WIDGET:
			return {
				...state,
				widgets: state.widgets.map(widget => {
					if (widget.id === action.payload.id) {
						return {
							...widget,
							isMinimized: action.payload.isMinimized
						}
					}
				})
			}		
		default:
			return state;
	}
}

export default widgetsReducer
export type widgetsState = ReturnType<typeof widgetsReducer>