import { NotificationActionTypes } from "../../../util/enums"
import { playSound } from "../../../util/soundPlayer"
import { notificationAction } from "../actions"

export const notificationsMiddleware = (store: any) => (next: any) => (action: notificationAction) => {
	const result = next(action)

	const actionType = action.type

	switch(actionType) {
		case NotificationActionTypes.ADD_NOTIFICATION:
			const { isSilent } = action
			let notificationSound = document.getElementById("notificationFx") as HTMLAudioElement
			notificationSound.volume = 0.5

			if(notificationSound && isSilent === false) {
				playSound(notificationSound)
			}
			break
	}

	return result
}