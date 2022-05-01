import React, {useState, useEffect} from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import axios from 'axios';

const localStorageKey="react-todos"

function App() {

  const [todos, setTodos]= useState([]);

  useEffect(() => {
   // const storedTodos= JSON.parse(localStorage.getItem(localStorageKey));

   // if(storedTodos){
   //   setTodos(storedTodos);  
   // }

    //change
    axios.get(`http://localhost:3001/todo`)
      .then(res => {
        const notes = res.data;
        setTodos(notes);
        console.log(notes);
      })

  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
   
  }, [todos])

  //adds todo to an array of todos
  function addTodo(todo){
    setTodos([todo, ...todos]);

    //change
    axios.post(`http://localhost:3001/todo`, { ...todo })
      .then(res => {
       // setTodos([todo, ...todos]);
        console.log(res);
        console.log(res.data);
      })
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

    axios.delete(`http://localhost:3001/todo/${id}`)
      .then(res => {
        console.log(res);
        //console.log(res.data);
      })
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
