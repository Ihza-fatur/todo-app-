import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setTodos(savedTodos);
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [todos, darkMode]);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { text: input.trim(), done: false }]);
    setInput('');
  };

  const toggleTodo = (index) => {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    ));
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'done') return todo.done;
    if (filter === 'active') return !todo.done;
  });

  return (
    <div>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-4">
        <div className="flex justify-between w-full max-w-md mb-4">
          <h1 className="text-3xl font-bold">Simple Todo App</h1>
          <button
            className="text-sm border rounded px-2 py-1"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>

        <div className="flex space-x-2 w-full max-w-md">
          <input
            className="border p-2 rounded flex-grow dark:bg-gray-800 dark:border-gray-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add todo..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        <div className="flex space-x-2 my-4">
          <button
            className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`px-2 py-1 rounded ${filter === 'done' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setFilter('done')}
          >
            Done
          </button>
        </div>

        <ul className="w-full max-w-md space-y-2">
          {filteredTodos.map((todo, index) => (
            <li key={index} className="bg-white dark:bg-gray-800 p-2 rounded shadow flex justify-between items-center">
              <span
                onClick={() => toggleTodo(index)}
                className={`cursor-pointer ${todo.done ? 'line-through text-gray-400' : ''}`}
              >
                {todo.text}
              </span>
              <button
                className="text-red-500"
                onClick={() => removeTodo(index)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}