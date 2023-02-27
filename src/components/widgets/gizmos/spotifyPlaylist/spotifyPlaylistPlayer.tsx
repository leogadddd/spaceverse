import { FC, useContext, useEffect, useRef, useState } from "react"
import { SpotifyPlaylistContext } from "../../../../util/context/spotifyPlaylistContext"
import { getPlaylistIdFromUrl } from "../../../../util/urlParser"
import Widget from "../../widgetContainer"
import { FaTrashAlt } from "react-icons/fa"
import { TrashButtonProps } from "./spotifyPlaylistPlayerProps"
import { SlSocialSpotify } from "react-icons/sl"
import { SpotifyType } from "../../../../util/enums/spotifyType"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import { creators } from "../../../../lib"
import { INotificationCreate } from "../../../../util/interfaces"
import { NotificationType } from "../../../notification/notificationComponentProps"


export const SpotifyPlaylistPlayer = () => {

	const dispatch = useDispatch()
	const {
		addNotification
	} = bindActionCreators(creators, dispatch)

	const spotifyPlaylistContext = useContext(SpotifyPlaylistContext)
	const spotifyIframeRef = useRef<HTMLIFrameElement>(null)
	const defaultPlaylist = [
		{
			name: "Spaceverse",
			url: "https://open.spotify.com/playlist/3D6QaorzhJcUkKTgc8PSbd?si=c0682ac797124b46",
			type: SpotifyType.playlist,
			urlId: "3D6QaorzhJcUkKTgc8PSbd",
		}
	]

	const mixedPlaylist = [
		...defaultPlaylist,
		...spotifyPlaylistContext?.ctx.playlist
	]


	const [spotifyPlaylistIndex, setSpotifyPlaylistIndex] = useState(
		mixedPlaylist.length > 1
			? spotifyPlaylistContext?.ctx.playlistIndex
			: 0
	)
	const [spotifyUrl, setSpotifyUrl] = useState(
		spotifyPlaylistContext?.ctx.playlist.length > 0
			? getPlaylistIdFromUrl(mixedPlaylist[spotifyPlaylistIndex].urlId)
			: mixedPlaylist[0].urlId
	)
	const [spotifyType, setSpotifyType] = useState(
		spotifyPlaylistContext?.ctx.playlist.length > 0
			? mixedPlaylist[spotifyPlaylistIndex].type
			: SpotifyType.playlist
	)

	const [spotifyName, setSpotifyName] = useState("")
	const [spotifyUrlInput, setSpotifyUrlInput] = useState("")
	const [spotifyTypeInput, setSpotifyTypeInput] = useState(SpotifyType.playlist)
	const [spotifyUrlInputError, setSpotifyUrlInputError] = useState(true)
	const [spotifyNameInputError, setSpotifyNameInputError] = useState(true)

	const isSpotifyUrl = (url: string): boolean => {
		const playlistRegex = /^https?:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?.*)?$/;
		const albumRegex = /^https?:\/\/open\.spotify\.com\/album\/[a-zA-Z0-9]+(\?.*)?$/;
		const trackRegex = /^https?:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+(\?.*)?$/;

		return playlistRegex.test(url) || albumRegex.test(url) || trackRegex.test(url);
	}

	const getSpotifyType = (url: string) => {
		const regex = new RegExp(/^(https:\/\/open\.spotify\.com\/(playlist|album|track)\/)([a-zA-Z0-9]+)(\?si=[a-zA-Z0-9]+)?$/)
		const match = regex.exec(url)

		if (match) {
			switch (match[2]) {
				case "playlist":
					return SpotifyType.playlist
				case "album":
					return SpotifyType.album
				case "track":
					return SpotifyType.track
				default:
					return SpotifyType.playlist
			}
		} else {
			return SpotifyType.playlist
		}
	}

	const handleSaveSpotifyUrl = async () => {
		if (isSpotifyUrl(spotifyUrlInput) && spotifyName.length > 0) {
			setSpotifyUrlInputError(true)
			setSpotifyNameInputError(true)
			setSpotifyUrlInput("")
			setSpotifyName("")


			spotifyPlaylistContext?.setCtx({
				...spotifyPlaylistContext.ctx,
				playlist: [...spotifyPlaylistContext.ctx.playlist, {
					name: spotifyName,
					url: spotifyUrlInput,
					urlId: getPlaylistIdFromUrl(spotifyUrlInput),
					type: getSpotifyType(spotifyUrlInput)
				}],
				playlistIndex: spotifyPlaylistContext.ctx.playlist.length
			})

			setSpotifyUrl(getPlaylistIdFromUrl(spotifyUrlInput))
			setSpotifyPlaylistIndex(spotifyPlaylistContext?.ctx.playlist.length)
			setSpotifyType(getSpotifyType(spotifyUrlInput))

			const notification: INotificationCreate = {
				from: "Music",
				message: `Added "${spotifyName}" to your playlist.`,
				type: NotificationType.Success,
			}

			addNotification(notification)

		} else {
			setSpotifyUrlInputError(true)
			setSpotifyNameInputError(true)
		}
	}

	const handleSpotifyUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSpotifyUrlInput(e.target.value)
		setSpotifyTypeInput(getSpotifyType(e.target.value))

		const isSpotifyUrlResult = isSpotifyUrl(e.target.value)

		console.log("isSpotifyUrl", isSpotifyUrlResult)

		if (isSpotifyUrlResult) {
			setSpotifyUrlInputError(false)
		} else {
			setSpotifyUrlInputError(true)
		}
	}

	const handleSpotifyNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSpotifyName(e.target.value)

		if (e.target.value.length > 0) {
			setSpotifyNameInputError(false)
		} else {
			setSpotifyNameInputError(true)
		}
	}

	const handleSpotifyPlaylistPicker = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSpotifyUrl(e.target.value)
		setSpotifyPlaylistIndex(e.target.selectedIndex)
		setSpotifyType(mixedPlaylist[e.target.selectedIndex].type)

		spotifyPlaylistContext?.setCtx({
			...spotifyPlaylistContext.ctx,
			playlistIndex: e.target.selectedIndex
		})
	}

	const handleDeleteSpotifyPlaylist = () => {
		spotifyPlaylistContext?.setCtx({
			...spotifyPlaylistContext.ctx,
			playlist: spotifyPlaylistContext.ctx.playlist.filter((playlist: any, index: number) => {
				return index !== spotifyPlaylistIndex - defaultPlaylist.length
			}),
			playlistIndex: mixedPlaylist.length > 1 ? mixedPlaylist.length - 2 : 0
		})

		setSpotifyPlaylistIndex(mixedPlaylist.length > 1 ? mixedPlaylist.length - 2 : 0)
		setSpotifyUrl(mixedPlaylist.length > 1 ? mixedPlaylist[mixedPlaylist.length - 2].urlId : mixedPlaylist[0].urlId)
		setSpotifyType(mixedPlaylist.length > 1 ? mixedPlaylist[mixedPlaylist.length - 2].type : SpotifyType.playlist)

		const notification: INotificationCreate = {
			from: "Music",
			message: `Removed "${mixedPlaylist[spotifyPlaylistIndex - defaultPlaylist.length].name}" from your playlist.`,
			type: NotificationType.Success,
		}

		addNotification(notification)
	}

	return (
		<Widget title="Music" label="Music" icon={SlSocialSpotify} minWidth={400} alwaysOpen defaultPosition={{ x: 30, y: 20 }}>
			<div className="p-1 py-2 pb-1 flex justify-between items-center gap-2">
				<select
					className="h-[35px] px-3 flex-1 corners w-full bg-sv-input-light dark:bg-sv-input-dark text-sm text-sv-black dark:text-sv-white"
					name="SpotifyPlaylistPicker"
					id="SpotifyPlaylistPicker"
					onChange={handleSpotifyPlaylistPicker}
					value={spotifyUrl}
				>
					{
						mixedPlaylist.map((playlist: any, index: number) => {
							return (
								<option
									className="text-sv-black"
									key={index}
									value={playlist.urlId}>
									{playlist.name} {playlist.type === SpotifyType.playlist && (playlist.type)}
								</option>
							)
						})
					}
				</select>
				{
					spotifyPlaylistIndex > defaultPlaylist.length - 1 &&
					<TrashButton onClick={handleDeleteSpotifyPlaylist} />

				}
			</div>
			<div className="p-1 pt-0">
				<iframe
					key="spotifyPlaylistPlayer"
					title="Spotify Playlist Player"
					id="spotifyPlaylistPlayer"
					ref={spotifyIframeRef}
					src={`https://open.spotify.com/embed/${spotifyType}/${spotifyUrl}?utm_source=oembed&theme=1`}
					width="100%" height={
						spotifyType === SpotifyType.playlist ? "380" : spotifyType === SpotifyType.album ? "380" : "355"
					}
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
				></iframe>
			</div>
			<div>
				<div className="p-1 pt-0 flex justify-between items-center gap-2">
					<input
						className="h-[35px] px-3 flex-1 corners w-full bg-sv-input-light dark:bg-sv-input-dark text-sm text-sv-black dark:text-sv-white"
						type="url"
						placeholder="Enter Spotify Playlist, Album, or Artist URL"
						name="spotifyUrlInput"
						id="spotifyUrlInput"
						value={spotifyUrlInput}
						onChange={handleSpotifyUrlInput}
					/>
				</div>
				{
					!spotifyUrlInputError && (
						<div
							className="p-1 pb-1 flex justify-between items-center gap-2"
						>
							<input
								className="h-[35px] px-3 flex-1 corners w-full bg-sv-input-light dark:bg-sv-input-dark text-sm text-sv-black dark:text-sv-white"
								type="text"
								placeholder={`Enter Spotify ${spotifyTypeInput} Name`}
								name="spotifyNameInput"
								id="spotifyNameInput"
								value={spotifyName}
								onChange={handleSpotifyNameInput}
							/>
							{
								!spotifyNameInputError && (
									<button
										onClick={handleSaveSpotifyUrl}
										className="h-[35px] corners bg-sv-accent dark:bg-sv-accent brightness-90 hover:brightness-110 transition-all p-2 text-sv-black font-semibold px-4"
									>
										Save
									</button>
								)
							}
						</div>
					)
				}
			</div>
		</Widget>
	)
}

export const TrashButton: FC<TrashButtonProps> = (props) => {

	const { onClick } = props

	return (
		<button
			onClick={onClick}
			className="flex justify-center items-center w-7 pb-[3px] hover:opacity-50 transition-opacity"
		>
			<FaTrashAlt size={20} className="dark:text-sv-white text-sv-black" />
		</button>
	)
}

export default SpotifyPlaylistPlayer
