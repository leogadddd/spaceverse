import { SettingsActionTypes } from "../../../util/enums"
import { SettingsState } from "../../../util/interfaces"
import { settingsAction } from "../actions/settingsActions"

const initialState: SettingsState = {
	settingsFields: []
}

export const settingsReducer = (state = initialState, action: settingsAction) => {
	switch (action.type) {
		case SettingsActionTypes.SUBSCRIBE_SETTINGS_FILED:
			return {
				...state,
				settingsFields: [...state.settingsFields, action.payload]
			}
		case SettingsActionTypes.UNSUBSCRIBE_SETTINGS_FILED:
			return {
				...state,
				settingsFields: state.settingsFields.filter((field) => field.name !== action.value)
			}
		case SettingsActionTypes.UPDATE_SETTINGS_FILED:
			return {
				...state,
				settingsFields: state.settingsFields.map((field) => {
					if (field.name === action.payload.name) {
						return {
							...field,
							...action.payload
						}
					}
					return field
				})
			}
		default:
			return state
	}
}

export default settingsReducer
export type settingsState = ReturnType<typeof settingsReducer>