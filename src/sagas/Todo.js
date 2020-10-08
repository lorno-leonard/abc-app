import { takeLatest, call, put } from 'redux-saga/effects';
import _ from 'lodash';

import * as ActionTypes from '../constants/ActionTypes';
import {
	// GET_TODOS
	getTodosRequest,
	getTodosError,
	getTodosSuccess,
	// ADD_TODO
	addTodoRequest,
	addTodoError,
	addTodoSuccess,
	// UPDATE_TODO
	updateTodoRequest,
	updateTodoError,
	updateTodoSuccess,
	// DELETE_TODO
	deleteTodoRequest,
	deleteTodoError,
	deleteTodoSuccess
} from '../actions/Todo';
import API from '../api';

// GET_TODOS
export function* watchGetTodos() {
	yield takeLatest(ActionTypes.GET_TODOS, workerGetTodos);
}

function* workerGetTodos() {
	yield put(getTodosRequest({ loading: true }));
	try {
		const todos = yield call(API.getTodos);
		yield put(getTodosSuccess({
			todos: _.sortBy([...todos], ['createdAt']),
			loading: false
		}));
	} catch ({ message }) {
		yield put(getTodosError({
			error: message,
			loading: false
		}));
	}
}

// ADD_TODO
export function* watchAddTodo() {
	yield takeLatest(ActionTypes.ADD_TODO, workerAddTodo);
}

function* workerAddTodo({ payload }) {
	const { todos, text } = payload;
	yield put(addTodoRequest({
		loadingAdd: true,
		hasAdded: false
	}));
	try {
		const newTodo = yield call(API.addTodo, { text });
		const newTodos = [...todos, newTodo];
		yield put(addTodoSuccess({
			todos: newTodos,
			loadingAdd: false,
			hasAdded: true
		}));
	} catch ({ message }) {
		yield put(addTodoError({
			error: message,
			loadingAdd: false
		}));
	}
}

// UPDATE_TODO
export function* watchUpdateTodo() {
	yield takeLatest(ActionTypes.UPDATE_TODO, workerUpdateTodo);
}

function* workerUpdateTodo({ payload }) {
	const { todos, todo, text, checked } = payload;
	yield put(updateTodoRequest({
		loadingUpdate: true,
		hasUpdated: false
	}));
	try {
		const updatedTodo = yield call(API.updateTodo, todo.id, { text, checked });
		const newTodos = todos.map(uTodo => {
			if (uTodo.id === updatedTodo.id) {
				return {
					...updatedTodo
				}
			} else {
				return {
					...uTodo
				}
			}
		});
		yield put(updateTodoSuccess({
			todos: newTodos,
			loadingUpdate: false,
			hasUpdated: true
		}));
	} catch ({ message }) {
		yield put(updateTodoError({
			error: message,
			loadingUpdate: false
		}));
	}
}

// DELETE_TODO
export function* watchDeleteTodo() {
	yield takeLatest(ActionTypes.DELETE_TODO, workerDeleteTodo);
}

function* workerDeleteTodo({ payload }) {
	const { todos, todo } = payload;
	yield put(deleteTodoRequest({
		loadingDelete: true,
		hasDeleted: false
	}));
	try {
		yield call(API.deleteTodo, todo.id);
		const deletedIndex = todos.findIndex(dTodo => dTodo.id === todo.id);
		todos.splice(deletedIndex, 1);
		yield put(deleteTodoSuccess({
			todos: [...todos],
			loadingDelete: false,
			hasDeleted: true
		}));
	} catch ({ message }) {
		yield put(deleteTodoError({
			error: message,
			loadingDelete: false
		}));
	}
}