import { Request, Response } from "express";
import { todoListDb } from "../../app";
import { Todo } from "../../models/todo";

const getTodos = (req: Request, res: Response) => {
    res.status(200).json({ todos: todoListDb })
}

const addTodo = (req: Request, res: Response) => {
    // const body = req.body as Pick<Todo, "name" | "description" | "status">
    console.log(req.body)
    const { name, description, status } = req.body

    const newTodo: Todo = new Todo(name, description, status)
    todoListDb.push(newTodo)

    res.status(201)
        .json({ message: "Todo added", todo: newTodo, todos: todoListDb })
}

const updateTodo = (req: Request, res: Response) => {
    const {
        params: { id }, // id = index of element in array
    } = req
    const { name, description, status } = req.body
    const index: number = id as unknown as number
    let updateTodo = todoListDb[index]
    if (updateTodo === undefined) {
        res.status(403).json({
            message: "Invalid todo id"
        })
    }

    Object.assign(updateTodo, {
        name,
        description,
        status
    });

    res.status(200).json({
        message: "Todo updated",
        todo: updateTodo,
        todos: todoListDb,
    })
}

const deleteTodo = (req: Request, res: Response) => {
    const {
        params: { id }, // id = index of element in array
        body
    } = req

    const index: number = id as unknown as number
    // TODO: check for invalid id
    const deletedTodo = todoListDb[index]
    todoListDb.splice(index, 1);

    res.status(200).json({
        message: "Todo deleted",
        todo: deletedTodo,
        todos: todoListDb,
    })
}

export { getTodos, addTodo, updateTodo, deleteTodo }