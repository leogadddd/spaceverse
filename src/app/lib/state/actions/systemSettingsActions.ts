import { SystemSettingsActionTypes } from "../../../util/enums/systemSettingsAction";
import { ISystemSettingsItemState } from "../../../util/interfaces/state/systemSettinsState";

interface systemSettingsActionSetSystemSettings {
	type: SystemSettingsActionTypes.SUBSCRIBE_SYSTEM_SETTINGS;
	payload: ISystemSettingsItemState;
}

interface systemSettingsActionUpdateSystemSettings {
	type: SystemSettingsActionTypes.UPDATE_SYSTEM_SETTINGS;
	payload: ISystemSettingsItemState;
}

export type systemSettingsAction = systemSettingsActionSetSystemSettings | systemSettingsActionUpdateSystemSettings;
