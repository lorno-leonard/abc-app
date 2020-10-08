import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	todos: [],
	loading: false,

	loadingAdd: false,
	hasAdded: false,

	loadingUpdate: false,
	hasUpdated: false,

	loadingDelete: false,
	hasDeleted: false,

	error: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_TODOS:
		case ActionTypes.GET_TODOS_REQUEST:
		case ActionTypes.GET_TODOS_SUCCESS:
		case ActionTypes.GET_TODOS_ERROR:
		case ActionTypes.GET_TODO_BY_ID:
		case ActionTypes.GET_TODO_BY_ID_REQUEST:
		case ActionTypes.GET_TODO_BY_ID_SUCCESS:
		case ActionTypes.GET_TODO_BY_ID_ERROR:
		case ActionTypes.ADD_TODO:
		case ActionTypes.ADD_TODO_REQUEST:
		case ActionTypes.ADD_TODO_SUCCESS:
		case ActionTypes.ADD_TODO_ERROR:
		case ActionTypes.UPDATE_TODO:
		case ActionTypes.UPDATE_TODO_REQUEST:
		case ActionTypes.UPDATE_TODO_SUCCESS:
		case ActionTypes.UPDATE_TODO_ERROR:
		case ActionTypes.DELETE_TODO:
		case ActionTypes.DELETE_TODO_REQUEST:
		case ActionTypes.DELETE_TODO_SUCCESS:
		case ActionTypes.DELETE_TODO_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_TODO_ERROR:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
}