import { Account, DevTools, SettingsMenu, WhatsNew } from "./menuItems"



export const MenuComponent = () => {

	return (
		<>
			{/* <Account /> */}
			<SettingsMenu />
			<WhatsNew />
			{
				process.env.NODE_ENV === "development" && <DevTools />
			}
		</>
	)
}

export default MenuComponent