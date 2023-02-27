import { AnimatePresence, motion } from "framer-motion"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { INotification, NotificationState } from "../../util/interfaces/"
import { NotificationItemProps } from "./notificationComponentProps"
import { IoNotifications } from "react-icons/io5"
import { CgClose } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import { creators } from "../../lib"
import { getTimeSince } from "../../util/timerRemaining"
import { playSound } from "../../util/soundPlayer"

export const NotificationComponent = () => {

	const notificationsState: NotificationState = useSelector((state: any) => state.notification)
	const dispatch = useDispatch()

	const visibleCount = 5

	const {
		removeNotification
	} = bindActionCreators(creators, dispatch)

	const [last3Notifications, setLast3Notifications] = useState<INotification[]>([])

	useEffect(() => {
		if (notificationsState.notifications.length > visibleCount) {
			setLast3Notifications(notificationsState.notifications.slice(notificationsState.notifications.length - visibleCount, notificationsState.notifications.length))
		} else {
			setLast3Notifications(notificationsState.notifications)
		}
	}, [notificationsState.notifications])

	// create an interval to check if the notification is expired
	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime()
			const expiredNotifications = notificationsState.notifications.filter((notification: INotification) => {
				return now > notification.expiredAt
			})

			if (expiredNotifications.length > 0) {
				expiredNotifications.forEach((notification: INotification) => {
					removeNotification(notification.id)
				})
			}
		}, 100)
		return () => clearInterval(interval)
	}, [notificationsState.notifications])

	return (
		<NotificationContainerLayout>
			<div className="absolute left-1/2 -translate-x-1/2 p-2 flex flex-col">
				<AnimatePresence mode="sync">
					{
						last3Notifications.map((notification: INotification) => {
							return (
								<NotificationItem
									key={notification.id}
									id={notification.id}
									message={notification.message}
									type={notification.type}
									from={notification.from}
									icon={notification.icon}
									actions={notification.actions}
									createdAt={notification.createdAt}
									expiredAt={notification.expiredAt}
									duration={notification.duration}
								/>
							)
						})
					}
				</AnimatePresence>
			</div>
		</NotificationContainerLayout>
	)
}

export const NotificationItem: FC<NotificationItemProps> = (props) => {

	const { id, message, type, icon: Icon, from, actions, createdAt } = props

	const [createdAtText, setCreatedAtText] = useState<string>("")

	const dispatch = useDispatch()
	const {
		removeNotification
	} = bindActionCreators(creators, dispatch)

	const handleRemoveNotification = () => {
		dispatch(removeNotification(id))
	}

	useEffect(() => {
		const tout = setInterval(() => {
			setCreatedAtText(getTimeSince(createdAt))
		}, 3000)

		return () => clearInterval(tout)
	}, [])

	return (
		<motion.div
			id={id}
			initial={{ opacity: 0, height: 0, marginBottom: 0 }}
			animate={{ opacity: 1, height: "auto", marginBottom: 10 }}
			exit={{ opacity: 0, height: 0, marginBottom: 0 }}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2, ease: "easeInOut" }}
			className="w-[400px] shadow-lg bg-sv-light dark:bg-sv-dark pointer-events-auto corners overflow-hidden cursor-pointer"
			layout
		>

			<div className="flex items-center justify-between gap-2 p-3 px-6 pr-2 ">
				<div className="flex-1 w-[200px]">
					<div className="flex items-center justify-between gap-2 opacity-50 pb-1">
						<div className="flex items-center gap-2">
							{Icon ? <Icon /> : (
								<motion.div
									// shake animation
									initial={{ rotate: 0 }}
									animate={{ rotate: [0, 15, -15, 15, -15, 15, -15, 0] }}
									transition={{ duration: 0.5, ease: "easeInOut", delay: 0.15 }}
								>
									<IoNotifications className=" text-sm inline-block text-sv-dark dark:text-sv-white" />
								</motion.div>
							)}
							<span className="text-sv-dark dark:text-sv-white text-sm">
								{from}
							</span>
						</div>
						<div className="flex items-center">
							<span className="text-sv-dark dark:text-sv-white text-xs">
								{getTimeSince(createdAt)}
							</span>
						</div>
					</div>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeInOut", delay: 0.15 }}
						className="text-sv-dark dark:text-sv-white text-sm break-words min-h-[20px]"
					>
						{message}
					</motion.p>
				</div>
				<div>
					<button onClick={handleRemoveNotification} className="p-3 transition-colors hover:bg-sv-input-dark pointer-events-auto corners">
						<CgClose size={20} className="text-sv-dark dark:text-sv-white" />
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export const NotificationContainerLayout: FC<PropsWithChildren> = (props) => {

	const { children } = props

	return createPortal(
		<div>
			{children}
		</div>
		, document.getElementById("notificationsInterface") as HTMLElement)
}

export default NotificationComponent