import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit"
import YouTube, { YouTubeProps } from "react-youtube"
import { creators, store } from "../../lib";
import { UniverseState } from "../../util/interfaces/state/universeState";
import { generateKey } from "../../util/idGenerators";
import useUniverseManager from "../../util/hooks/useUniverseManager";

const UniversePlayer = () => {

	const dispatch = useDispatch()
	const { setUniverseLoading } = bindActionCreators(creators, dispatch)
	const { NextUniverse } = useUniverseManager()
	const universeState: UniverseState = useSelector((state: any) => state.universe)
	const universeManagerState: UniverseState["manager"] = useSelector((state: any) => state.universe.manager)

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [target, setTarget] = useState<any>(null)
	const [key, setKey] = useState<string>("")

	const opts = {
		height: "100%",
		width: "100%",
		host: "https://www.youtube-nocookie.com",
		playerVars: {
			mute: 0,
			autoplay: 1,
			controls: 0,
			loop: universeManagerState?.settings?.autoNext ? 0 : 1,
			rel: 0,
			modestBranding: 1,
			iv_load_policy: 3,
			showinfo: 0,
			fs: 0,
			playlist: universeState.sourceUrlValue,
			origin: window.location.origin,
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
			if (!isPlaying && universeState.startTime != null && universeState.startTime > 0)
				e.target.seekTo(universeState.startTime)

			setUniverseLoading(false)
			setIsPlaying(true)
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

	const onEnd: YouTubeProps["onEnd"] = (e) => {
		if(universeManagerState?.settings?.autoNext)
			NextUniverse()
	}

	useEffect(() => {
		setKey(`universe-${generateKey()}`)
	}, [])

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

	// make sure video is playing when the sourceUrlValue changes
	// this is a workaround for a bug in the bug that i can't figure out
	useEffect(() => {
		if (!universeState.isLoading) return

		const tout = setTimeout(() => {
			const universeState: UniverseState = store.getState().universe

			if (!universeState.isLoading) return

			console.log("UniversePlayer: timeout reached, resetting player")

			setKey(`universe-${generateKey()}`)
		}, 3000)

		return () => {
			clearTimeout(tout)
		}
	}, [universeState.isLoading, universeState.sourceUrlValue])

	if (!universeState.sourceUrlValue) return null

	return (
		<div key={key} className="absolute w-screen h-screen pb-0 lg:pb-[56.25%] video-background z-0">
			<YouTube
				key={universeState.sourceUrlValue}
				videoId={universeState.sourceUrlValue}
				opts={opts}
				className={'video-background'}
				id={'Youtube-Video-Background'}
				iframeClassName={"pointer-events-none absolute top-0 left-0 bottom-0 right-0 z-0"}
				onPlay={onPlay}
				onReady={onReady}
				onEnd={onEnd}
				onStateChange={onStateChange}
				onError={onError}
			/>
		</div>
	)
}


//document.getElementById("Youtube-Video-Background").contentDocument.querySelectorAll(".ytp-ce-element").forEach((el) => el.remove());
export default UniversePlayer
