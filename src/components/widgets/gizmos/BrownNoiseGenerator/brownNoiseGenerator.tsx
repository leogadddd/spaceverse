import { useEffect, useRef, useState } from "react"
import Widget from "../../widgetContainer"
import { UniverseVolumeButton } from "../universeControls/universeControlsDynamic"

export const BrownNoiseGenerator = () => {

	const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
	const [source, setSource] = useState<AudioBufferSourceNode | null>(null)
	const [gainNode, setGainNode] = useState<GainNode | null>(null)
	const [volume, setVolume] = useState<number>(0)
	const [cachedVolume, setCachedVolume] = useState<number>(0)
	const [isMuted, setIsMuted] = useState<boolean>(false)

	useEffect(() => {
		const AudioContext = window.AudioContext || (window as any).webkitAudioContext
		const newAudioContext: AudioContext = new AudioContext()
		const newSource = newAudioContext.createBufferSource()
		const newGainNode = newAudioContext.createGain()

		setAudioContext(newAudioContext)
		setSource(newSource)
		setGainNode(newGainNode)

		// generate white noise
		// const bufferSize = 2 * newAudioContext.sampleRate
		// const noiseBuffer = newAudioContext.createBuffer(1, bufferSize, newAudioContext.sampleRate)
		// const output = noiseBuffer.getChannelData(0)
		// for (let i = 0; i < bufferSize; i++) {
		// 	output[i] = Math.random() * 2 - 1
		// }
		// newSource.buffer = noiseBuffer

		// newSource.loop = true
		// newSource.connect(newGainNode)


		// generate brown noise
		const bufferSize = 2 * (newAudioContext.sampleRate / 6)
		const noiseBuffer = newAudioContext.createBuffer(1, bufferSize, newAudioContext.sampleRate)
		const output = noiseBuffer.getChannelData(0)
		let lastOut = 0.0
		for (let i = 0; i < bufferSize; i++) {
			const white = Math.random() * 2 - 1
			output[i] = (lastOut + (0.02 * white)) / 1.02
			lastOut = output[i]
			// output[i] *= 3.5 // (roughly) compensate for gain
		}
		newSource.buffer = noiseBuffer

		newSource.loop = true
		newSource.connect(newGainNode)
		newGainNode.connect(newAudioContext.destination)

		newGainNode.gain.value = 0

		// // fade in
		// const now = newAudioContext.currentTime;
		// newSource.start(now);
		// newGainNode.gain.setValueAtTime(0, now);
		// newGainNode.gain.linearRampToValueAtTime(1, now + 1);

		newSource.start()

		return () => {
			newSource.stop()
			newSource.disconnect()
			newGainNode.disconnect()
			newAudioContext.close()
		}
	}, [])



	const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!audioContext) return
		audioContext.resume()

		const newVolume = parseFloat(event.target.value)
		setVolume(newVolume)
		setCachedVolume(newVolume)
		setIsMuted(false)
	}

	const handleMute = () => {
		if (!audioContext) return

		if (isMuted) {
			setVolume(cachedVolume)
			setIsMuted(false)
			return
		}
		setVolume(0)
		setIsMuted(!isMuted)
	}

	const volumeTextOpacity = () => {
		if (volume <= 0) return 0.5
		return 1
	}

	const volumeText = () => {
		return Math.round((volume - 0) * (100 - 0) / (.3 - 0) + 0);
	}

	useEffect(() => {
		gainNode?.gain.setValueAtTime(volume, audioContext?.currentTime as number)
	}, [volume, gainNode])

	return (
		<Widget title="Brown Noise Generator" minWidth={300} defaultPosition={{ x: 70, y: 10 }}>
			<div className="flex p-4 items-center gap-3 ">
				<UniverseVolumeButton onToggleMute={handleMute} volume={volume} isMuted={isMuted} />
				<input
					className="form-range appearance-none dark:accent-teal-300 accent-teal-800 w-full h-[2px] rounded-md focus:outline-none bg-sv-black dark:bg-sv-white focus:ring-0 focus:shadow-none "
					type="range"
					min="0"
					max=".3"
					step="0.001"
					value={volume}
					onChange={handleVolumeChange}
				/>
				{
					isMuted === false ?
						<p
							className="dark:text-sv-white text-sv-black w-8 text-right"
							style={{
								opacity: volumeTextOpacity()
							}}
						>
							{volumeText()}
						</p> :
						<p className="text-red-500 w-8 text-right">
							M
						</p>
				}
			</div>
		</Widget>
	)
}

export default BrownNoiseGenerator
