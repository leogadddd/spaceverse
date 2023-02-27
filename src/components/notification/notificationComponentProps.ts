import { INotification } from "../../util/interfaces";

export enum NotificationType {
	Success = 'success',
	Info = 'info',
	Warning = 'warning',
	Error = 'error',
}

export interface NotificationItemProps extends INotification {}