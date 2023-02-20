
export const playSound = (sound: HTMLAudioElement) => {
	if(sound.paused) {
		sound.play()
	} else {
		sound.currentTime = 0
	}
}