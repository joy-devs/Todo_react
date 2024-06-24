import React, { useState, useReducer } from 'react';
import './App.css';
import bgDesktopDark from './assets/images/bg-desktop-dark.jpg';

export interface Content {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: 'ADD_TASK'; text: string }
  | { type: 'TOGGLE_TASK'; id: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'DELETE_TASK'; id: number }
  | { type: 'UPDATE_TASK'; id: number; text: string };

const tasksReducer = (state: Content[], action: Action): Content[] => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask: Content = {
        id: state.length + 1,
        text: action.text,
        completed: false,
      };
      return [...state, newTask];
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case 'CLEAR_COMPLETED':
      return state.filter((task) => !task.completed);
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.id);
    case 'UPDATE_TASK':
      return state.map((task) =>
        task.id === action.id ? { ...task, text: action.text } : task
      );
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, [
    { id: 1, text: 'Complete online JavaScript course', completed: true },
    { id: 2, text: 'Jog around the park 3x', completed: false },
    { id: 3, text: '10 minutes meditation', completed: false },
    { id: 4, text: 'Read for 1 hour', completed: false },
    { id: 5, text: 'Pick up groceries', completed: false },
    { id: 6, text: 'Complete Todo App on Frontend Mentor', completed: false }
  ]);
  const [filter, setFilter] = useState<string>('all');
  const [text, setText] = useState<string>('');

  const addTask = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TASK', text });
      setText('');
    }
  };

  const toggleTask = (id: number) => {
    dispatch({ type: 'TOGGLE_TASK', id });
  };

  const deleteTask = (id: number) => {
    dispatch({ type: 'DELETE_TASK', id });
  };

  const updateTask = (id: number, newText: string) => {
    dispatch({ type: 'UPDATE_TASK', id, text: newText });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="todo">
      <img src={bgDesktopDark} alt="header" className="header-image" />
      <div className="container">
        <header className="header">
          <h1>TODO</h1>
          <button className="theme-toggle">
            <span role="img" aria-label="toggle theme">🌞</span>
          </button>
        </header>
        <div className="content-input">
          <input
            type="text"
            placeholder="Create a new todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className='btn' onClick={addTask}>Add Task</button>
        </div>
        <ul className="content-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={`content-item ${task.completed ? 'completed' : ''}`}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.text}</span>
              </label>
              <button className='delete' onClick={() => deleteTask(task.id)}>Delete</button>
              <input
                type="text"
                value={task.text}
                onChange={(e) => updateTask(task.id, e.target.value)}
              />
            </li>
          ))}
        </ul>
        <footer className="footer">
          <span>{tasks.filter((task) => !task.completed).length} items left</span>
          <div className="filters">
            <button
              className={filter === 'all' ? 'selected' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={filter === 'active' ? 'selected' : ''}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={filter === 'completed' ? 'selected' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <button className="clear-completed" onClick={clearCompleted}>
            Clear Completed
          </button>
        </footer>
      </div>
    </div>
  );
};

export default App;
