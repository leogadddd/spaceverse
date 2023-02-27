import { NotificationActionTypes } from "../../../util/enums"
import { INotification, INotificationCreate } from "../../../util/interfaces"
import { notificationAction } from "../actions"

export const addNotification = (notification: INotificationCreate, isSilent?: boolean): notificationAction => {
	return {
		type: NotificationActionTypes.ADD_NOTIFICATION,
		payload: notification,
		isSilent: isSilent || false,
	}
}

export const removeNotification = (id: string): notificationAction => {
	return {
		type: NotificationActionTypes.REMOVE_NOTIFICATION,
		payload: id,
	}
}