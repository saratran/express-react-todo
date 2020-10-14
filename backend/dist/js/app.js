"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoListDb = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
// Using an array as mock database
exports.todoListDb = [];
const app = express_1.default();
// Specifying localhost port
const PORT = process.env.PORT || 4000;
// Applying middleware
app.use(cors_1.default());
app.use(body_parser_1.default.json()); // To parse json body in HTTP request
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Telling express to use todoRoutes as the router
app.use(routes_1.default);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
