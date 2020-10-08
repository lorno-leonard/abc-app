import { combineReducers } from 'redux';
import Todo from './Todo';

const rootReducer = combineReducers({
	todoReducer: Todo
});

export default rootReducer;