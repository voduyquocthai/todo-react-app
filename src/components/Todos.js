import React, { Fragment, useState } from 'react'
import AddTodo from './AddTodo'
import axios from 'axios'
import TodoItem from './TodoItem'

const Todos = () => {
  const [todosState, setTodosState] = useState([])

  const markComplete = id => {
    const newTodos = todosState.map(todo => {
      if(todo.id === id) todo.completed = !todo.completed;
      return todo
    });

    setTodosState(newTodos);
  }

  const deleteTodo = async id => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const newTodos = todosState.filter(todo => todo.id !== id);
      setTodosState(newTodos);
    } catch (error) {
      console.log(error.message);
    }
  }

  const addTodo = async title => {
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/todos',
      {
        title,
        completed: false
      });

      console.log(res.data);
      const newTodos = [...todosState, res.data];
      setTodosState(newTodos);
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Fragment>
        <AddTodo addTodoFunc={addTodo}/>
        {todosState.map(todo => {
          return (
            <TodoItem 
              key={todo.is}
              todo={todo}
              markCompleteFunc={markComplete}
              deleteTodoFunc={deleteTodo}
            />
          )
        })}
    </Fragment>
  )
}

export default Todos