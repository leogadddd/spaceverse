import { DropdownOption } from "../../../components/menu/menuItems/SettingsWindow/settingsProps";
import { settingsFieldType } from "../../enums";

export interface SettingsState {
	settingsFields: SettingsFieldState[];
}

export interface SettingsFieldState {
	name: string;
	label: string;
	value: any | null;
	type: settingsFieldType;
	options?: DropdownOption[];
	section?: string;
	tooltip?: string;
	isLast?: boolean;
}