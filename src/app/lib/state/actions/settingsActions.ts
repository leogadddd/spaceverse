import { SettingsActionTypes } from "../../../util/enums"
import { SettingsFieldState } from "../../../util/interfaces/state";


interface settingsActionSubscribe {
	type: SettingsActionTypes.SUBSCRIBE_SETTINGS_FILED;
	payload: SettingsFieldState;
}

interface settingsActionUnsubscribe {
	type: SettingsActionTypes.UNSUBSCRIBE_SETTINGS_FILED;
	value: string;
}

interface settingsActionUpdate {
	type: SettingsActionTypes.UPDATE_SETTINGS_FILED;
	payload: SettingsFieldState;
}

export type settingsAction = settingsActionSubscribe | settingsActionUnsubscribe | settingsActionUpdate;