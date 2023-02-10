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
			playlist: universeState.sourceUrlValue
		}
	}

	const onPlay: YouTubeProps["onPlay"] = (e) => {
		setUniverseLoading(false)
	}

	const onReady: YouTubeProps["onReady"] = (e) => {
		setTarget(e.target)
		e.target.playVideo()
		if (universeState.startTime != null && universeState.startTime > 0)
			e.target.seekTo(universeState.startTime)
		e.target.setVolume(universeState.volume)
	}

	const onError: YouTubeProps["onError"] = (e) => {
		// console.error(e)
	}

	const onStateChange: YouTubeProps["onStateChange"] = (e) => {
		if (e.data === 1) {
			// console.log('playing')
			setUniverseLoading(false)
		}

		if (e.data === 0) {
			// console.log('paused')
		}

		if (e.data === -1) {
			// console.log('video is unstarted')
			e.target.playVideo()
		}

		if (e.data === 2) {
			// console.log('video is playing')
		}
	}

	// reset target when sourceUrlValue changes
	useEffect(() => {
		target?.destroy()
		setTarget(null)
		setUniverseLoading(true)
	}, [universeState.id])

	// volume controls
	useEffect(() => {
		if (!target) return

		try {
			if (universeState.isMuted) {
				target.setVolume(0)
			} else {
				target.setVolume(universeState.volume)
			}
		} catch (error) {
			// this is a known issue with the YouTube API
			// volume can't be set because target is null
			// console.error("Error setting volume", error)
		}


		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [target, universeState.volume, universeState.isMuted])

	if(!universeState.sourceUrlValue) return null

	return (
		<div className="absolute w-screen h-screen pb-0 lg:pb-[56.25%] video-background z-0">
			<YouTube
				key={universeState.sourceUrlValue}
				videoId={universeState.sourceUrlValue}
				opts={opts}
				className={'video-background'}
				id={'Youtube-Video-Background'}
				iframeClassName={"pointer-events-none absolute top-0 left-0 bottom-0 right-0 z-0"}
				onPlay={onPlay}
				onReady={onReady}
				onStateChange={onStateChange}
				onError={onError}
			/>
		</div>
	)
}

export default UniversePlayer
