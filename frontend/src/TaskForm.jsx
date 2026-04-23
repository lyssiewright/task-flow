import { useState } from "react";

function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      title,
      task_content: content,
    });

    setTitle("");
    setContent("");
  };

  return (
    <div style={styles.taskFormContainer}>
      <form onSubmit={handleSubmit} style={styles.taskForm}>
        <h2>Add Task</h2>
        <input
          style={styles.input}
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="taskInput"
          style={styles.textarea}
          placeholder="Task details"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

const styles = {
    taskFormContainer: {
      display: "flex",
      justifyContent: "center"
    },
    taskForm: {
      background: "rgba(255, 255, 255, 0.14)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "16px",
      padding: "16px",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease",
      marginBottom: "1rem",
      width: "25rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    input: {
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.2)",
      color: "#fff",
      outline: "none",
      width: "75%",
      marginBottom: "1rem",
    },
    textarea: {
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.2)",
      color: "#fff",
      outline: "none",
      width: "75%",
      marginBottom: "1rem",
      height: "8rem", 
      fontFamily: "arial", 
      fontColor: "white",
    },
}

export default TaskForm;