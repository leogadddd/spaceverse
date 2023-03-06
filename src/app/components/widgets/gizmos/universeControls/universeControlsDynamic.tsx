import { useState, FC, useContext, useEffect } from "react"
import Widget from "../../widgetContainer"
import { ImVolumeMute2, ImVolumeHigh, ImVolumeMedium, ImVolumeLow } from "react-icons/im"
import { UniverseCategoryPickerProps, UniverseFavoriteButtonProps, UniversePickerProps, UniverseShareButtonProps, UniverseVolumeButtonProps } from "./universeControlsProps"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit"
import { creators } from "../../../../lib"
import { UniverseState } from "../../../../util/interfaces/state/universeState";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { UniverseContext } from "../../../../util/context/universeContext";
import { BsShareFill } from "react-icons/bs"
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md"
import { MdArrowRightAlt } from "react-icons/md"
import useUniverseManager from "../../../../util/hooks/useUniverseManager";
import { BsGrid1X2 } from "react-icons/bs"
import { MdOutlinePanoramaPhotosphere } from "react-icons/md"
import DividerComponent from "../../../divider";
import { WidgetSettingsTemplateProps } from "../../widgetsComponentProps";
import { ToggleComponent } from "../../../menu/menuItems/SettingsWindow/settingsField";
import { NotificationActionType, NotificationType } from "../../../notification/notificationComponentProps";
import { INotificationCreate } from "../../../../util/interfaces";
import { motion } from "framer-motion";
import { NotificationActionTypes } from "../../../../util/enums";

export const UniverseControlsDynamic = () => {

	const universeState: UniverseState = useSelector((state: any) => state.universe)
	const { NextUniverse, PreviousUniverse, PickCategory, categories } = useUniverseManager()

	return (
		<Widget
			title="Universe"
			label="Verse"
			icon={MdOutlinePanoramaPhotosphere}
			minWidth={350}
			maxWidth={360}
			defaultPosition={{ x: 10, y: 60 }}
			settings={UniverseSettings}
			defaultActive
		>
			<div>
				<UniverseCategoryPicker
					categories={categories}
					PickCategory={PickCategory}
				/>
				<UniversePickerControl
					NextUniverse={NextUniverse}
					PreviousUniverse={PreviousUniverse}
				/>
				<UniverseInformation {...universeState} />
				<UniverseVolumeControl {...universeState} />
			</div>
		</Widget>
	)
}

export const UniverseSettings: FC<WidgetSettingsTemplateProps> = (props) => {

	const { settingsSave, widgetId, settingsSaveDisabled, setSettingsSaveDisabled } = props

	const dispatch = useDispatch()
	const {
		addNotification
	} = bindActionCreators(creators, dispatch)
	const { SetAutoNextUniverse } = useUniverseManager()
	const universeManagerState: UniverseState["manager"] = useSelector((state: any) => state.universe.manager)

	const [autoNextUniverse, setAutoNextUniverse] = useState(
		universeManagerState?.settings?.autoNext || false
	)

	const handleChange = () => {
		setAutoNextUniverse(!autoNextUniverse)
	}

	const handleSave = () => {
		SetAutoNextUniverse(autoNextUniverse)
		settingsSave()

		const notification: INotificationCreate = {
			from: "Universe",
			message: "Settings saved.",
			type: NotificationType.Success,
		}

		addNotification(notification)
	}

	useEffect(() => {
		setSettingsSaveDisabled(false)

		if (universeManagerState?.settings?.autoNext !== autoNextUniverse) setSettingsSaveDisabled(true)
	}, [autoNextUniverse])



	return (
		<div>
			<DividerComponent />
			<div className="flex flex-col gap-[3px] px-5 py-3">
				<div className="flex flex-col gap-6 pb-1">
					<div>
						<div className="flex justify-between items-center pb-2">
							<h1 className="text-md text-sv-black dark:text-sv-white font-semibold">
								Auto-Next Universe
							</h1>
							<ToggleComponent
								name="autoNextUniverse"
								checked={autoNextUniverse}
								onChange={handleChange}
							/>
						</div>
						<div>
							<p className="text-sm text-sv-black dark:text-sv-white opacity-50">
								Automatically play the next universe in the category when the current one ends. (will restart the current universe)
							</p>
						</div>
					</div>
					{
						settingsSaveDisabled && (
							<div className="flex gap-2 justify-between py-3 pb-0 pt-4">

								<button onClick={handleSave} className="transition-all brightness-90 hover:brightness-110 bg-sv-accent dark:bg-sv-accent flex-1 corners py-2">
									<h1 className="text-sm text-sv-black font-semibold">
										Save
									</h1>
								</button>

							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}

export const UniverseInformation = (universeState: UniverseState) => {

	const dispatch = useDispatch()
	const { setUniverseFavorite, addNotification } = bindActionCreators(creators, dispatch)
	const universeManagerState: UniverseState["manager"] = useSelector((state: any) => state.universe.manager)

	const toggleFavorite = () => {
		setUniverseFavorite(!universeState.isFavorite)
	}

	const shareUniverse = () => {

		const currentUrl = window.location.href

		// add univ id to url as search param
		const url = new URL(currentUrl)
		url.searchParams.set("univ", universeState.id!)

		// copy to clipboard
		navigator.clipboard.writeText(url.toString())

		const openInNewTab = (url: string) => {
			const newWindow = window.open(url, "_blank", "noopener,noreferrer")
			if (newWindow) newWindow.opener = null
		}

		const notification: INotificationCreate = {
			from: "Universe",
			message: "Copied universe link to clipboard.",
			type: NotificationType.Success,
			actions: [
				{
					label: "Open",
					callback: () => openInNewTab(url.toString()),
					type: NotificationActionType.OnClick
				}
			]
		}

		addNotification(notification)
	}

	const title = () => {
		if (!universeState.title) return "loading..."

		// make every word capitalized
		const words = universeState!.title.split(" ")
		const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		return capitalizedWords.join(" ")
	}

	return (
		<div className="px-5 mb-0 flex-1 flex items-center gap-2">
			<div className="flex-1 flex flex-col justify-evenly items-start gap-2">
				<div className="flex flex-col">
					<p className="text-sv-black dark:text-sv-white overflow-ellipsis font-semibold pt-1">
						{title()}
					</p>
					<p className="opacity-75 flex items-center text-sm text-sv-black dark:text-sv-white overflow-ellipsis font-koulen">
						<span className="mb-[2px]">@</span>
						<span>
							{universeState.contributer || "loading..."}
						</span>
					</p>
					{/* <p className="opacity-50 flex items-center gap-1 text-sm text-sv-black dark:text-sv-white overflow-ellipsis">
						{universeManagerState.pickedCategory?.title || "loading..."}
					</p> */}
				</div>
				<a href={universeState.sourceLink || ""} target={"_blank"} rel="noreferrer" className="pointer-events-auto opacity-50 hover:opacity-100 transition-opacity hover:underline flex items-center gap-1">
					<p className="text-sm text-sv-black dark:text-sv-white overflow-ellipsis">
						{universeState.sourceType || "loading..."}
					</p>
					<MdArrowRightAlt className="dark:text-sv-white text-sv-black" />
				</a>
			</div>
			<div className="flex flex-row justify-end">
				{/* <FavoriteButton isFavorite={universeState.isFavorite || false} onToggleFavorite={toggleFavorite} /> */}
				<ShareButton onShare={shareUniverse} />
			</div>
		</div>
	)
}

export const ShareButton: FC<UniverseShareButtonProps> = (props) => {

	const { onShare } = props

	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			className='flex justify-center items-center w-7' onClick={onShare}
		>
			<BsShareFill className="dark:text-sv-white text-sv-black" />
		</motion.button>
	)
}

export const FavoriteButton: FC<UniverseFavoriteButtonProps> = (props) => {

	const { isFavorite, onToggleFavorite } = props

	return (
		<button className='flex justify-center items-center w-7' onClick={onToggleFavorite}>
			{
				isFavorite ? <MdOutlineFavorite size={20} className="dark:text-sv-white text-sv-black" /> : <MdOutlineFavoriteBorder size={20} className="dark:text-sv-white text-sv-black" />
			}
		</button>
	)
}

export const UniversePickerControl: FC<UniversePickerProps> = (props) => {

	const { NextUniverse, PreviousUniverse } = props

	return (
		<div className="px-5 py-4 pt-3 flex items-center justify-center gap-3">
			<button className='h-[40px] flex justify-center items-center gap-2 ring-1 dark:ring-sv-input-dark ring-sv-input-light dark:bg-sv-input-dark bg-sv-input-light corners flex-1 hover:brightness-110 active:dark:opacity-50 active:opacity-50 transition-all' onClick={PreviousUniverse}>
				<BiChevronLeft size={25} className="dark:text-sv-white text-sv-black" />
				<h1 className="dark:text-sv-white text-sv-black mt-[2px]">Previous</h1>
			</button>
			<button className='h-[40px] flex justify-center items-center gap-2 ring-1 dark:ring-sv-input-dark ring-sv-input-light dark:bg-sv-input-dark bg-sv-input-light corners flex-1 hover:brightness-110 active:dark:opacity-50 active:opacity-50 transition-all' onClick={NextUniverse}>
				<h1 className="dark:text-sv-white text-sv-black mt-[2px]">Next</h1>
				<BiChevronRight size={25} className="dark:text-sv-white text-sv-black" />
			</button>
		</div>
	)
}

export const UniverseCategoryPicker: FC<UniverseCategoryPickerProps> = (props) => {

	const { PickCategory, categories } = props
	const universeManagerState: UniverseState["manager"] = useSelector((state: any) => state.universe.manager)

	return (
		<div className="px-5 pt-4 flex items-center justify-center">
			<select
				className="ring-1 dark:ring-sv-input-dark ring-sv-input-light dark:bg-sv-input-dark bg-sv-input-light hover:brightness-110 active:dark:opacity-50 active:opacity-50 transition-all cursor-pointer corners flex-1 h-[40px] relative flex overflow-hidden overflow-y-auto dark:text-sv-white text-sv-black px-4"
				onChange={(e) => PickCategory(parseInt(e.target.value))}
				value={universeManagerState?.categoryIndex || ""}
			>
				{
					categories.map((category, index) => {
						return (
							<option key={index} className="text-sv-black" value={index}>{category.title}</option>
						)
					})
				}
			</select>
		</div>
	)
}

export const UniverseVolumeControl = (universeState: UniverseState) => {

	const dispatch = useDispatch()
	const { setUniverseVolume, setUniverseMute } = bindActionCreators(creators, dispatch)
	const universeContext = useContext(UniverseContext)

	const [volume, setVolume] = useState<number>(
		(!universeState.isMuted && universeState.volume) || (!universeContext.ctx?.universeIsMuted && universeContext.ctx?.universeCurrentVolume) || 0
	)
	const [isMuted, setIsMuted] = useState<boolean>(universeState.isMuted || universeContext.ctx?.universeIsMuted || false)

	const changeVolume = (e: any) => {
		if (isMuted === true) toggleMute()
		setVolume(Math.round(e.target.value))
		setUniverseVolume(Math.round(e.target.value))
		universeContext.setCtx({
			...universeContext.ctx,
			universeCurrentVolume: Math.round(e.target.value),
			universeIsMuted: false
		})
	}

	const toggleMute = () => {
		setIsMuted(!isMuted)
		setUniverseMute(!isMuted)
		universeContext.setCtx({
			...universeContext.ctx,
			universeIsMuted: !isMuted
		})

		if (isMuted === true) {
			setVolume(universeState.volume)
		} else {
			setVolume(0)
		}
	}

	const volumeTextOpacity = () => {
		if (volume <= 0) return 0.5
		return 1
	}

	return (
		<div className="px-5 py-4 flex items-center gap-2">
			<UniverseVolumeButton volume={volume} isMuted={isMuted} onToggleMute={toggleMute} />
			<input
				type="range"
				name="volume"
				id="volume"
				min="0"
				max="100"
				className='form-range appearance-none dark:accent-sv-accent accent-sv-accent w-full h-[2px] rounded-md p-0 focus:outline-none bg-sv-black dark:bg-sv-white focus:ring-0 focus:shadow-none '
				onChange={changeVolume}
				value={volume}
			/>
			{isMuted === false ?
				<p
					className="dark:text-sv-white text-sv-black w-8 text-right"
					style={{
						opacity: volumeTextOpacity()
					}}
				>
					{volume}
				</p> :
				<p className="text-sv-pomodoro-red w-8 text-right font-semibold">
					M
				</p>}

		</div>
	)
}

export const UniverseVolumeButton: FC<UniverseVolumeButtonProps> = (props) => {

	const { volume, onToggleMute } = props

	const getIcon = () => {
		if (props.isMuted) return <ImVolumeMute2 size={20} className="text-sv-pomodoro-red" />

		if (volume === 0) {
			return <ImVolumeMute2 size={20} className="dark:text-sv-white text-sv-black" />
		} else if (volume < 33) {
			return <ImVolumeLow size={20} className="dark:text-sv-white text-sv-black" />
		} else if (volume < 66) {
			return <ImVolumeMedium size={20} className="dark:text-sv-white text-sv-black" />
		} else {
			return <ImVolumeHigh size={20} className="dark:text-sv-white text-sv-black" />
		}
	}

	return (
		<button className='text-sv-white dark:text-sv-black' onClick={onToggleMute}>
			{getIcon()}
		</button>
	)
}

export default UniverseControlsDynamic