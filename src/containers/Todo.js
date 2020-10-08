import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Container, Table, Header, Form, Checkbox, Icon } from 'semantic-ui-react';

import {
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
	resetError
} from '../actions/Todo';

const Todo = () => {
	const [addText, setAddText] = useState('');
	const [editText, setEditText] = useState('');
	const [selected, setSelected] = useState(null);
	const [deleted, setDeleted] = useState(null);
	const {
		todos,
		loading,
		loadingAdd,
		hasAdded,
		loadingUpdate,
		hasUpdated,
		loadingDelete,
		hasDeleted,
		error
	} = useSelector(state => state.todoReducer);
	const dispatch = useDispatch();

	// Load todos
	useEffect(() => {
		dispatch(getTodos());
	}, [dispatch]);

	// Show error if any
	useEffect(() => {
		if (error) {
			alert(error);
		}
		return () => {
			dispatch(resetError());
		}
	}, [dispatch, error]);

	// Check hasAdded
	useEffect(() => {
		if (hasAdded) {
			setAddText('')
		}
	}, [hasAdded]);

	// Check hasUpdated
	useEffect(() => {
		if (hasUpdated && selected) {
			setEditText('');
			setSelected(null);
		}
	}, [hasUpdated, selected]);

	// Check hasDeleted
	useEffect(() => {
		if (hasDeleted && deleted) {
			setDeleted(null);
		}
	}, [hasDeleted, deleted]);

	const handleAddTextChange = event => {
		setAddText(event.target.value);
	};

	const handleAddSubmit = event => {
		event.preventDefault();
		const text = addText.trim();

		if (text.length > 0) {
			dispatch(addTodo({
				todos,
				text
			}))
		}
	}

	const handleUpdateTextChange = event => {
		setEditText(event.target.value);
	};

	const handleUpdateSubmit = event => {
		event.preventDefault();
		const text = editText.trim();

		if (text.length > 0) {
			dispatch(updateTodo({
				todos,
				todo: selected,
				text,
				checked: selected.checked
			}))
		}
	}

	const handleToggleChecked = todo => {
		dispatch(updateTodo({
			todos,
			todo,
			text: todo.text,
			checked: !todo.checked
		}));
	}

	const handleDelete = todo => {
		setDeleted(todo);
		dispatch(deleteTodo({
			todos,
			todo
		}));
	};

	const renderTableBody = todos => {
		if (todos.length === 0) {
			return (
				<Table.Row>
					<Table.Cell colSpan={3} >No tasks</Table.Cell>
				</Table.Row>
			);
		} else {
			return todos.map(todo => (
				<Table.Row
					key={todo.id}
					disabled={deleted && deleted.id === todo.id && loadingDelete}
				>
					<Table.Cell collapsing>
						<Checkbox
							slider
							defaultChecked={todo.checked}
							onChange={() => handleToggleChecked(todo)}
						/>
					</Table.Cell>
					<Table.Cell>
						{selected && selected.id === todo.id && (
							<Form size="tiny" noValidate onSubmit={handleUpdateSubmit}>
								<Form.Group style={{ margin: 0 }}>
									<Form.Input
										fluid
										placeholder="Update task"
										width={16}
										onChange={handleUpdateTextChange}
										value={editText}
										disabled={loadingUpdate}
									/>
								</Form.Group>
							</Form>
						)}
						{(!selected || (selected && selected.id !== todo.id)) && (
							<span style={{ ...(todo.checked ? { textDecoration: 'line-through' } : {}) }}>{todo.text}</span>
						)}
					</Table.Cell>
					<Table.Cell style={{ textAlign: 'right' }}>
						{!selected && !deleted && (
							<React.Fragment>
								<Icon
									link
									name="edit"
									size="large"
									onClick={() => {
										setEditText(todo.text);
										setSelected(todo);
									}}
								/>
								<Icon
									link
									name="trash"
									size="large"
									onClick={() => handleDelete(todo)}
								/>
							</React.Fragment>
						)}
						{selected && selected.id === todo.id && (
							<Icon
								link
								name="cancel"
								size="large"
								onClick={() => {
									setEditText('');
									setSelected(null);
								}}
							/>
						)}
					</Table.Cell>
				</Table.Row>
			));
		}
	};

	return (
		<Container style={{ marginTop: '3em' }}>
			<Header as="h1">Todo List</Header>
			<Segment loading={loading}>
				<Form size="huge" noValidate onSubmit={handleAddSubmit}>
					<Form.Group>
						<Form.Input
							fluid
							placeholder="Enter task"
							width={16}
							onChange={handleAddTextChange}
							value={addText}
							disabled={loadingAdd}
						/>
					</Form.Group>
				</Form>
				<Table size="large" definition singleLine>
					<Table.Header fullWidth>
						<Table.Row>
							<Table.HeaderCell width={1} />
							<Table.HeaderCell>Todo</Table.HeaderCell>
							<Table.HeaderCell width={2} />
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{renderTableBody(todos)}
					</Table.Body>
				</Table>
			</Segment>
		</Container>
	)
};

export default Todo;
