import React from "react";
import "./Todo.css";

interface ITodoProps extends ITodo {
  handleUpdate: (newTodo: ITodo) => void;
}

const Todo: React.FC<ITodoProps> = ({
  name,
  description,
  status,
  handleUpdate,
}) => {
  return (
    <div>
      <span className={status ? "strike" : ""}>
        Name: {name}, Description: {description}
      </span>
      <button onClick={() => handleUpdate({ name, description, status: true })}>
        Done!
      </button>
    </div>
  );
};

export default Todo;
