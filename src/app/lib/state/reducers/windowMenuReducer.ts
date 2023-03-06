import { WindowMenuActionTypes } from "../../../util/enums";
import { WindowMenuState } from "../../../util/interfaces";
import { windowMenuAction } from "../actions";

const initialState : WindowMenuState = {
	isOpen: false,
	menuItems: [],
}

export const windowMenuReducer = (state = initialState, action: windowMenuAction): WindowMenuState => {
	switch(action.type) {
		case WindowMenuActionTypes.TOGGLE_IS_OPEN:
			return {
				...state,
				isOpen: action.value
			}
		case WindowMenuActionTypes.SUBSCRIBE_MENU:
			return {
				...state,
				menuItems: [
					...state.menuItems,
					action.payload
				]
			}
		case WindowMenuActionTypes.UNSUBSCRIBE_MENU:
			return {
				...state,
				menuItems: state.menuItems.filter(item => item.name !== action.value)
			}
		case WindowMenuActionTypes.TOGGLE_MENU_ITEM_IS_OPEN:
			return {
				...state,
				menuItems: state.menuItems.map(item => {
					if(item.name === action.payload.name) {
						return {
							...item,
							isOpen: action.payload.isOpen
						}
					} else {
						return {
							...item,
							isOpen: false
						}
					}
				})
			}
		case WindowMenuActionTypes.UPDATE_DATA:
			return {
				...state,
				menuItems: state.menuItems.map(item => {
					if(item.name === action.payload.name) {
						return {
							...item,
							data: action.payload
						}
					}
					return item;
				})
			}
		case WindowMenuActionTypes.HAS_NEW_CONTENT_TOGGLE:
			return {
				...state,
				menuItems: state.menuItems.map(item => {
					if(item.name === action.payload.name) {
						return {
							...item,
							hasNewContent: action.payload.hasNewContent
						}
					}
					return item;
				})
			}
		default:
			return state;
	}
}

export default windowMenuReducer
export type windowMenuReducerState = ReturnType<typeof windowMenuReducer>