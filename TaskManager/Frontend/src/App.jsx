import { useState, useEffect } from "react";
import "./App.css";

const API = "http://localhost:5050/api/task";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // Used after adding a task (called from an event handler, so no lint warning)
  async function getTask() {
    try {
      const response = await fetch(API);
      if (!response.ok) return;
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }

  // Initial load
  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      try {
        const response = await fetch(API);
        if (!response.ok) return;
        const data = await response.json();
        if (!ignore) setTasks(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  async function addTask(e) {
    e.preventDefault(); // stop page reload on form submit
    if (!title.trim()) return;
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) return;
      setTitle("");
      getTask();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) return;
      setTasks((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div>
        <h1>Task Manager</h1>
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
            {tasks.map((item) => (
              <li key={item.id}>
                {item.title}{" "}
                <button onClick={() => deleteTask(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;