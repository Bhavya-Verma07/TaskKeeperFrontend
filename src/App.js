import React, { useEffect, useState } from "react";
import "./index.css";
import Tooltip from '@mui/material/Tooltip';


const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id, type) => {
    const data = await fetch(`${API_BASE}/todo/complete/${id}/${type}`).then((res) =>
      res.json()
    );
    GetTodos();
  };



  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    })
    const res= await data.json()
    // setTodos((res) => todos.filter((todo) => todo._id !== data._id));
    GetTodos();
    console.log(res);
  };

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  };

  return (
    <div className="App">
      <h1>Welcome, Bhavya!</h1>
      <h3 style={{color:"beige", marginBottom:"10px"}}>Your tasks here</h3>

      <div className="todos">
        {todos.map((todo) => (
          <div
            // className="todo is-complete"
            className={(todo.complete)? "todo is-complete":"todo" }
            key={todo._id}
            // onClick={() => completeTodo(todo._id)}
          >
            <div className="checkbox"  onClick={() => completeTodo(todo._id, !todo.complete)}></div>

            <div className="text">{todo.text}</div>
            
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              X
            </div>
          </div>
          ))}
      </div>
      <Tooltip title="Add new task" placement="top-end">
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
          </Tooltip>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            x
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
