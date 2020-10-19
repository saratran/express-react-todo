export const getTodos = async () => {
  const res = await fetch("/todos");
  return res.json();
};

export const addTodo = async (name: string, description: string) => {
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
  return res.json();
};
