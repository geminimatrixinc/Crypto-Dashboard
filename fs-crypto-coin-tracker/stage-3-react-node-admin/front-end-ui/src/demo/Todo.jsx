import React, { Component } from 'react';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            newTodo: '',
        };

       // this.removeTodo = this.removeTodo.bind(this)
    }

    addTodo = (task) => {
        this.setState((prevState) => ({
            todos: [...prevState.todos, task],
            newTodo: '', // Clear the input field
        }));
    };

    handleInputChange = (event) => {
        const taskText = event.target.value;
        console.log(taskText)
        this.setState({ newTodo: taskText });
    };

    handleAddTodo = (e) => {
        console.log(e)
        if (this.state.newTodo.trim() === '') return;
        this.addTodo(this.state.newTodo);
    };

    removeTodo = (index) => {
        const updatedTodos = [...this.state.todos];
        updatedTodos.splice(index, 1);
        this.setState({ todos: updatedTodos });
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Add a new task"
                    onChange={this.handleInputChange}
                    value={this.state.newTodo}
                />
                <button onClick={this.handleAddTodo}>Add</button>
                <ul>
                    {this.state.todos.map((todo, index) => (
                        <li key={index}>
                            {todo}
                            <button onClick={() => this.removeTodo(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;
