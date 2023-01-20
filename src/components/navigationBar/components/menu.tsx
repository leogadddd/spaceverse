import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";

export const Menu = () => {

	const [isOpen, setIsOpen] = useState(false)

	return (
		<button
			className="shadow-lg dark:bg-sv-black bg-sv-white h-full px-[0.8em] pointer-events-auto corners flex justify-center items-center gap-2"
			onClick={() => { setIsOpen(!isOpen) }}
			aria-label="Toggle theme"
		>
			<MenuBurgerIcon />
		</button>
	);
}

const MenuBurgerIcon = () => {
	return (
		<TiThMenu className="dark:text-sv-white text-sv-black" />
	);
};

export default Menu