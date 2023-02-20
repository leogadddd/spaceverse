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
	isLoading: true,
	isMuted: false,
	isFavorite: null,
	startTime: 0,
	endTime: null,
	manager: {
		categories: [],
		universes: [],
		pickedCategory: null,
		pickedUniverse: null,
		categoryIndex: 0,
		universeIndex: 0,
	}
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
		case UniverseActionTypes.SET_CATEGORIES:
			return {
				...state,
				manager: {
					...state.manager,
					categories: action.payload
				}
			}
		case UniverseActionTypes.SET_UNIVERSES:
			return {
				...state,
				manager: {
					...state.manager,
					universes: action.payload
				}
			}
		case UniverseActionTypes.SET_PICKED_CATEGORY:
			return {
				...state,
				manager: {
					...state.manager,
					categoryIndex: action.value,
					pickedCategory: state.manager.categories[action.value],
					universes: state.manager.categories[action.value].universes
				}
			}
		case UniverseActionTypes.SET_PICKED_UNIVERSE:
			return {
				...state,
				manager: {
					...state.manager,
					universeIndex: action.value,
					pickedUniverse: state.manager.universes[action.value]
				}
			}
		default:
			return state;
	}
}

export default universeReducer
export type universeReducerState = ReturnType<typeof universeReducer>