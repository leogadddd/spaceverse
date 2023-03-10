import { SystemSettingsActionTypes } from "../../../util/enums/systemSettingsAction";
import { ISystemSettingsItemState } from "../../../util/interfaces/state/systemSettinsState";

export const subscribeSystemSettings = (systemSettings: ISystemSettingsItemState) => {
	return {
		type: SystemSettingsActionTypes.SUBSCRIBE_SYSTEM_SETTINGS,
		payload: systemSettings,
	};
}

export const updateSystemSettings = (systemSettings: ISystemSettingsItemState) => {
	return {
		type: SystemSettingsActionTypes.UPDATE_SYSTEM_SETTINGS,
		payload: systemSettings,
	};
}