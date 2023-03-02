import { FC, useContext, useEffect, useState } from "react"
import MenuWindow from "../../menuWindowContainer"
import { componentsProps } from "./whatsNewProps"
import Markdown from "markdown-to-jsx"
import { WhatsNewContext } from "../../../../util/context/whatsnewContext"
import { WindowMenuItemState } from "../../../../util/interfaces"
import { useSelector } from "react-redux"

const markdown = `
### ❤️ Added ❤️

- Added **Settings menu**. You can now change settings such as location of the navigation bar, and some other things.
- Added Widget Settings for the **Universe Widget**. You can Turn on the *Auto-Next Feature*.
- Added Widget Settings for the **Timer Widget**. You can now change the *default timer duration* and *Max Short Breaks*.
<warning>(You can access these settings by tapping the gear icon on the top-right corner of every widgets)</warning>
- Added **Noise Widget**. You can now listen to some *brown noises* while you work. <br>
<warning>(More noises will be added in the future)</warning>
- Added Capabilities to the **Music Widget**. You can now add *playlists/albums/tracks* and play them. <br>
<warning>(Use **Google Chrome** and Login to **Spotify** on your browser to play whole songs)</warning>
- Added *Sharing Features* to the **Universe Widget**. You can now share your *Universe* with your friends.

### 🐛 Fixed 🐛

- Fixed the ***crash*** when you try to change the *volume* when the **Universe** is Loading.

`

export const WhatsNew = () => {

	const [isNewVersion, setIsNewVersion] = useState(true)
	const whatsNewContext = useContext(WhatsNewContext)

	const windowMenuItemState: WindowMenuItemState | undefined = useSelector((state: any) => {
		const menuItems = state.windowMenu.menuItems as WindowMenuItemState[]
		return menuItems.find((item) => item.name === "What's New")
	})

	useEffect(() => {
		if (whatsNewContext?.ctx?.version !== process.env.REACT_APP_buildVersion) {
			setIsNewVersion(true)
		} else {
			setIsNewVersion(false)
		}
	}, [])

	const handleOnWhatsNewOpen = () => {
		whatsNewContext.setCtx({
			version: process.env.REACT_APP_buildVersion,
			versionName: process.env.REACT_APP_buildName,
			isNew: isNewVersion
		})
	}

	useEffect(() => {
		if (windowMenuItemState?.isOpen) {
			handleOnWhatsNewOpen()
		}
	}, [windowMenuItemState?.isOpen])

	return (
		<MenuWindow title={"What's New"} minWidth={500} hasNewContent={whatsNewContext?.ctx?.isNew ? 0 : 1}>
			<div className="py-4 px-6 max-h-[300px] overflow-y-auto">
				<div className="flex flex-col justify-center items-center text-sv-black dark:text-sv-white pb-3">
					<span className="tracking-wider text-xs text-sv-black dark:text-sv-whatsnew-li-dark">
						version
					</span>
					<span className="text-sm font-semibold">
						{process.env.REACT_APP_buildVersion}
					</span>
					<h2 className="text-2xl font-semibold">
						{process.env.REACT_APP_buildName}
					</h2>
				</div>

				<Markdown
					children={markdown}
					options={{ overrides: overrides }}
				/>

			</div>
		</MenuWindow>
	)
}

export const H1Component: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<div className="flex justify-start items-center">
			<h1 className="text-sv-black dark:text-sv-white text-2xl">
				{children}
			</h1>
		</div>
	)
}

export const H2Component: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<div className="flex justify-center items-center py-2">
			<h2 className="text-sv-black dark:text-sv-white text-lg tracking-wider">
				{children}
			</h2>
		</div>
	)
}

export const H3Component: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<div className="flex justify-start gap-3 items-center py-2 pb-0">
			<div className="bg-sv-black dark:bg-sv-white flex-1 h-[2px] corners opacity-50" />
			<h3 className="text-sv-black dark:text-sv-white text-base font-semibold uppercase">
				{children}
			</h3>
			<div className="bg-sv-black dark:bg-sv-white flex-1 h-[2px] corners opacity-50" />
		</div>
	)
}

export const ListItemComponent: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<li className="inline-block py-1 pb-2 text-sv-black dark:text-sv-whatsnew-li-dark text-sm text-justify">
			{children}
		</li>
	)
}

export const UnorderedListComponent: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<ul className="flex flex-col justify-start items-start gap-1 pb-6 list-disc">
			{children}
		</ul>
	)
}

export const PComponent: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<p className="flex justify-center items-center py-1 text-sv-black dark:text-sv-white text-sm opacity-50 text-justify">
			{children}
		</p>
	)
}

export const StrongComponent: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<strong className="text-sv-black dark:text-sv-white text-sm">
			{children}
		</strong>
	)
}

export const EmComponent: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<em className="text-sv-black dark:text-sv-white text-sm">
			{children}
		</em>
	)
}

export const WarningComponent: FC<componentsProps> = ({ children, ...props }) => {
	return (
		<div className="inline-block py-1 pb-2 italic text-sv-black dark:text-sv-whatsnew-li-dark text-sm text-justify">
			{children}
		</div>
	)
}


const overrides = {
	h1: {
		component: H1Component,
	},
	h2: {
		component: H2Component,
	},
	h3: {
		component: H3Component,
	},
	li: {
		component: ListItemComponent,
	},
	ul: {
		component: UnorderedListComponent,
	},
	p: {
		component: PComponent,
	},
	strong: {
		component: StrongComponent,
	},
	em: {
		component: EmComponent,
	},
	warning: {
		component: WarningComponent,
	},
}

export default WhatsNew