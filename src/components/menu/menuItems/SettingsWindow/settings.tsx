import { bindActionCreators } from "@reduxjs/toolkit"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { creators } from "../../../../lib"
import { settingsFieldType } from "../../../../util/enums"
import { SettingsFieldState, SettingsState } from "../../../../util/interfaces"
import MenuWindow from "../../menuWindowContainer"
import { field } from "./settingsField"

export const SettingsMenu = () => {

	const settingsState: SettingsState = useSelector((state: any) => state.settings)

	return (
		<MenuWindow title={"Settings"} minWidth={450}>
			<div className="pb-4">
				<div className="overflow-x-hidden my-1 max-h-[300px]">
					{settingsState.settingsFields.map((section, index) => (
						<SettingsField key={index} {...section} isLast={index === settingsState.settingsFields.length - 1} />
					))}
				</div>
			</div>
		</MenuWindow>
	)
}

export const SettingsField: FC<SettingsFieldState> = (props) => {

	const { name, label, value, options, type, section, tooltip, isLast } = props

	const dispatch = useDispatch()
	const { updateSettingsField } = bindActionCreators(creators, dispatch)

	const onChange = (value: any) => {
		updateSettingsField({ name, label, value, type, section})
	}

	switch (type) {
		case settingsFieldType.TOGGLE:
			return field.ToggleFieldComponent({
				name: name,
				label: label,
				checked: value,
				onChange: onChange,
				tooltip: tooltip,
				isLast: isLast
			})
		case settingsFieldType.DROPDOWN:
			return field.DropdownFieldComponent({
				name: name,
				label: label,
				selected: value,
				options: options || [],
				onChange: onChange,
				tooltip: tooltip,
				isLast: isLast
			})
		default:
			return <></>
	}
}

export default SettingsMenu