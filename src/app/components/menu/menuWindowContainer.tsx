import { bindActionCreators } from "@reduxjs/toolkit"
import { FC, useEffect } from "react"
import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import { creators } from "../../lib"
import { WindowMenuItemState } from "../../util/interfaces"
import { menuWindowBarProps, menuWindowContainerProps } from "./menuWindowProps"
import { CgClose } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion"
import DividerComponent from "../divider"
import useWindowSize from "../../util/hooks/useWindowSize"

export const MenuWindow: FC<menuWindowContainerProps> = (props) => {

	const { title, minWidth, maxWidth, minHeight, maxHeight, children, isDefaultOpen, hasNewContent } = props

	const [width, height] = useWindowSize()
	const dispatch = useDispatch()
	const {
		subscribeWindowMenu,
		unsubscribeWindowMenu,
		toggleWindowMenuItem
	} = bindActionCreators(creators, dispatch)
	const windowMenuItemState: WindowMenuItemState | undefined = useSelector((state: any) => {
		const menuItems = state.windowMenu.menuItems as WindowMenuItemState[]
		return menuItems.find((item) => item.name === title)
	})

	const toggleWindow = () => {
		toggleWindowMenuItem({
			name: title,
			isOpen: !windowMenuItemState?.isOpen
		})
	}

	useEffect(() => {
		subscribeWindowMenu({
			name: title,
			icon: "",
			isOpen: isDefaultOpen || false,
			data: null,
			hasNewContent: hasNewContent || 0
		})

		return () => { unsubscribeWindowMenu(title) }
	}, [])

	const StyleWidth = width < 768 ? "w-[calc(100%-14px)]" : null

	return createPortal(
		<>
			<AnimatePresence mode="wait">
				{
					windowMenuItemState?.isOpen &&
					<>
						<motion.div
							onClick={toggleWindow}
							initial={{ opacity: 0 }}
							animate={{ opacity: .10 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 bg-white pointer-events-auto"
						>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.05 }}
							className={`${StyleWidth} absolute left-1/2 top-[25%] -translate-x-1/2 shadow-lg bg-sv-light dark:bg-sv-dark pointer-events-auto corners overflow-hidden`}
							style={{
								width: width > 768 ? minWidth : "calc(100%-14px)",
								minWidth: width > 768 ? minWidth : "calc(100%-14px)",
								maxWidth: width > 768 ? maxWidth : "calc(100%-14px)",
								minHeight: minHeight,
								maxHeight: maxHeight
							}}
						>
							<MenuWindowBar title={title} onClose={toggleWindow} />
							{/* <DividerComponent /> */}
							{children}
						</motion.div>
					</>
				}

			</AnimatePresence>
		</>
		, document.getElementById("menuInterface") as HTMLElement)
}

export const MenuWindowBar: FC<menuWindowBarProps> = (props) => {

	const { title, onClose } = props

	return (
		<div className="flex justify-between items-center h-[40px] px-3">
			<div className="flex justify-center items-center gap-2">
				<h1 className="dark:text-sv-white text-sv-black text-sm">
					{title}
				</h1>
			</div>
			<div className="flex justify-center items-center">
				<button onClick={onClose}>
					<CgClose size={16} className="dark:text-sv-white text-sv-black" />
				</button>
			</div>
		</div>
	)
}

export default MenuWindow