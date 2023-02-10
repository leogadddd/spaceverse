import { useState, FC, useContext } from "react"
import Widget from "../../widgetContainer"
import { ImVolumeMute2, ImVolumeHigh, ImVolumeMedium, ImVolumeLow } from "react-icons/im"
import { UniverseFavoriteButtonProps, UniverseShareButtonProps, UniverseVolumeButtonProps } from "./universeControlsProps"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit"
import { creators } from "../../../../lib"
import { UniverseState } from "../../../../util/interfaces/state/universeState";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import useUniverseManager from "../../../../util/hooks/useUniverseManager";
import { UniverseContext } from "../../../../util/context/universeContext";
import { BsShareFill } from "react-icons/bs"
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md"
import { MdArrowRightAlt } from "react-icons/md"


export const UniverseControlsDynamic = () => {

	const universeState: UniverseState = useSelector((state: any) => state.universe)

	return (
		<Widget title="Universe" minWidth={350} maxWidth={360} defaultPosition={{ x: 10, y: 60 }}>
			<div>
				<UniversePickerControl {...universeState} />
				{/* <UniverseCategoryPicker {...universeState} /> */}
				<UniverseInformation {...universeState} />
				<UniverseVolumeControl {...universeState} />
			</div>
		</Widget>
	)
}

export const UniverseInformation = (universeState: UniverseState) => {

	const dispatch = useDispatch()
	const { setUniverseFavorite } = bindActionCreators(creators, dispatch)

	const toggleFavorite = () => {
		setUniverseFavorite(!universeState.isFavorite)
	}

	const shareUniverse = () => {
		// TODO: share universe

		// get current url
		const currentUrl = window.location.href
		// const url = `https://soundverse.app/universe/${universeState.id}`
		navigator.clipboard.writeText(currentUrl)
	}

	return (
		<div className="px-5 mb-0 flex-1 flex items-center gap-2">
			<div className="flex flex-col justify-evenly items-start gap-2">
				<p className="text-sv-black dark:text-sv-white overflow-ellipsis font-semibold">
					{universeState.title || "loading..."}
				</p>
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
		<button className='flex justify-center items-center w-7' onClick={onShare}>
			<BsShareFill className="dark:text-sv-white text-sv-black" />
		</button>
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

export const UniversePickerControl = (universeState: UniverseState) => {

	const [next, prev] = useUniverseManager()

	return (
		<div className="px-5 py-4 flex items-center justify-center gap-3">
			<button className='h-[40px] flex justify-center items-center gap-1 ring-1 dark:ring-sv-light35 ring-sv-dark35 corners flex-1 hover:dark:bg-sv-light10 hover:bg-sv-dark10 active:dark:opacity-50 active:opacity-50 transition-all' onClick={prev}>
				<BiChevronLeft size={25} className="dark:text-sv-white text-sv-black" />
				<h1 className="dark:text-sv-white text-sv-black">Previous</h1>
			</button>
			<button className='h-[40px] flex justify-center items-center gap-1 ring-1 dark:ring-sv-light35 ring-sv-dark35 corners flex-1 hover:dark:bg-sv-light10 hover:bg-sv-dark10 active:dark:opacity-50 active:opacity-50 transition-all' onClick={next}>
				<h1 className="dark:text-sv-white text-sv-black">Next</h1>
				<BiChevronRight size={25} className="dark:text-sv-white text-sv-black" />
			</button>
		</div>
	)

}

export const UniverseCategoryPicker = (universeState: UniverseState) => {

	return (
		<div className="px-5 flex items-center justify-center">
			<div className="ring-1 dark:ring-sv-light35 ring-sv-dark35 corners flex-1 h-[200px] relative flex overflow-hidden" >

			</div>
		</div>
	)
}

export const UniverseVolumeControl = (universeState: UniverseState) => {

	const dispatch = useDispatch()
	const { setUniverseVolume, setUniverseMute } = bindActionCreators(creators, dispatch)
	const universeContext = useContext(UniverseContext)

	const [volume, setVolume] = useState<number>(
		(!universeState.isMuted && universeState.volume) || (!universeContext.ctx.universeMute && universeContext.ctx.universeVolume) || 0
	)
	const [isMuted, setIsMuted] = useState<boolean>(universeState.isMuted || universeContext.ctx.universeMute || false)

	const changeVolume = (e: any) => {
		if (isMuted === true) toggleMute()
		setVolume(Math.round(e.target.value))
		setUniverseVolume(Math.round(e.target.value))
		universeContext.setCtx({
			...universeContext.ctx,
			universeVolume: Math.round(e.target.value),
			universeMute: false
		})
	}

	const toggleMute = () => {
		setIsMuted(!isMuted)
		setUniverseMute(!isMuted)
		universeContext.setCtx({
			...universeContext.ctx,
			universeMute: !isMuted
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
				className='form-range appearance-none dark:accent-teal-300 accent-teal-800 w-full h-[2px] rounded-md p-0 focus:outline-none bg-sv-black dark:bg-sv-white focus:ring-0 focus:shadow-none '
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
				<p className="text-red-500 w-8 text-right">
					M
				</p>}

		</div>
	)
}

export const UniverseVolumeButton: FC<UniverseVolumeButtonProps> = (props) => {

	const { volume, onToggleMute } = props

	const getIcon = () => {
		if (props.isMuted) return <ImVolumeMute2 size={20} className="text-red-500" />

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