import React, {useState, useEffect} from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import axios from 'axios';
import {DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableSelectRow, TableSelectAll, TableContainer} from 'carbon-components-react';


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



  const rows = [
    {
      id: 'a',
      task: 'Load balancer 1',
      completed: false,
    },
    {
      id: 'b',
      task: 'Load balancer 2',
      completed: false,
    },
    {
      id: 'c',
      task: 'Load balancer 3',
      completed: false,
    },
  ];


  const headers = [
    {
      key: 'task',
      header: 'Task',
    },
    {
      key: 'completed',
      header: 'Completed',
    },
  ];



  return (  
    <div className="App">
      <header className="App-header">
      <p>ToDo</p>
      <TodoForm addTodo={addTodo}/>
      <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo}/>
      
      <DataTable rows={todos} headers={headers}>
  {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
    <Table {...getTableProps()}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader {...getHeaderProps({ header })}>
              {header.header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow {...getRowProps({ row })}>
            {row.cells.map((cell) => {
              
              return <TableCell key={cell.id}>{cell.value}</TableCell>
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</DataTable>


<DataTable
        rows={todos}
        headers={headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getSelectionProps,
          selectAll,
        }) => (
          <React.Fragment>
            <TableContainer title="DataTable">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map(header => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </React.Fragment>
        )}
      />


      </header>
    </div>
  );
}

export default App;
