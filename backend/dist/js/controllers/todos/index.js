"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const app_1 = require("../../app");
const todo_1 = require("../../models/todo");
// Request and Response parameters are HTTP request and response, supplied by the Express app
const getTodos = (req, res) => {
    res.status(200).json({ todos: app_1.todoListDb });
};
exports.getTodos = getTodos;
const addTodo = (req, res) => {
    const body = req.body;
    const newTodo = new todo_1.Todo(body.name, body.description, body.status);
    app_1.todoListDb.push(newTodo);
    res
        .status(201)
        .json({ message: "Todo added", todo: newTodo, todos: app_1.todoListDb });
};
exports.addTodo = addTodo;
const updateTodo = (req, res) => {
    const { params: { id }, } = req;
    const { name, description, status } = req.body;
    let updatedTodo = app_1.todoListDb[Number(id)];
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
        todos: app_1.todoListDb,
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const { params: { id }, } = req;
    let deletedTodo = app_1.todoListDb[Number(id)];
    if (deletedTodo === undefined) {
        res.status(403).json({
            message: "Invalid ID",
        });
    }
    app_1.todoListDb.splice(Number(id), 1);
    res.status(200).json({
        message: "Todo deleted",
        todo: deletedTodo,
        todos: app_1.todoListDb,
    });
};
exports.deleteTodo = deleteTodo;
