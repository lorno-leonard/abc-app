import { all } from 'redux-saga/effects';
import {
	watchGetTodos,
	watchAddTodo,
	watchUpdateTodo,
	watchDeleteTodo
} from './Todo';

export default function* rootSaga() {
	yield all([
		watchGetTodos(),
		watchAddTodo(),
		watchUpdateTodo(),
		watchDeleteTodo()
	]);
}