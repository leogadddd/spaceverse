export interface DatabaseWidgetContainerProps {
	title: string;
	children: React.ReactNode;
	minWidth?: number;
	maxWidth?: number;
	defaultPosition?: { x: number; y: number };
	dbProps?: any[];
}

export interface DatabaseWidgetBarProps {
	title: string;
	isMinimized: boolean;
	setIsMinimized: () => void;
}

export interface DatabaseWidgetTemplateProps {
	rows: any[] | null;
	onAddRow: () => void;
	onRemoveRow: (props: any) => void;
	onUpdateRow?: (props: any) => void;
	fields: DatabaseWidgetFormFieldProps[];
}

export interface DatabaseFormProps {
	fields: DatabaseWidgetFormFieldProps[];
}

export enum DatabaseWidgetFormType {
	TEXT = "text",
	NUMBER = "number",
	TEXTAREA = "textarea",
	SELECT = "select",
}

export interface DatabaseWidgetFormFieldProps {
	name: string;
	type: DatabaseWidgetFormType;
	label: string;
	value: any;
	placeholder?: string;
	options?: {
		value: string;
		label: string;
	}[];
	onChange: (value: any) => void;
}

export interface DatabaseListProps {
	rows: any[] | null;
	onRemoveRow?: (index: number) => void;
	onUpdateRow?: (index: number, value: any) => void;
}

export interface DatabaseListLayoutProps {
	children: React.ReactNode;
	isCentered?: boolean;
}

export interface DatabaseListEmptyProps {
	text: string;
}

export interface DatabaseListRowProps {
	id: string;
	title: string;
	onRemoveRow?: () => void;
	[key: string]: any;
}

export interface DatabaseControlsProps {
	panel: number;
	onSaveRow: () => void;
	onUpdateRow: () => void;
	onSwitchPanel: (index: number) => void;
}

export interface DatabaseControlsButtonProps {
	text: string;
	onClick: (props: any ) => void;
}

export interface DatabaseListItemControlsProps {
	onRemoveRow: () => void;
}

export interface DatabaseListItemDeleteProps {
	onClick: (props: any) => void;
}