import React, { useEffect, useState } from "react";
import "./TodoList.css";
import { useSnackbar } from "react-simple-snackbar";
import FadeIn from "react-fade-in";
import TextareaAutosize from "react-textarea-autosize";

interface ITask {
  name: string;
  description: string;
  status: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [isShowDescriptionInput, setShowDescriptionInput] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [deleting, setDeleting] = useState(-1);
  const [openSnackbar, closeSnackbar] = useSnackbar({
    style: { color: "#ff7a88" },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDescription(e.target.value);
  // };

  const handleDelete = async (i: number) => {
    if (deleting !== -1) return;
    setDeleting(i);
    const res = await fetch(`/delete-todo/${i}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTimeout(async () => {
      await getTasks();
      setDeleting(-1);
    }, 500);
  };

  const handleUpdate = async (
    i: number,
    name: string,
    description: string,
    status: boolean
  ) => {
    const res = await fetch(`/update-todo/${i}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        status,
      }),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "") {
      openSnackbar("You must include a name!", 3000);
    } else {
      await addTask(name, description);
      getTasks();
      setName("");
      setDescription("");
    }
  };

  const addTask = async (name: string, description: string) => {
    const res = await fetch("/add-todo", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        status: false,
      }),
    });
  };

  const getTasks = async () => {
    const res = await fetch("/todos");
    res
      .json()
      .then((res) => setTasks(res.todos))
      .catch((err) => console.log("Wait, that's illegal."));
  };

  useEffect(() => {
    getTasks();
  }, []);

  console.log(tasks);

  return (
    <div id="main">
      <div className="list-container" onMouseLeave={() => setHoverIndex(-1)}>
        <div
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            maxHeight: "80vh",
            padding: "20px 10px",
          }}
        >
          <div
            className="list-item"
            // onMouseOver={() => setShowDescriptionInput(true)}
            // onMouseLeave={() => {
            //   if (description === "") setShowDescriptionInput(false);
            // }}
          >
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Enter a new task..."
                ></input>
                <button className="icon-button" type="submit">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              {/* <input
                type="text"
                className={
                  isShowDescriptionInput
                    ? "description description-input-show"
                    : "description description-input-hide"
                }
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Add a description"
              ></input> */}
            </form>
          </div>
          {tasks.map((task, i) => (
            <div
              className="list-item"
              onMouseOver={() => setHoverIndex(i)}
              key={i}
            >
              <FadeIn>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "80%" }}>
                    <span className={deleting === i ? "name strike" : "name"}>
                      {deleting !== i ? (
                        <TextareaAutosize
                          className="textarea"
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            const value = e.target.value;
                            setTasks((tasks) => {
                              const newTasks = tasks.slice(0);
                              Object.assign(newTasks[i], { name: value });
                              return newTasks;
                            });
                          }}
                          onBlur={() =>
                            handleUpdate(
                              i,
                              task.name,
                              task.description,
                              task.status
                            )
                          }
                          value={task.name}
                        />
                      ) : (
                        task.name
                      )}
                    </span>
                  </div>
                  {hoverIndex === i && (
                    <div style={{ flexGrow: 1 }}>
                      <button
                        className="icon-button"
                        onClick={() => handleDelete(i)}
                      >
                        <i
                          className="fas fa-check"
                          style={{ color: deleting ? "#77ba6e" : "#c0cfbe" }}
                        ></i>
                      </button>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
