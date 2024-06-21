import React, { useState } from 'react';
import './App.css';
import bgDesktopDark from './assets/images/bg-desktop-dark.jpg';

export interface Content {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Content[]>([
    { id: 1, text: 'Complete online JavaScript course', completed: true },
    { id: 2, text: 'Jog around the park 3x', completed: false },
    { id: 3, text: '10 minutes meditation', completed: false },
    { id: 4, text: 'Read for 1 hour', completed: false },
    { id: 5, text: 'Pick up groceries', completed: false },
    { id: 6, text: 'Complete Todo App on Frontend Mentor', completed: false }
  ]);
  const [filter, setFilter] = useState<string>('all');
  const [text, setText] = useState<string>('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      const newTask: Content = {
        id: tasks.length + 1,
        text,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setText('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
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
        <form onSubmit={addTask} className="content-input">
          <input type="text"
            placeholder="Create a new todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
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
