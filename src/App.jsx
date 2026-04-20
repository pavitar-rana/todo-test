import { useState } from 'react'
import './App.css'

const FILTERS = ['All', 'Active', 'Completed']
const personName = import.meta.env.VITE_PERSON_NAME || 'there'

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Build something awesome', done: false },
    { id: 2, text: 'Test the dev cycle', done: false },
  ])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('All')

  const addTodo = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setTodos([...todos, { id: Date.now(), text: trimmed, done: false }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const clearCompleted = () => setTodos(todos.filter(t => !t.done))

  const visible = todos.filter(t => {
    if (filter === 'Active') return !t.done
    if (filter === 'Completed') return t.done
    return true
  })

  const remaining = todos.filter(t => !t.done).length

  return (
    <div className="app">
      <p className="greeting">Hey, {personName}</p>
      <h1>todos</h1>

      <form onSubmit={addTodo} className="add-form">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        <button type="submit">Add</button>
      </form>

      <div className="card">
        {visible.length === 0 ? (
          <p className="empty">No todos here.</p>
        ) : (
          <ul className="todo-list">
            {visible.map(todo => (
              <li key={todo.id} className={todo.done ? 'done' : ''}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>✕</button>
              </li>
            ))}
          </ul>
        )}

        <div className="footer">
          <span>{remaining} item{remaining !== 1 ? 's' : ''} left</span>
          <div className="filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={filter === f ? 'active' : ''}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="clear" onClick={clearCompleted}>Clear done</button>
        </div>
      </div>
    </div>
  )
}
