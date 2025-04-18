import { bindActionCreators } from "@reduxjs/toolkit"
import { motion } from "framer-motion"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import { getSpecificRoute } from "../../../routes"
import { creators } from "../../lib"
import { subscribersSettingsFields } from "../../util/enums/subscribersName"
import { SettingsFieldState, WindowMenuItemState, WindowMenuState } from "../../util/interfaces"
import DividerComponent from "../divider"
import { MenuListProps, NavigationLocation } from "../navigationBar/navigationBarProps"
import { MenuListItemLinkProps, MenuListItemState } from "./menuWindowProps"

export const MenuList: FC<MenuListProps> = (props) => {

	const dispatch = useDispatch()
	const { toggleWindowMenu } = bindActionCreators(creators, dispatch)
	const windowMenuState: WindowMenuState = useSelector((state: any) => state.windowMenu)

	const toggleIsOpen = () => {
		toggleWindowMenu(false)
	}

	return (
		<MenuListLayout>
			<motion.div
				onClick={toggleIsOpen}
				initial={{ opacity: 0 }}
				animate={{ opacity: .05 }}
				exit={{ opacity: 0 }}
				className="absolute inset-0 bg-white z-40 pointer-events-auto"
			>
			</motion.div>
			<motion.div
				className={`shadow-lg z-50 dark:bg-sv-dark bg-sv-light corners absolute overflow-hidden`}
				initial={{ height: 0 }}
				animate={{ height: 'auto' }}
				exit={{ height: 0, opacity: 0 }}
			>
				<div className="w-[225px] flex flex-col justify-center items-center">
					<ul className="w-full">
						{
							windowMenuState?.menuItems.map((item: WindowMenuItemState) => {
								return (
									<div key={item.name + "-listItem"}>
										<MenuListItem name={item.name} hasNewContent={item.hasNewContent} />
										<DividerComponent />
									</div>
								)
							})
						}
						<MenuListItemLink name="Resources" href={getSpecificRoute('resources')?.path || ""} />
						<MenuListItemLink name="Privacy" href={getSpecificRoute('privacy')?.path || ""} />
						<MenuListItemLink name="Terms" href={getSpecificRoute('terms')?.path || ""} />
					</ul>
					<div className="h-[35px] flex flex-col-reverse p-2">
						<h1 className="dark:text-sv-ring-dark text-sv-ring-light text-sm">
							Build {process.env.REACT_APP_buildVersion}
						</h1>
					</div>
				</div>
			</motion.div>
		</MenuListLayout >
	)
}

const MenuListItemLink: FC<MenuListItemLinkProps> = (props) => {

	const { name, href } = props

	return (
		<>
			<li key={name + "-linkItem"} className="flex">
				<a
					href={href}
					target="_blank"
					rel="noreferrer"
					className="flex-1 h-[40px] px-6 flex justify-start items-center hover:bg-sv-input-dark pointer-events-auto transition-colors disabled:opacity-25"
				>
					<h1 className="dark:text-sv-light text-sv-dark">
						{name}
					</h1>
				</a>
			</li>
			<DividerComponent />
		</>
	)
}

const MenuListItem: FC<MenuListItemState> = (props) => {

	const { name, hasNewContent } = props

	const dispatch = useDispatch()
	const { toggleWindowMenuItem, toggleWindowMenu, toggleWindowMenuHasNewContent } = bindActionCreators(creators, dispatch)
	const windowMenuItemState: WindowMenuItemState | undefined = useSelector((state: any) => {
		const menuItems = state.windowMenu.menuItems as WindowMenuItemState[]
		return menuItems.find((item) => item.name === name)
	})

	const toggleIsOpen = () => {
		toggleWindowMenuItem({
			name: name,
			isOpen: !windowMenuItemState?.isOpen
		})
		toggleWindowMenu(false)
		toggleWindowMenuHasNewContent({
			name: name,
			hasNewContent: 0
		})
	}

	return (
		<li key={name + "-listItem"} className="flex">
			<button
				onClick={toggleIsOpen}
				className="flex-1 h-[40px] px-6 flex justify-start items-center hover:bg-sv-input-dark pointer-events-auto transition-colors disabled:opacity-25"
				disabled={windowMenuItemState?.isOpen}
			>
				<h1 className="dark:text-sv-light text-sv-dark">
					{name}
				</h1>

				{
					hasNewContent === 1 && (
						<div className="ml-2">
							<div className="dark:bg-sv-pomodoro-red bg-sv-pomodoro-red rounded-full px-2 h-4">
								<p className="text-xs text-center text-sv-light">
									NEW
								</p>
							</div>
						</div>
					)
				}
			</button>
		</li>
	)
}

const MenuListLayout: FC<PropsWithChildren> = (props) => {

	const { children } = props

	const settingsFieldState: SettingsFieldState | undefined = useSelector((state: any) => {
		const settingsField = state.settings.settingsFields as SettingsFieldState[]
		return settingsField.find((field) => field.name === subscribersSettingsFields.navigationBar.navBarLocation.name)
	})

	const [location, setLocation] = useState<NavigationLocation>(settingsFieldState?.value || NavigationLocation.Default)

	const locationStyle = [
		'bottom-0 pb-[56px] top-0 left-0 right-0 justify-end', //48px
		'top-0 pt-[56px] bottom-0 left-0 right-0 justify-start',
		'bottom-0 pb-[56px] top-0 left-0 right-0 justify-end',
	]

	const barLocation = locationStyle[location]

	useEffect(() => {
		setLocation(settingsFieldState?.value)
	}, [settingsFieldState?.value])

	return createPortal(
		<div className={`absolute ${barLocation} z-60 flex p-2 flex-col items-end pointer-events-none`}>
			{children}
		</div>
		, document.getElementById("menuInterface") as HTMLElement)
}