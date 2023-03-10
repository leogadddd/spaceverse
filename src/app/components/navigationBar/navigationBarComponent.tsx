import { bindActionCreators } from "@reduxjs/toolkit"
import React, { useState, FC, useEffect } from "react"
import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import { creators } from "../../lib"
import { settingsFieldType } from "../../util/enums"
import { subscribersSettingsFields } from "../../util/enums/subscribersName"
import { SettingsFieldState } from "../../util/interfaces"
import { Logo, Menu, ThemeToggler, BuyMeCoffee } from "./components"
import ImmediateToolbar from "./components/immediateToolbar"
import { NavigationBarLayoutProps, NavigationLocation } from "./navigationBarProps"

export const NavigationBarComponent = () => {

	const dispatch = useDispatch()
	const {
		subscribeSettingsField,
		unsubscribeSettingsField,
	} = bindActionCreators(creators, dispatch)
	const settingsFieldState: SettingsFieldState | undefined = useSelector((state: any) => {
		const settingsField = state.settings.settingsFields as SettingsFieldState[]
		return settingsField.find((field) => field.name === subscribersSettingsFields.navigationBar.navBarLocation.name)
	})

	const [location, setLocation] = useState<NavigationLocation>(settingsFieldState?.value || NavigationLocation.Default)

	useEffect(() => {
		subscribeSettingsField({
			...subscribersSettingsFields.navigationBar.navBarLocation,
			value: location,
			options: [
				{ value: NavigationLocation.Default, label: "Default (Bottom)" },
				{ value: NavigationLocation.Top, label: "Top" },
				{ value: NavigationLocation.Bottom, label: "Bottom" },
			],
			type: settingsFieldType.DROPDOWN,
		})

		return () => { unsubscribeSettingsField(subscribersSettingsFields.navigationBar.navBarLocation.name) }
	}, [])

	useEffect(() => {
		setLocation(settingsFieldState?.value)
	}, [settingsFieldState?.value])

	return createPortal(
		<NavigationLayout location={location}>
			<div className="flex flex-row justify-start items-center gap-2">
				<Logo />
				{/* <ThemeToggler /> */}
			</div>
			<div className="flex flex-row justify-end items-center gap-2">
				<BuyMeCoffee />
				<ImmediateToolbar />
				<Menu />
			</div>
		</NavigationLayout>
		, document.getElementById('barInterface') as Element)
}

const NavigationLayout: FC<NavigationBarLayoutProps> = (props) => {

	const { location, children } = props

	const locationStyle = [
		'bottom-0 left-0 right-0',
		'top-0 left-0 right-0',
		'bottom-0 left-0 right-0',
	]



	const barLocation = locationStyle[location] || locationStyle[NavigationLocation.Default]

	return (
		<div className={`absolute ${barLocation} z-[1000] flex flex-row justify-between m-2 h-[40px] pointer-events-none`}>
			{children}
		</div>
	)
}

export default NavigationBarComponent