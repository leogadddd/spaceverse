import { Dispatch } from "react";
import { SettingsActionTypes } from "../../../util/enums";
import { SettingsFieldState } from "../../../util/interfaces";
import { settingsAction } from "../actions";


export const subscribeSettingsField = (field: SettingsFieldState) => {
	return (dispatch: Dispatch<settingsAction>) => {
		dispatch({
			type: SettingsActionTypes.SUBSCRIBE_SETTINGS_FILED,
			payload: field,
		});
	}
}

export const unsubscribeSettingsField = (name: string) => {
	return (dispatch: Dispatch<settingsAction>) => {
		dispatch({
			type: SettingsActionTypes.UNSUBSCRIBE_SETTINGS_FILED,
			value: name,
		});
	}
}

export const updateSettingsField = (field: SettingsFieldState) => {
	return (dispatch: Dispatch<settingsAction>) => {
		dispatch({
			type: SettingsActionTypes.UPDATE_SETTINGS_FILED,
			payload: field,
		});
	}
}