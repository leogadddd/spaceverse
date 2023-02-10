import { Dispatch } from "redux";
import { WindowMenuActionTypes } from "../../../util/enums";
import { TWindowMenuItem, TWindowMenuItemToggle } from "../../../util/types";
import { windowMenuAction } from "../actions";

export const toggleWindowMenu = (isOpen: boolean) => {
	return (dispatch: Dispatch<windowMenuAction>) => {
		dispatch({
			type: WindowMenuActionTypes.TOGGLE_IS_OPEN,
			value: isOpen,
		});
	}
}

export const subscribeWindowMenu = (menu: TWindowMenuItem) => {
	return (dispatch: Dispatch<windowMenuAction>) => {
		dispatch({
			type: WindowMenuActionTypes.SUBSCRIBE_MENU,
			payload: menu,
		});
	}
}

export const unsubscribeWindowMenu = (name: string) => {
	return (dispatch: Dispatch<windowMenuAction>) => {
		dispatch({
			type: WindowMenuActionTypes.UNSUBSCRIBE_MENU,
			value: name,
		});
	}
}

export const toggleWindowMenuItem = (isOpen: TWindowMenuItemToggle) => {
	return (dispatch: Dispatch<windowMenuAction>) => {
		dispatch({
			type: WindowMenuActionTypes.TOGGLE_MENU_ITEM_IS_OPEN,
			payload: isOpen,
		});
	}
}

export const updateWindowMenuData = (data: any) => {
	return (dispatch: Dispatch<windowMenuAction>) => {
		dispatch({
			type: WindowMenuActionTypes.UPDATE_DATA,
			payload: data,
		});
	}
}