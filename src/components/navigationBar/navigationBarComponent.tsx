import React, { useState, FC, PropsWithChildren } from "react"
import { createPortal } from "react-dom"
import { Logo, Menu, ThemeToggler, BuyMeCoffee } from "./components"
import { NavigationLocation } from "./navigationBarProps"

export const NavigationBarComponent = () => {

	return createPortal(
		<NavigationLayout>
			<div className="flex flex-row justify-start items-center gap-2">
				<Logo />
				<ThemeToggler />
			</div>
			<div className="flex flex-row justify-end items-center gap-2">
				<BuyMeCoffee />
				<Menu />
			</div>
		</NavigationLayout>
		, document.getElementById('barInterface') as Element)
}

const NavigationLayout: FC<PropsWithChildren> = (props) => {

	const { children } = props

	const [location, setLocation] = useState<NavigationLocation>(NavigationLocation.Bottom)

	const locationStyle = {
		[NavigationLocation.Top]: 'top-0 left-0 right-0',
		[NavigationLocation.Bottom]: 'bottom-0 left-0 right-0',
	}

	const barLocation = locationStyle[location]

	return (
		<div className={`absolute ${barLocation} z-50 flex flex-row justify-between m-2 h-[40px] pointer-events-none`}>
			{children}
		</div>
	)
}

export default NavigationBarComponent