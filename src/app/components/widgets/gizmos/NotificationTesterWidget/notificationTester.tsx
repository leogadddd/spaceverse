import Widget from "../../widgetContainer"
import { AiOutlineNotification } from "react-icons/ai"
import { FC, useState } from "react"
import { NotificationButtonProps } from "./NotificationTesterProps"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import { creators } from "../../../../lib"
import { INotification, INotificationCreate, NotificationState } from "../../../../util/interfaces"
import { NotificationType } from "../../../notification/notificationComponentProps"

export const NotificationTester = () => {

	const dispatch = useDispatch()
	const {
		addNotification,
		removeNotification
	} = bindActionCreators(creators, dispatch)
	const notificationsState: NotificationState = useSelector((state: any) => state.notification)

	const [complimentState, setComplimentState] = useState<number>(0)

	const addNotificationHandler = () => {
		const notification: INotificationCreate = {
			from: "Test Notification",
			message: "This is a test notification",
			type: NotificationType.Info,
			duration: 60 * 1000
		}

		addNotification(notification)
	}

	const complimentMeHandler = () => {
		const compliments = [
			"Ain't nothin' but a heartache",
			"Ain't nothin' but a mistake",
			"I never wanna hear you say",
			"I want it that way",
		]

		const notification: INotificationCreate = {
			from: "Tell me why",
			message: compliments[complimentState],
			type: NotificationType.Success,
			duration: 10 * 1000
		}

		addNotification(notification)

		setComplimentState((state: number) => {
			return state + 1
		})
	}

	const removeNotificationHandler = () => {
		const notification: INotification = notificationsState.notifications[notificationsState.notifications.length - 1]
		removeNotification(notification.id)
	}


	return (
		<Widget
			title="Notification Console"
			defaultPosition={{ x: 20, y: 20 }}
			minWidth={300}
			label="Notif"
			icon={AiOutlineNotification}
		>
			<div className="flex flex-col p-2 gap-2">
				<Button
					onClick={complimentMeHandler}
					text="Tell me why"
				/>
				{/* <Button
					onClick={addNotificationHandler}
					text="Add Notification"
				/>
				<Button
					onClick={removeNotificationHandler}
					text="Remove Last Notification"
				/> */}
			</div>
		</Widget>
	)
}

export const Button: FC<NotificationButtonProps> = (props) => {

	const { onClick, text } = props

	return (
		<button
			onClick={onClick}
			className="bg-sv-accent dark:bg-sv-accent-dark text-sv-black corners px-4 py-2 font-semibold brightness-90 hover:brightness-110 active:brightness-125 transition-all"
		>
			{text}
		</button>
	)
}

export default NotificationTester