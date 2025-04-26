import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [toDoItems, setTodoItems] = useState(() => JSON.parse(localStorage.getItem('todos') || '[]'));
    const [input, setInput] = useState('');
  
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(toDoItems));
    }, [toDoItems]);
  
    const handleSave = (id) => {
      if (id !== null) {
        const updated = toDoItems.map((todo) =>
          todo.id === id
            ? { ...todo, text: input, timestamp: new Date().toISOString() }
            : todo
        );
        setTodoItems(updated);
      } else {
        const newTodo = {
          id: Date.now(),
          text: input,
          timestamp: new Date().toISOString(),
        };
        setTodoItems([...toDoItems, newTodo]);
  
        // reminder after 10s
        setTimeout(() => {
          alert(`Reminder: deleting todo: ${newTodo.text}`);
          setTodoItems((prev) => prev.filter((t) => t.id !== newTodo.id));
        }, 10000);
      }
      setInput('');
    };
  
    const handleEdit = (todo) => {
      setInput(todo.text);
      handleSave(todo.id);
    };
  
    const handleDelete = (id) => {
      setTodoItems(toDoItems.filter((t) => t.id !== id));
    };
  
    return (
      <div className="todo-app">
        <h1>Todo List</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter todo..."
        />
        <button onClick={() => handleSave(null)} disabled={!input.trim()}>
          Save
        </button>
        <ul>
          {toDoItems.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span>
                {todo.text}
              </span>
              <div>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default App;