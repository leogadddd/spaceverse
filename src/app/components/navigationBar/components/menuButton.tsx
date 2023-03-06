import { TiThMenu } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { WindowMenuState } from "../../../util/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { creators } from "../../../lib";
import { MenuList } from "../../menu/menuList";
import { FC, useEffect, useState } from "react";

export const Menu = () => {

	const dispatch = useDispatch()
	const { toggleWindowMenu } = bindActionCreators(creators, dispatch)
	const windowMenuState: WindowMenuState = useSelector((state: any) => state.windowMenu)
	const [hasNewContent, setHasNewContent] = useState<boolean>(false)

	const checkIfHasNewContent = () => {
		setHasNewContent(false)

		windowMenuState.menuItems.forEach((item) => {
			if (item.hasNewContent) {
				return setHasNewContent(true)
			}
		})
	}

	const toggleIsOpen = () => {
		toggleWindowMenu(!windowMenuState.isOpen)
	}

	useEffect(() => {
		checkIfHasNewContent()
	}, [windowMenuState.menuItems])

	return (
		<>
			<button
				className="shadow-lg dark:bg-sv-dark bg-sv-light h-full px-[0.8em] pointer-events-auto corners flex justify-center items-center gap-2"
				onClick={toggleIsOpen}
				aria-label="Toggle theme"
			>
				<AnimatePresence mode="wait">
					{
						windowMenuState.isOpen ?
							<MenuBurgerCloseIcon />
							: <MenuBurgerIcon hasNewContent={hasNewContent} />
					}
				</AnimatePresence>
			</button>
			<AnimatePresence mode="wait">
				{windowMenuState.isOpen &&
					<MenuList onUnfocus={toggleIsOpen} />
				}
			</AnimatePresence>
		</>
	);
}

const MenuBurgerIcon: FC<{ hasNewContent: boolean }> = (props) => {

	const { hasNewContent } = props

	return (
		<motion.div
			initial={{ rotate: -90 }}
			animate={{ rotate: 0 }}
			exit={{ rotate: 90 }}
		>
			<TiThMenu className="dark:text-sv-white text-sv-black" />
			<motion.div
				className="w-3 h-3 bg-sv-pomodoro-red corners absolute right-2 top-2"
				initial={{ opacity: 0 }}
				animate={{ opacity: hasNewContent ? 1 : 0 }}
				transition={{ duration: 0.2, delay: .7 }}
			/>
		</motion.div>
	);
};

const MenuBurgerCloseIcon = () => {
	return (
		<motion.div
			initial={{ rotate: 0 }}
			animate={{ rotate: 90 }}
			exit={{ rotate: 0 }}
		>
			<CgClose size={16} className="dark:text-sv-white text-sv-black" />
		</motion.div>
	);
};

export default Menu