import React from "react";
import SnackbarProvider from "react-simple-snackbar";
import TodoList from "./TodoList";

export default function App() {
  return (
    <SnackbarProvider>
      <TodoList />
    </SnackbarProvider>
  );
}
