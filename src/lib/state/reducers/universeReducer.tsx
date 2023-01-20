import { UniverseActionTypes } from "../../../util/enums";
import { UniverseState } from "../../../util/interfaces/state/universeState";
import { universeAction } from "../actions";

const initialState : UniverseState = {
	docId: null,
	id: null,
	title: null,
	sourceType: null,
	sourceUrl: null,
	sourceUrlValue: null,
	volume: 0,
	contributer: null,
	isLoading: true,
	isMuted: false,
	isFavorite: null,
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
		default:
			return state;
	}
}

export default universeReducer
export type universeReducerState = ReturnType<typeof universeReducer>