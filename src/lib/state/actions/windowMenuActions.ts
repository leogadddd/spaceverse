import { WindowMenuActionTypes } from "../../../util/enums";
import { TWindowMenuItem, TWindowMenuItemHasNewContent, TWindowMenuItemToggle } from "../../../util/types";

interface windowMenuActionSetIsOpen {
	type: WindowMenuActionTypes.TOGGLE_IS_OPEN;
	value: boolean;
}

interface windowMenuActionSubscribeMenu {
	type: WindowMenuActionTypes.SUBSCRIBE_MENU;
	payload: TWindowMenuItem;
}

interface windowMenuActionUnsubscribeMenu {
	type: WindowMenuActionTypes.UNSUBSCRIBE_MENU;
	value: string;
}

interface windowMenuActionToggleMenuItem {
	type: WindowMenuActionTypes.TOGGLE_MENU_ITEM_IS_OPEN;
	payload: TWindowMenuItemToggle;
}

interface windowMenuActionUpdateData {
	type: WindowMenuActionTypes.UPDATE_DATA;
	payload: any;
}

interface windowMenuActionHasNewContentToggle {
	type: WindowMenuActionTypes.HAS_NEW_CONTENT_TOGGLE;
	payload: TWindowMenuItemHasNewContent
}

export type windowMenuAction = windowMenuActionHasNewContentToggle | windowMenuActionSetIsOpen | windowMenuActionSubscribeMenu | windowMenuActionUnsubscribeMenu | windowMenuActionToggleMenuItem | windowMenuActionUpdateData;
