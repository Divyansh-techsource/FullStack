import { useState, useEffect } from "react";
import "./App.css";

const API = "http://localhost:5050/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET: Fetch all tasks
  useEffect(() => {
    let ignore = false;

    async function getTasks() {
      try {
        const response = await fetch(API);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch tasks");
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid response from server");
        }

        if (!ignore) {
          setTasks(data);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Unable to connect to server");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    getTasks();

    return () => {
      ignore = true;
    };
  }, []);

  // POST: Add a task
  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add task");
      }

      setTasks((prev) => [data, ...prev]);
      setTitle("");
      setDescription("");
      setError("");
    } catch (err) {
      setError(err.message || "Failed to add task");
    }
  };

  // DELETE: Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      setTasks((prev) => prev.filter((task) => task._id !== id));

      setError("");
    } catch (err) {
      setError(err.message || "Failed to delete task");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Task Manager</h1>
        <p>Organize your daily tasks</p>
      </header>

      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      <section className="form-card">
        <h2>Add New Task</h2>

        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Enter task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" className="add-btn">
            + Add Task
          </button>
        </form>
      </section>

      <section className="tasks-section">
        <div className="list-heading">
          <h2>My Tasks</h2>
          <span>
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        {loading ? (
          <p className="empty">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty">No tasks available. Add your first task!</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div className="task" key={task._id}>
                <div className="task-details">
                  <h3>{task.title}</h3>
                  <p>{task.description || "No description provided"}</p>
                </div>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
