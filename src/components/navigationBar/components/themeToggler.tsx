import React, { useContext } from "react";
import { ThemeContext } from "../../../util/context/themeContext";
import { RiMoonFill } from "react-icons/ri";
import { RiSunFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";

export const ThemeToggler = () => {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<button
			className="shadow-lg dark:bg-sv-dark bg-sv-light h-full px-[0.8em] pointer-events-auto corners flex justify-center items-center gap-2 overflow-hidden"
			onClick={toggleTheme}
			aria-label="Toggle theme"
		>
			<AnimatePresence mode="wait">
				{theme === "dark" ? <SunIcon /> : <MoonIcon />}
			</AnimatePresence>
		</button>
	);
};

const MoonIcon = () => {
	return (
		<motion.div
			key={"moon"}
			id="moon"
			initial={{ y: 20 }}
			animate={{ y: 0 }}
			exit={{ y: -20 }}
		>
			<RiMoonFill className="dark:text-sv-white text-sv-black" />
		</motion.div>
	);
};

const SunIcon = () => {
	return (
		<motion.div
			key={"sun"}
			id="sun"
			initial={{ y:-20 }}
			animate={{ y: 0 }}
			exit={{ y: 20 }}
		>
			<RiSunFill className="dark:text-sv-white text-sv-black" />
		</motion.div>
	);
};

export default ThemeToggler;
