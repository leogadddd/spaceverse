import { bindActionCreators } from "@reduxjs/toolkit"
import { FC, PropsWithChildren, useContext } from "react"
import { createPortal } from "react-dom"
import { IconType } from "react-icons"
import { useDispatch, useSelector, connect } from "react-redux"
import { createContext } from "vm"
import { creators } from "../../lib"
import { WidgetsState, Widget } from "../../util/interfaces/state/widgetsState"
import DividerComponent, { DividerComponent2 } from "../divider"
import { ToolBarButtonProps } from "./toolBarProps"

export const ToolBar = () => {

	const widgetsState: WidgetsState = useSelector((state: any) => state.widgets)
	const dispatch = useDispatch()
	const {
		setActiveWidget
	} = bindActionCreators(creators, dispatch)


	return (
		<ToolBarLayout>
			<div key="Toolbar" className="absolute top-1/2 -translate-y-1/2 shadow-lg bg-sv-light dark:bg-sv-dark pointer-events-auto corners overflow-hidden w-[50px] flex flex-col items-center gap-2 p-[6px] py-3">
				{
					widgetsState.widgets.map((widget: Widget, index: number) => {
						const { label, icon: Icon, id, isActive, iconSize } = widget

						const isActiveStyle = isActive ? 
						"text-teal-700 dark:text-teal-300 hover:font-semibold"
						: "text-sv-black dark:text-sv-white hover:font-semibold" 

						if (index === widgetsState.widgets.length - 1) {
							return (
								<button
									key={id + "-toolbar-button"}
									className={`w-full h-10 corners flex flex-col justify-center items-center gap-1 transition-all hover:font-semibold tracking-wide ${isActiveStyle}`}
									onClick={() => setActiveWidget(id, !isActive)}
								>
									{Icon && <Icon size={iconSize ?? 20} />}
									<p className="text-[9px]">
										{label}
									</p>
								</button>
							)
						}

						return (
							<>
								<button
									key={id + "-toolbar-button"}
									className={`w-full h-10 corners flex flex-col justify-center items-center gap-1 transition-all hover:font-semibold tracking-wide ${isActiveStyle}`}
									onClick={() => setActiveWidget(id, !isActive)}
								>
									{Icon && <Icon size={iconSize ?? 20} />}
									<p className="text-[9px]">
										{label}
									</p>
								</button>
							</>
						)
					})
				}
			</div>
		</ToolBarLayout>
	)
}

export const ToolBarLayout: FC<PropsWithChildren> = (props) => {

	const { children } = props

	return createPortal(
		<div className="z-[1000] absolute inset-0 p-2">
			{children}
		</div>
		, document.getElementById("toolBarInterface") as HTMLDivElement)
}

export default ToolBar
