import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";

const router: Router = Router();

router.get("/todos", getTodos);
router.get("/", getTodos);

router.post("/add-todo", addTodo);

router.put("/update-todo/:id", updateTodo);

router.delete("/delete-todo/:id", deleteTodo);

export default router;
