import { UniverseActionTypes } from "../../../util/enums";
import { UniverseState } from "../../../util/interfaces";
import { universeAction } from "../actions";

const initialState : UniverseState = {
	docId: null,
	id: null,
	title: null,
	sourceType: null,
	sourceLink: null,
	sourceUrlValue: null,
	volume: 0,
	contributer: null,
	category: null,
	isLoading: true,
	isMuted: false,
	isFavorite: null,
	startTime: 10,
}

export const universeReducer = (state = initialState, action: universeAction) => {
	switch(action.type) {
		case UniverseActionTypes.SET_UNIVERSE:
			return {
				...state,
				...action.payload
			}
		case UniverseActionTypes.SET_VOLUME:
			return {
				...state,
				volume: action.value
			}
		case UniverseActionTypes.SET_MUTE:
			return {
				...state,
				isMuted: action.value
			}
		case UniverseActionTypes.SET_LOADING:
			return {
				...state,
				isLoading: action.value
			}
		case UniverseActionTypes.SET_FAVORITE:
			return {
				...state,
				isFavorite: action.value
			}
		case UniverseActionTypes.SET_CATEGORY:
			return {
				...state,
				category: action.payload
			}
		default:
			return state;
	}
}

export default universeReducer
export type universeReducerState = ReturnType<typeof universeReducer>