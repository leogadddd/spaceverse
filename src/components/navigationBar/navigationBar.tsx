import React, { useState, useEffect, FC, PropsWithChildren } from "react"
import { createPortal } from "react-dom"
import { Logo, ThemeToggler } from "./components"
import { NavigationLocation } from "./navigationBarProps"

export const NavigationBar = () => {

	return createPortal(
		<NavigationLayout>
			<Logo />
			<ThemeToggler />
		</NavigationLayout>
		, document.getElementById('barInterface') as Element)
}

const NavigationLayout: FC<PropsWithChildren> = (props) => {

	const { children } = props

	const [location, setLocation] = useState<NavigationLocation>(NavigationLocation.Top)

	const locationStyle = {
		[NavigationLocation.Top]: 'top-0 left-0 right-0',
		[NavigationLocation.Bottom]: 'bottom-0 left-0 right-0',
	}

	const barLocation = locationStyle[location]

	return (
		<div className={`absolute ${barLocation} z-50 flex flex-row justify-start items-center gap-2 m-2 h-[40px]`}>
			{children}
		</div>
	)
}

export default NavigationBar