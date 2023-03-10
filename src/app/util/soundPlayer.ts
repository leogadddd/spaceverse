import { store } from "../lib"
import { ISystemSettingsItemState } from "./interfaces/state/systemSettinsState"

export const playSound = (sound: HTMLAudioElement) => {

	const Store: ISystemSettingsItemState | undefined = store.getState().systemSettings.systemSettings.find(setting => setting.id === "immediateToolbarMuteButton")

	if(Store && Store?.value === true)
		return

	if(sound.paused) {
		sound.play()
	} else {
		sound.currentTime = 0
	}
}