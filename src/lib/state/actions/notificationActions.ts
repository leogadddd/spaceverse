import { NotificationActionTypes } from "../../../util/enums";
import { INotificationCreate } from "../../../util/interfaces";


interface notificationActionSetNotification {
	type: NotificationActionTypes.ADD_NOTIFICATION;
	payload: INotificationCreate;
	isSilent?: boolean;
}

interface notificationActionRemoveNotification {
	type: NotificationActionTypes.REMOVE_NOTIFICATION;
	payload: string;
}

export type notificationAction = notificationActionSetNotification | notificationActionRemoveNotification;