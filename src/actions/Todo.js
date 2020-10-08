import * as ActionTypes from '../constants/ActionTypes';

// GET_TODOS
export const getTodos = () => ({
	type: ActionTypes.GET_TODOS
});

export const getTodosRequest = payload => ({
	type: ActionTypes.GET_TODOS_REQUEST,
	payload
});

export const getTodosError = payload => ({
	type: ActionTypes.GET_TODOS_ERROR,
	payload
});

export const getTodosSuccess = payload => ({
	type: ActionTypes.GET_TODOS_SUCCESS,
	payload
});

// ADD_TODO
export const addTodo = payload => ({
	type: ActionTypes.ADD_TODO,
	payload
});

export const addTodoRequest = payload => ({
	type: ActionTypes.ADD_TODO_REQUEST,
	payload
});

export const addTodoError = payload => ({
	type: ActionTypes.ADD_TODO_ERROR,
	payload
});

export const addTodoSuccess = payload => ({
	type: ActionTypes.ADD_TODO_SUCCESS,
	payload
});

// UPDATE_TODO
export const updateTodo = payload => ({
	type: ActionTypes.UPDATE_TODO,
	payload
});

export const updateTodoRequest = payload => ({
	type: ActionTypes.UPDATE_TODO_REQUEST,
	payload
});

export const updateTodoError = payload => ({
	type: ActionTypes.UPDATE_TODO_ERROR,
	payload
});

export const updateTodoSuccess = payload => ({
	type: ActionTypes.UPDATE_TODO_SUCCESS,
	payload
});

// DELETE_TODO
export const deleteTodo = payload => ({
	type: ActionTypes.DELETE_TODO,
	payload
});

export const deleteTodoRequest = payload => ({
	type: ActionTypes.DELETE_TODO_REQUEST,
	payload
});

export const deleteTodoError = payload => ({
	type: ActionTypes.DELETE_TODO_ERROR,
	payload
});

export const deleteTodoSuccess = payload => ({
	type: ActionTypes.DELETE_TODO_SUCCESS,
	payload
});

// RESET_TODO_ERROR
export const resetError = () => ({
	type: ActionTypes.RESET_TODO_ERROR
});