import { bindActionCreators } from "@reduxjs/toolkit"
import { FC, useEffect, useState } from "react"
import { IconType } from "react-icons"
import { MdVolumeOff, MdVolumeUp } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { creators } from "../../../lib"
import { UniverseState } from "../../../util/interfaces"
import { RiFullscreenExitFill, RiFullscreenFill } from "react-icons/ri"
import { ISystemSettingsItemState, SystemSettingsState } from "../../../util/interfaces/state/systemSettinsState"


export const ImmediateToolbar = () => {

	const tools = [
		<MuteButton />,
		<FullScreenButton />
	]

	return (
		<div className="h-full flex gap-2">
			{tools.map((tool, index) => {
				return (
					<div key={index} className="h-full flex items-center">
						{tool}
					</div>
				)
			})}
		</div>
	)
}

export const FullScreenButton = () => {

	const [isFullScreen, setIsFullScreen] = useState(false)

	const toggleFullScreen = () => {
		if (!isFullScreen) {
			document.documentElement.requestFullscreen()
		} else {
			document.exitFullscreen()
		}
		setIsFullScreen(!isFullScreen)
	}

	useEffect(() => {
		document.addEventListener("fullscreenchange", () => {
			setIsFullScreen(document.fullscreenElement !== null)
		})
	}, [])


	return (
		<ToolItem
			icon={isFullScreen ? RiFullscreenExitFill : RiFullscreenFill}
			callback={toggleFullScreen}
		/>
	)
}

export const MuteButton = () => {

	const id = "immediateToolbarMuteButton"
	const dispatch = useDispatch()
	const {
		setUniverseMute,
		subscribeSystemSettings,
		updateSystemSettings
	} = bindActionCreators(creators, dispatch)
	const [isMuted, setIsMuted] = useState(false)
	const universeState: UniverseState = useSelector((state: any) => state.universe)
	const systemSettings: ISystemSettingsItemState = useSelector((state: any) => {
		const list = state.systemSettings.systemSettings
		return list.find((item: any) => item.id === id)
	})

	const toggleMute = () => {
		setUniverseMute(!isMuted)
		setIsMuted(!isMuted)
		updateSystemSettings({
			id: id,
			value: !isMuted
		})
	}

	useEffect(() => {
		subscribeSystemSettings({
			id: id,
			value: isMuted
		})
	}, [])

	useEffect(() => {
		if(!universeState.isMuted) {
			setIsMuted(universeState.isMuted!)
			updateSystemSettings({
				id: id,
				value: universeState.isMuted!
			})
		}
	}, [universeState.isMuted])

	useEffect(() => {
		if (systemSettings) {
			setIsMuted(systemSettings.value)
		}
	}, [systemSettings])

	return (
		<ToolItem
			icon={isMuted ? MdVolumeOff : MdVolumeUp}
			callback={toggleMute}
		/>
	)
}


interface ToolItemProps {
	icon: IconType
	callback: () => void
}

export const ToolItem: FC<ToolItemProps> = (props) => {

	const { icon: Icon, callback } = props

	return (
		<button onClick={callback} className="shadow-lg corners dark:bg-sv-dark bg-sv-light pointer-events-auto w-[40px] h-[40px] flex justify-center items-center">
			{Icon && <Icon size={20} className="dark:text-sv-white text-sv-black" />}
		</button>
	)
}

export default ImmediateToolbar