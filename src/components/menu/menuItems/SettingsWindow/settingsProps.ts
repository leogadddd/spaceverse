export interface settingsFieldLayout {
	isLast?: boolean;
	children: React.ReactNode;
}

export interface FieldComponentProps {
	name: string;
	label: string;
	tooltip?: string;
	isLast?: boolean;
}

export interface ToggleFieldComponentProps extends FieldComponentProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export interface ToggleComponentProps {
	name: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}


export interface DropdownFieldComponentProps extends FieldComponentProps {
	selected: string;
	onChange: (value: string) => void;
	options: DropdownOption[];
}

export interface DropdownComponentProps {
	name: string;
	selected: string;
	onChange: (value: string) => void;
	options: DropdownOption[];
}

export interface DropdownOption {
	value: any;
	label: string;
}