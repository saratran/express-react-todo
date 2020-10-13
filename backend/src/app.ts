import { Todo } from "./models/todo";
import express, { Express } from "express"
import cors from "cors"
import todoRoutes from "./routes"
import bodyParser from "body-parser";

// Using an array as mock database
export let todoListDb: Array<Todo> = []
const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Telling express to use todoRoutes as the router
app.use(todoRoutes)


app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
)