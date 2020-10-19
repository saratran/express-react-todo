import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import "./App.css";
import { getTodos, addTodo } from "./API";

const App = () => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    getTodos().then((res) => setTodos(res.todos));
  }, []);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page from reloading after submit
    if (nameInput === "") return; // No blank names
    addTodo(nameInput, descriptionInput).then((res) =>
      setTodos((todos) => [...todos, res.todo])
    );
    setNameInput(""); // Clears text field after submit
    setDescriptionInput(""); // Clears text field after submit
  };

  const handleUpdateTodo = (i: number, newTodo: ITodo) => {
    setTodos((todos) => {
      let updatedTodos = todos.slice(); // copy the array - we don't want to mutate the current one!
      updatedTodos[i] = newTodo;
      return updatedTodos;
    });
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNameInput(e.target.value);
          }}
          value={nameInput}
          placeholder="Name"
        />
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescriptionInput(e.target.value);
          }}
          value={descriptionInput}
          placeholder="Description"
        />
        <button type="submit">Add</button>
      </form>

      {todos.map((todo, i) => (
        <Todo
          key={i}
          name={todo.name}
          description={todo.description}
          status={todo.status}
          handleUpdate={(newTodo: ITodo) => handleUpdateTodo(i, newTodo)}
        />
      ))}
    </div>
  );
};

export default App;
