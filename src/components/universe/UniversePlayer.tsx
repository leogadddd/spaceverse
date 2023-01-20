import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit"
import YouTube, { YouTubeProps } from "react-youtube"
import { creators } from "../../lib";
import { UniverseState } from "../../util/interfaces/state/universeState";

const UniversePlayer = () => {

	const dispatch = useDispatch()
	const { setUniverseLoading } = bindActionCreators(creators, dispatch)
	const universeState: UniverseState = useSelector((state: any) => state.universe)

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
			origin: window.location.origin,
			playlist: universeState.sourceUrlValue
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
				setUniverseLoading(false)
				break
			case 2:
				console.log('video is playing')
				break
		}
	}
	
	// reset target when sourceUrlValue changes

	// volume controls
	useEffect(() => {
		if(!target) return

		if(universeState.volume === 0 || universeState.isMuted) {
			target.mute()
		} else {
			target.unMute()
		}

		setVolume(universeState.volume)
	}, [target, universeState.volume, universeState.isMuted])

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
