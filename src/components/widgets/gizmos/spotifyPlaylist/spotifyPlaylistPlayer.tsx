import { FC, useContext, useEffect, useState } from "react"
import { SpotifyPlaylistContext } from "../../../../util/context/spotifyPlaylistContext"
import { getPlaylistIdFromUrl } from "../../../../util/urlParser"
import Widget from "../../widgetContainer"
import { FaTrashAlt } from "react-icons/fa"
import { TrashButtonProps } from "./spotifyPlaylistPlayerProps"


export const SpotifyPlaylistPlayer = () => {

	const spotifyPlaylistContext = useContext(SpotifyPlaylistContext)
	const defaultPlaylist = [
		{
			name: "Spaceverse",
			url: "https://open.spotify.com/playlist/3D6QaorzhJcUkKTgc8PSbd?si=c0682ac797124b46",
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
	const [spotifyName, setSpotifyName] = useState("")
	const [spotifyUrlInput, setSpotifyUrlInput] = useState("")
	const [spotifyUrlInputError, setSpotifyUrlInputError] = useState(true)
	const [spotifyNameInputError, setSpotifyNameInputError] = useState(true)

	const checkSpotifyUrl = (url: string) => {
		const regex = new RegExp(/^(https:\/\/open\.spotify\.com\/playlist\/)([a-zA-Z0-9]+)(\?si=[a-zA-Z0-9]+)?$/)
		return regex.test(url)
	}

	const handleSaveSpotifyUrl = async () => {
		if (checkSpotifyUrl(spotifyUrlInput) && spotifyName.length > 0) {
			setSpotifyUrlInputError(true)
			setSpotifyNameInputError(true)
			setSpotifyUrlInput("")
			setSpotifyName("")


			spotifyPlaylistContext?.setCtx({
				...spotifyPlaylistContext.ctx,
				playlist: [...spotifyPlaylistContext.ctx.playlist, {
					name: spotifyName,
					url: spotifyUrlInput,
					urlId: getPlaylistIdFromUrl(spotifyUrlInput)
				}],
				playlistIndex: spotifyPlaylistContext.ctx.playlist.length
			})

			setSpotifyUrl(getPlaylistIdFromUrl(spotifyUrlInput))
			setSpotifyPlaylistIndex(spotifyPlaylistContext?.ctx.playlist.length)
		} else {
			setSpotifyUrlInputError(true)
			setSpotifyNameInputError(true)
		}
	}

	const handleSpotifyUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSpotifyUrlInput(e.target.value)

		if (checkSpotifyUrl(e.target.value)) {
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
	}

	return (
		<Widget title="Music" minWidth={400} alwaysOpen defaultPosition={{ x: 30, y: 20 }}>
			<div className="p-2 py-2 pb-1 flex justify-between items-center gap-2">
				<select
					className="h-[35px] px-3 flex-1 corners w-full bg-sv-dark10 dark:bg-sv-light10 text-sm text-sv-black dark:text-sv-white"
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
									{playlist.name} Playlist
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
			<div className="p-1">
				<iframe
					key="spotifyPlaylistPlayer"
					title="Spotify Playlist Player"
					id="spotifyPlaylistPlayer"
					src={`https://open.spotify.com/embed/playlist/${spotifyUrl}?utm_source=oembed&theme=0`}
					width="100%" height="375"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
				></iframe>
				<div className="p-1 py-2 pb-1 flex justify-between items-center gap-2">
					<input
						className="h-[35px] px-3 flex-1 corners w-full bg-sv-dark10 dark:bg-sv-light10 text-sm text-sv-black dark:text-sv-white"
						type="url"
						placeholder="Enter Spotify Playlist URL"
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
								className="h-[35px] px-3 flex-1 corners w-full bg-sv-dark10 dark:bg-sv-light10 text-sm text-sv-black dark:text-sv-white"
								type="text"
								placeholder="Enter Spotify Playlist Name"
								name="spotifyNameInput"
								id="spotifyNameInput"
								value={spotifyName}
								onChange={handleSpotifyNameInput}
							/>
							{
								!spotifyNameInputError && (
									<button
										onClick={handleSaveSpotifyUrl}
										className="h-[35px] corners bg-teal-500 dark:bg-teal-700 p-2 text-sv-black dark:text-sv-white px-4"
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
