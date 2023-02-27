import { NotificationActionTypes } from "../../../util/enums";
import { NotificationState } from "../../../util/interfaces";
import { notificationAction } from "../actions";

export const initialState: NotificationState = {
	notifications: [],
	defaultDuration: 5000,
};

export const notificationReducer = (state: NotificationState = initialState, action: notificationAction): NotificationState => {

	switch (action.type) {
		case NotificationActionTypes.ADD_NOTIFICATION:
			return {
				...state,
				notifications: [{
					...action.payload,
					id: Math.random().toString(36),
					createdAt: Date.now(),
					duration: action.payload.duration || state.defaultDuration,
					expiredAt: Date.now() + (action.payload.duration || state.defaultDuration),
				}, ...state.notifications],
			};
		case NotificationActionTypes.REMOVE_NOTIFICATION:
			return {
				...state,
				notifications: state.notifications.filter((notification) => notification.id !== action.payload),
			};
		default:
			return state;
	}
}

export default notificationReducer
export type notificationState = ReturnType<typeof notificationReducer>