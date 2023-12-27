import React, { FormEvent } from "react";

type Todo = {
  name: string;
  description: string;
  isDone: boolean;
};

function App() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title && desc) {
      const newTodo: Todo = {
        name: title,
        description: desc,
        isDone,
      };
      setTodos([...todos, newTodo]);
    }
  };
  return (
    <div>
      <div>
        <input
          placeholder="Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <input
          placeholder="Desc"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDesc(e.target.value)
          }
        />
        <button onClick={handleSubmit}>Add Todo</button>
      </div>
      <div>
        {todos.map((todo) => (
          <div>
            <h1>{todo.name}</h1>
            <h2>{todo.description}</h2>
            {isDone ? (
              <button>Done</button>
            ) : (
              <button onClick={() => setIsDone(true)}>Mark as done</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
