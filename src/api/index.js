const url = 'https://huefazs7de.execute-api.ap-southeast-1.amazonaws.com/dev';

const getTodos = async () => {
	const response = await fetch(`${url}/todos`);
	return await response.json();
}

const getTodoById = async id => {
	const response = await fetch(`${url}/todos/${id}`);
	return await response.json();
}

const addTodo = async body => {
	const response = await fetch(`${url}/todos`, {
		method: 'POST',
		body: JSON.stringify(body)
	});
	return await response.json();
}

const updateTodo = async (id, body) => {
	const response = await fetch(`${url}/todos/${id}`, {
		method: 'PUT',
		body: JSON.stringify(body)
	});
	return await response.json();
}

const deleteTodo = async id => {
	const response = await fetch(`${url}/todos/${id}`, {
		method: 'DELETE'
	});
	return await response.json();
}

export default {
	getTodos,
	getTodoById,
	addTodo,
	updateTodo,
	deleteTodo
};