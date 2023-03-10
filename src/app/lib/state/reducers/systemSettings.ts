import { SystemSettingsActionTypes } from "../../../util/enums/systemSettingsAction";
import { SystemSettingsState } from "../../../util/interfaces/state/systemSettinsState";
import { systemSettingsAction } from "../actions";

const initialState: SystemSettingsState = {
	systemSettings: []
}

export const systemSettingsReducer = (state = initialState, action: systemSettingsAction): SystemSettingsState => {
	switch (action.type) {
		case SystemSettingsActionTypes.SUBSCRIBE_SYSTEM_SETTINGS:
			return {
				...state,
				systemSettings: [
					...state.systemSettings,
					action.payload
				]
			}
		case SystemSettingsActionTypes.UPDATE_SYSTEM_SETTINGS:
			return {
				...state,
				systemSettings: [
					...state.systemSettings.map((systemSetting) => {
						if (systemSetting.id === action.payload.id) {
							return {
								...systemSetting,
								...action.payload
							}
						}
						return systemSetting
					})
				]
			}
		default:
			return state;
	}
}

export default systemSettingsReducer
export type systemSettingsState = ReturnType<typeof systemSettingsReducer>