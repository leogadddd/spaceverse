import { FC, useState } from "react";
import { DividerComponent2 } from "../../../divider";
import { DropdownFieldComponentProps, settingsFieldLayout, ToggleComponentProps, ToggleFieldComponentProps } from "./settingsProps";

const FieldLayout: FC<settingsFieldLayout> = (props) => {

	const { isLast, children } = props

	return (
		<>
			<div className="py-[5px] px-10 flex flex-col gap-2 overflow-hidden">
				{children}
				{!isLast && <DividerComponent2 />} {/* CHANGE THIS BECAUSE IN THE FUTURE SETTINGS WILL HAVE SECTIONS */}
			</div>
		</>
	)
}

const ToggleFieldComponent = (props: ToggleFieldComponentProps) => {

	const { label, tooltip, checked, onChange, isLast } = props

	const [isChecked, setIsChecked] = useState(checked)

	const handleChange = () => {
		setIsChecked(!isChecked)
		onChange(!isChecked)
	}

	return (
		<FieldLayout isLast={isLast}>
			<div className="flex justify-between items-center">
				<div>
					<h1 className="dark:text-sv-white text-sv-black font-semibold">
						{label}
					</h1>
				</div>
				<div>
					{/* <input type="checkbox" checked={isChecked} onChange={handleChange} />
				 */}
					<ToggleComponent name={label} checked={isChecked} onChange={handleChange} />
				</div>
			</div>
			<div className="ml-4">
				{
					tooltip &&
					<p className="text-sm dark:text-sv-light text-sv-dark italic opacity-50">{tooltip}</p>
				}
			</div>
		</FieldLayout>
	)
}

const ToggleComponent: FC<ToggleComponentProps> = (props) => {

	const { name, checked, onChange } = props

	const [isChecked, setIsChecked] = useState(checked)

	const handleChange = () => {
		setIsChecked(!isChecked)
		onChange(!isChecked)
	}

	const backgroundColor = isChecked ? "bg-sv-dark75 dark:bg-sv-light90" : "bg-sv-light50 dark:bg-sv-black"
	const thumbLocation = isChecked ? "translate-x-4" : "translate-x-0"

	return (
		<div
			onClick={handleChange}
			className="overflow-visible"
		>
			<div
				className={`cursor-pointer h-3 w-8 ${backgroundColor} transition-colors corners relative pointer-events-auto shadow-inner`}
			>
				<div
					className={`cursor-pointer h-5 w-5 ${thumbLocation} bg-teal-500 rounded-full absolute top-1/2 -translate-y-1/2 pointer-events-auto transition-transform`}
				/>
			</div>
		</div>
	)
}



const DropdownFieldComponent = (props: DropdownFieldComponentProps) => {

	const { label, tooltip, options, selected, onChange, isLast } = props

	const [selectedOption, setSelectedOption] = useState(selected)

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(e.target.value)
		onChange(e.target.value)
	}

	return (
		<FieldLayout isLast={isLast}>
			<div className="flex justify-between items-center">
				<div>
					<h1 className="dark:text-sv-white text-sv-black font-semibold">
						{label}
					</h1>
				</div>
				<div>
					<select value={selectedOption} onChange={handleChange} className="dark:bg-sv-black bg-sv-dark75 dark:text-sv-white text-sv-white rounded-md px-2 py-1 text-sm">
						{
							options.map((option, index) => {
								return (
									<option key={index} value={option.value}>{option.label}</option>
								)
							})
						}
					</select>
				</div>
			</div>
			<div className="ml-4">
				{
					tooltip &&
					<p className="text-sm dark:text-sv-light text-sv-dark italic opacity-50">{tooltip}</p>
				}
			</div>
		</FieldLayout>
	)
}

export const field = {
	ToggleFieldComponent,
	DropdownFieldComponent
}