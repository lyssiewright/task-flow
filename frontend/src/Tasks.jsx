import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const data = await res.json();
        setTasks(data);

      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

    const handleCreateTask = async (taskData) => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    const newTask = await res.json();

    setTasks((prev) => [...prev, newTask]);
    };

    const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");

    try {
    const res = await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

  } catch (err) {
    console.error(err);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

 return (
    <div style={styles.pageContainer}>
      <h1>Your Tasks</h1>
      <TaskForm onCreate={handleCreateTask}/>
      <div style={styles.tasksContainer}>{tasks.length === 0 ? (
        <p>No tasks yet</p>) : 
        (tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDeleteTask}/>
        ))
      )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

const styles = {
    pageContainer: {
        minHeight: "100vh",
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/login-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",
    },
    tasksContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        columnGap: "1rem",
    }
}

export default Tasks;