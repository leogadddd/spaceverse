import React, { useContext } from "react";
import { ThemeContext } from "../../../util/context/themeContext";
import { RiMoonFill } from "react-icons/ri";
import { RiSunFill } from "react-icons/ri";

export const ThemeToggler = () => {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<button
			className="shadow-lg dark:bg-sv-black bg-sv-white h-full px-[0.8em] pointer-events-auto corners flex justify-center items-center gap-2"
			onClick={toggleTheme}
			aria-label="Toggle theme"
		>
			{theme === "light" ? <MoonIcon /> : <SunIcon />}
		</button>
	);
};

const MoonIcon = () => {
	return (
		<RiMoonFill className="dark:text-sv-white text-sv-black" />
	);
};

const SunIcon = () => {
	return (
		<RiSunFill className="dark:text-sv-white text-sv-black" />
	);
};

export default ThemeToggler;
