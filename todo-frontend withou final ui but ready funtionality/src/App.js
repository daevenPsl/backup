import React, {useState, useEffect} from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const localStorageKey="react-todos"

function App() {

  const [todos, setTodos]= useState([]);

  useEffect(() => {
    const storedTodos= JSON.parse(localStorage.getItem(localStorageKey));

    if(storedTodos){
      setTodos(storedTodos);  
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }, [todos])

  //adds todo to an array of todos
  function addTodo(todo){
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id){
    setTodos(todos.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    }))
  }

  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (  
    <div className="App">
      <header className="App-header">
      <p>ToDo</p>
      <TodoForm addTodo={addTodo}/>
      <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo}/>
      </header>
    </div>
  );
}

export default App;
