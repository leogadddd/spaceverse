import { WidgetsActionTypes } from "../../../util/enums/widgetsActionTypes";
import { Widget } from "../../../util/interfaces/state/widgetsState";

interface widgetsActionSubscribeWidget {
	type: WidgetsActionTypes.SUBSCRIBE_WIDGET;
	payload: Widget
}

interface widgetsActionUnsubscribeWidget {
	type: WidgetsActionTypes.UNSUBSCRIBE_WIDGET;
	payload: string
}

interface widgetsActionUpdateLocation {
	type: WidgetsActionTypes.UPDATE_LOCATION;
	id: string;
	payload: {
		x: number;
		y: number;
	}
}

interface widgetsActionUpdateOrder {
	type: WidgetsActionTypes.UPDATE_ORDER;
	value: string;
}

interface widgetsActionSetActiveWidget {
	type: WidgetsActionTypes.SET_ACTIVE_WIDGET;
	payload: {
		id: string;
		isActive: boolean;
	};
}

interface widgetsActionSetMinimizedWidget {
	type: WidgetsActionTypes.SET_MINIMIZED_WIDGET;
	payload: {
		id: string;
		isMinimized: boolean;
	};
}

export type WidgetsAction = widgetsActionSubscribeWidget | widgetsActionUnsubscribeWidget | widgetsActionUpdateLocation | widgetsActionUpdateOrder | widgetsActionSetActiveWidget | widgetsActionSetMinimizedWidget;