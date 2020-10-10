import { Request, Response } from "express";
import { todoListDb } from "../../app";
import { Todo } from "../../models/todo";

// Request and Response parameters are HTTP request and response, supplied by the Express app
const getTodos = (req: Request, res: Response) => {
    res.status(200).json({ todos: todoListDb })
}

const addTodo = (req: Request, res: Response) => {
    // TODO
    // Send a response to the front end as a JSON object in the form of:
    // { message: "Todo added", todo: newTodo, todos: allTodos }
}

const updateTodo = (req: Request, res: Response) => {
    // TODO
    // Send a response to the front end as a JSON object in the form of:
    // { message: "Todo updated", todo: updatedTodo, todos: allTodos}
}

const deleteTodo = (req: Request, res: Response) => {
    // TODO
    // Send a response to the front end as a JSON object in the form of:
    // { message: "Todo updated", todo: deletedTodo, todos: allTodos}
}

// TODO: export addTodo, updateTodo, deleteTodo
export { getTodos }