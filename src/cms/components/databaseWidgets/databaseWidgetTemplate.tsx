import { FC, useState } from "react"
import { DividerComponent2 } from "../../../app/components/divider"
import { DatabaseControlsButtonProps, DatabaseControlsProps, DatabaseFormProps, DatabaseListEmptyProps, DatabaseListItemControlsProps, DatabaseListItemDeleteProps, DatabaseListProps, DatabaseListRowProps, DatabaseWidgetFormFieldProps, DatabaseWidgetFormType, DatabaseWidgetTemplateProps } from "./databaseWidgetProps"
import { FaTrashAlt } from "react-icons/fa"

export const DatabaseWidgetTemplate: FC<DatabaseWidgetTemplateProps> = (props) => {

	const { rows, fields, onAddRow, onRemoveRow } = props
	const [panel, setPanel] = useState(0)

	const content = () => {
		switch (panel) {
			case 1:
				return (
					<DatabaseForm fields={fields} />
				)
			case 0:
			default:
				return (
					<DatabaseList rows={rows} onRemoveRow={onRemoveRow} />
				)
		}
	}

	const handleAddRow = () => {
		onAddRow()
	}

	const handleUpdateRow = () => {
		// onUpdateRow()
	}

	return (
		<div className='p-4 pb-4 flex flex-col justify-center gap-3 max-h-[300px]'>
			{content()}
			<DatabaseControls
				panel={panel}
				onSwitchPanel={setPanel}
				onSaveRow={handleAddRow}
				onUpdateRow={handleUpdateRow}
			/>
		</div>
	)
}

export const DatabaseFormFields: FC<DatabaseWidgetFormFieldProps> = (props) => {

	const { name, value, type, label, placeholder, options, onChange } = props

	switch (type) {
		case DatabaseWidgetFormType.NUMBER:
			return (
				<>
					<input
						name={name}
						type="number"
						placeholder={placeholder}
						className="w-full bg-spcms-darkup corners py-2 text-sv-white px-4 text-sm"
						value={value}
						onChange={(e) => onChange(e.target.value)}
					/>
				</>
			)
		case DatabaseWidgetFormType.TEXTAREA:
			return (
				<>
					<textarea
						name={name}
						placeholder={placeholder}
						className="w-full bg-spcms-darkup corners py-2 text-sv-white px-4 text-sm"
						value={value}
						onChange={(e) => onChange(e.target.value)}
					/>
				</>
			)
		case DatabaseWidgetFormType.SELECT:
			return (
				<>
					<select
						name={name}
						className="w-full bg-spcms-darkup corners py-2 text-sv-white px-4 text-sm"
						value={value}
						onChange={(e) => onChange(e.target.value)}
					>
						{options?.map((option, index) => (
							<option key={index} value={option.value}>{option.label}</option>
						))}
					</select>
				</>
			)
		case DatabaseWidgetFormType.TEXT:
		default:
			return (
				<>
					<input
						name={name}
						type="text"
						placeholder={placeholder}
						className="w-full bg-spcms-darkup corners py-2 text-sv-white px-4 text-sm"
						value={value}
						onChange={(e) => onChange(e.target.value)}
					/>
				</>
			)
	}
}

export const DatabaseForm: FC<DatabaseFormProps> = (props) => {

	const { fields } = props

	return (
		<div className="flex overflow-hidden pb-6 ">
			<div className="flex flex-col gap-2 w-full overflow-y-auto">
				{
					fields.map((field, index) => {
						return (
							<div key={index} className="flex flex-col gap-1">
								<label className="text-sv-white text-sm opacity-50">{field.label}</label>
								<DatabaseFormFields
									name={field.name}
									label={field.label}
									type={field.type}
									value={field.value}
									placeholder={field.placeholder}
									options={field.options}
									onChange={field.onChange}
								/>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export const DatabaseListEmpty: FC<DatabaseListEmptyProps> = (props) => {

	const { text } = props

	return (
		<div className="flex-1 flex flex-col bg-spcms-darkup corners overflow-hidden overflow-y-auto min-h-[100px]">
			<div className="flex-1 flex flex-col justify-center items-center">
				<h1 className="text-sv-white text-sm opacity-50">
					{text}
				</h1>
			</div>
		</div>
	)
}

export const DatabaseList: FC<DatabaseListProps> = (props) => {

	const { rows, onRemoveRow } = props

	if (rows! === undefined || rows! === null) {
		return (
			<DatabaseListEmpty text="Loading..." />
		)
	} else if (rows!.length === 0) {
		return (
			<DatabaseListEmpty text="No items found" />
		)
	}

	return (
		<div className="flex-1 flex flex-col bg-spcms-darkup corners overflow-hidden overflow-y-auto min-h-[100px]">
			{
				rows!.map((row, index) => {
					if (rows.length === index + 1) {
						return (
							<DatabaseListItem key={row.docId} id={row.id} title={row.title} {...rows} onRemoveRow={() => onRemoveRow!(row)} />
						)
					}

					return (
						<>
							<DatabaseListItem key={row.docId} id={row.id} title={row.title} {...rows} onRemoveRow={() => onRemoveRow!(row)} />
							<DividerComponent2 key={row.docId} />
						</>
					)
				})
			}
		</div>
	)
}

export const DatabaseListItem: FC<DatabaseListRowProps> = (props) => {

	const { id, title, onRemoveRow } = props

	const [isHovered, setIsHovered] = useState(false)

	return (
		<button
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className='max-h-[35px] px-4 py-2 flex-1 flex justify-between transition-colors hover:bg-spcms-darkupup'
		>
			<div className="grid grid-flow-col grid-cols-[20px] items-center gap-2">
				<div>
					<h1 className="text-sv-white text-sm opacity-50">
						{id}
					</h1>
				</div>
				<div className="flex justify-start items-center">
					<h1 className="text-sv-white text-sm ">
						{title}
					</h1>
				</div>
			</div>
			<div className="flex items-center">
				{
					isHovered && (
						<DatabaseListItemControls onRemoveRow={onRemoveRow!} />
					)
				}
			</div>
		</button>
	)
}

export const DatabaseListItemControls: FC<DatabaseListItemControlsProps> = (props) => {

	const { onRemoveRow } = props

	return (
		<div className="flex flex-row gap-2">
			<DatabaseListItemDelete onClick={onRemoveRow} />
		</div>
	)
}

export const DatabaseListItemDelete: FC<DatabaseListItemDeleteProps> = (props) => {

	const { onClick } = props

	return (
		<button onClick={onClick} className="opacity-50 hover:opacity-100 transition-opacity w-4">
			<FaTrashAlt className="text-sv-white" />
		</button>
	)
}

export const DatabaseControlsButton: FC<DatabaseControlsButtonProps> = (props) => {

	const { text, onClick } = props

	return (
		<button onClick={onClick} className="flex-1 bg-spcms-darkup corners p-2 px-4 transition-colors hover:bg-spcms-darkupup">
			<h1 className="text-sv-white">
				{text}
			</h1>
		</button>
	)
}

export const DatabaseControls: FC<DatabaseControlsProps> = (props) => {

	const { panel, onSwitchPanel, onSaveRow } = props

	const content = () => {
		switch (panel) {
			case 0:
				return (
					<>
						<div className="flex w-full">
							<DatabaseControlsButton
								text="Add"
								onClick={() => onSwitchPanel(1)}
							/>
						</div>
					</>
				)
			case 1:
				return (
					<>
						<div>
							<DatabaseControlsButton
								text="Cancel"
								onClick={() => onSwitchPanel(0)}
							/>
						</div>
						<div>
							<DatabaseControlsButton
								text="Save"
								onClick={() => {
									onSaveRow!()
									onSwitchPanel(0)
								}}
							/>
						</div>
					</>
				)
			default:
				return (
					<>
						<div>
							<DatabaseControlsButton
								text="Add"
								onClick={() => onSwitchPanel(1)}
							/>
						</div>
					</>
				)
		}
	}

	return (
		<div className="flex justify-between items-center">
			{content()}
		</div>
	)
}


export default DatabaseWidgetTemplate