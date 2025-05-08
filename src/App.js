import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await API.get("TasksAPI", "/tasks");
      const parsed =
        typeof response === "string" ? JSON.parse(response) : response;
      const finalData = parsed.body ? JSON.parse(parsed.body) : parsed;
      setTasks(Array.isArray(finalData) ? finalData : []);
      setError(null);
      console.log("check point 1");
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks. Please try again.");
      setTasks([]);
      console.log("check point 2");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const createdTaskResponse = await API.post("TasksAPI", "/tasks", {
        body: newTask,
      });
      let taskData;
      if (typeof createdTaskResponse === "string") {
        try {
          taskData = JSON.parse(createdTaskResponse);
        } catch (parseErr) {
          throw new Error("Failed to parse response");
        }
      } else {
        taskData = createdTaskResponse;
      }
      if (!taskData || !taskData.id) {
        await fetchTasks();
      } else {
        setTasks([
          ...tasks,
          { ...taskData, createdAt: new Date().toISOString() },
        ]);
      }
      setNewTask({ title: "", description: "" });
      setError(null);
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await API.del("TasksAPI", `/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
      setError(null);
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <p>AWS Lambda & API Gateway with Amplify</p>
      </header>
      <div className="container">
        {error && <div className="error">{error}</div>}
        <form className="task-form" onSubmit={createTask}>
          <h2>Add New Task</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
        <div className="tasks-container">
          <h2>Tasks</h2>
          {loading && tasks.length === 0 ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks yet. Add one above!</p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className="task-item">
                  <div className="task-info">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <small>
                      Created:{" "}
                      {task.createdAt
                        ? new Date(task.createdAt).toLocaleString()
                        : "Unknown"}
                    </small>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
