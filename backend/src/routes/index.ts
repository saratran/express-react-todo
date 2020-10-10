import { Router } from "express"
import { getTodos } from "../controllers/todos"

const router: Router = Router()

router.get("/todos", getTodos)

// TODO: define routes for addTodo, updateTodo, deleteTodo

export default router