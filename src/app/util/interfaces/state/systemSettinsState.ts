export interface SystemSettingsState {
	systemSettings: ISystemSettingsItemState[];
}

export interface ISystemSettingsItemState {
	id: string;
	value: any;
}