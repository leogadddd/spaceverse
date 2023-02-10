import { TiThMenu } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { WindowMenuState } from "../../../util/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { creators } from "../../../lib";
import { MenuList } from "../../menu/menuList";

export const Menu = () => {

	const dispatch = useDispatch()
	const { toggleWindowMenu } = bindActionCreators(creators, dispatch)
	const windowMenuState: WindowMenuState = useSelector((state: any) => state.windowMenu)

	const toggleIsOpen = () => {
		toggleWindowMenu(!windowMenuState.isOpen)
	}

	return (
		<>
			<button
				className="shadow-lg dark:bg-sv-dark bg-sv-light h-full px-[0.8em] pointer-events-auto corners flex justify-center items-center gap-2"
				onClick={toggleIsOpen}
				aria-label="Toggle theme"
			>
				{
					windowMenuState.isOpen ?
						<MenuBurgerCloseIcon />
						: <MenuBurgerIcon />
				}
			</button>
			<AnimatePresence mode="wait">
				{windowMenuState.isOpen &&
					<MenuList onUnfocus={toggleIsOpen} />
				}
			</AnimatePresence>
		</>
	);
}

const MenuBurgerIcon = () => {
	return (
		<motion.div
			initial={{ rotate: -90 }}
			animate={{ rotate: 0 }}
			exit={{ rotate: 90 }}
		>
			<TiThMenu className="dark:text-sv-white text-sv-black" />
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