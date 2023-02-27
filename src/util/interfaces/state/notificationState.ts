import { NotificationType } from "../../../components/notification/notificationComponentProps"

export interface NotificationState {
	notifications: INotification[],
	defaultDuration: number,
}

export interface INotification {
	id: string
	message: string
	type: NotificationType
	from: string
	icon?: string | null
	actions?: NotificationAction[]
	createdAt: number,
	duration: number,
	expiredAt: number,
}

export interface INotificationCreate  {
	message: string
	type: NotificationType
	from: string
	icon?: string | null
	actions?: NotificationAction[],
	duration?: number,
}

export interface NotificationAction {
	label: string
	callback: () => void
}