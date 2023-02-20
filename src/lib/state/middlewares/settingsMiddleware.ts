
import { SettingsActionTypes } from "../../../util/enums"
import { settingsAction } from "../actions"

export const localStorageSettingsName = "settingsContext"

export const settingsMiddleware = (store: any) => (next: any) => (action: settingsAction) => {
	const result = next(action)

	const actionType = action.type

	switch(actionType) {
		case SettingsActionTypes.SUBSCRIBE_SETTINGS_FILED:
			let { name, value } = action.payload

			let settingsField = {
				name: name,
				value: value
			}

			let settingsContext = localStorage.getItem(localStorageSettingsName)
			if(settingsContext === null) {
				settingsContext = JSON.stringify([settingsField])
			} else {
				const settingsContextArray = JSON.parse(settingsContext)
				const settingsFieldIndex = settingsContextArray.findIndex((settingsField: any) => settingsField.name === name)
				if(settingsFieldIndex === -1) {
					settingsContextArray.push(settingsField)
				} else {
					settingsContextArray[settingsFieldIndex] = {
						name: name,
						value: settingsContextArray[settingsFieldIndex].value
					}

					action.payload.value = settingsContextArray[settingsFieldIndex].value
				}
				settingsContext = JSON.stringify(settingsContextArray)
			}
			localStorage.setItem(localStorageSettingsName, settingsContext)
			break
		case SettingsActionTypes.UPDATE_SETTINGS_FILED:
			let { name: name2, value: value2 } = action.payload

			let settingsField2 = {
				name: name2,
				value: value2
			}

			let settingsContext2 = localStorage.getItem(localStorageSettingsName)
			if(settingsContext2 !== null) {
				const settingsContextArray2 = JSON.parse(settingsContext2)
				const settingsFieldIndex2 = settingsContextArray2.findIndex((settingsField: any) => settingsField.name === name2)
				if(settingsFieldIndex2 !== -1) {
					settingsContextArray2[settingsFieldIndex2] = settingsField2
					settingsContext2 = JSON.stringify(settingsContextArray2)
					localStorage.setItem(localStorageSettingsName, settingsContext2)
				}
			}
			break
	}

	return result
}

export default settingsMiddleware