import { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([
    "Learn React",
    "Build API",
  ]);

  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task.trim() !== "") {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  return (
    <div className="max-w-xl bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <div className="flex gap-3 mb-6">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border flex-1 rounded-lg p-3"
          placeholder="Add new task"
        />

        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-5 rounded-lg"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="bg-gray-100 p-3 rounded">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;