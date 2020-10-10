"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const app_1 = require("../../app");
const todo_1 = require("../../models/todo");
const getTodos = (req, res) => {
    res.status(200).json({ todos: app_1.todoListDb });
};
exports.getTodos = getTodos;
const addTodo = (req, res) => {
    // const body = req.body as Pick<Todo, "name" | "description" | "status">
    console.log(req.body);
    const { name, description, status } = req.body;
    const newTodo = new todo_1.Todo(name, description, status);
    app_1.todoListDb.push(newTodo);
    res.status(201)
        .json({ message: "Todo added", todo: newTodo, todos: app_1.todoListDb });
};
exports.addTodo = addTodo;
const updateTodo = (req, res) => {
    const { params: { id }, } = req;
    const { name, description, status } = req.body;
    const index = id;
    let updateTodo = app_1.todoListDb[index];
    if (updateTodo === undefined) {
        res.status(403).json({
            message: "Invalid todo id"
        });
    }
    Object.assign(updateTodo, {
        name,
        description,
        status
    });
    res.status(200).json({
        message: "Todo updated",
        todo: updateTodo,
        todos: app_1.todoListDb,
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const { params: { id }, // id = index of element in array
    body } = req;
    const index = id;
    // TODO: check for invalid id
    const deletedTodo = app_1.todoListDb[index];
    app_1.todoListDb.splice(index, 1);
    res.status(200).json({
        message: "Todo deleted",
        todo: deletedTodo,
        todos: app_1.todoListDb,
    });
};
exports.deleteTodo = deleteTodo;
