import { Request, Response } from "express";
import { todoListDb } from "../../app";
import { Todo } from "../../models/todo";

// Request and Response parameters are HTTP request and response, supplied by the Express app
const getTodos = (req: Request, res: Response) => {
  res.status(200).json({ todos: todoListDb });
};

const addTodo = (req: Request, res: Response) => {
  const body = req.body;

  const newTodo: Todo = new Todo(body.name, body.description, body.status);
  todoListDb.push(newTodo);

  res
    .status(201)
    .json({ message: "Todo added", todo: newTodo, todos: todoListDb });
};

const updateTodo = (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  const { name, description, status } = req.body;

  let updatedTodo = todoListDb[Number(id)];
  if (updatedTodo === undefined) {
    res.status(403).json({
      message: "Invalid ID",
    });
  }

  Object.assign(updatedTodo, {
    name,
    description,
    status,
  });

  res.status(200).json({
    message: "Todo updated",
    todo: updatedTodo,
    todos: todoListDb,
  });
};

const deleteTodo = (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  let deletedTodo = todoListDb[Number(id)];
  if (deletedTodo === undefined) {
    res.status(403).json({
      message: "Invalid ID",
    });
  }
  todoListDb.splice(Number(id), 1);

  res.status(200).json({
    message: "Todo deleted",
    todo: deletedTodo,
    todos: todoListDb,
  });
};

export { getTodos, addTodo, updateTodo, deleteTodo };
