import React, { useState } from "react";
import { createPortal } from "react-dom";
import YouTube, { YouTubeProps } from "react-youtube"

const UniversePlayer = () => {

	const [volume, setVolume] = useState(0)
	const [target, setTarget] = useState<any>(null)

	const opts = {
		height: "100%",
		width: "100%",
		playerVars: {
			mute: 0,
			autoplay: 1,
			controls: 0,
			loop: 1,
			rel: 0,
			modestBrand: 1,
			fs: 0,
			origin: window.location.origin
		}
	}

	const onError: YouTubeProps["onError"] = (e) => {
		console.error(e)
	}

	const onStateChange: YouTubeProps["onStateChange"] = (e) => {
		switch (e.data) {
			case -1:
				console.log("video is unstarted")
				e.target.playVideo()
				
				break
			case 0:
				console.log("paused")
				break
			case 1:
				console.log("playing")
				e.target.setVolume(volume)
				break
			case 2:
				console.log('video is playing')
				break
		}
	}

	return (
		<div className="absolute w-screen h-screen pb-0 lg:pb-[56.25%] video-background z-0">
			<YouTube
				videoId="wGdodz6ck7g"
				opts={opts}
				className={'video-background'}
				id={'Youtube-Video-Background'}
				iframeClassName={"pointer-events-none absolute top-0 left-0 bottom-0 right-0 z-0"}
				onReady={e => setTarget(e.target)}
				onStateChange={onStateChange}
				onError={onError}
			/>
		</div>
	)
}

export default UniversePlayer
