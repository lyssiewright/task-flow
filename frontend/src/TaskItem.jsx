import { useState } from "react";

function TaskItem({ task, onDelete }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
        style={{
        ...styles.taskItemCard,
        transform: hovered ? "translateY(-4px) scale(1.01)" : "none",
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,0.3)"
          : "0 8px 32px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button style={styles.deleteButton} onClick={() => onDelete(task.id)}>&times;</button>
      <h3 style={styles.title}>{task.title}</h3>
      <p style={styles.content}>{task.task_content}</p>
    </div>
  );
}

const styles = {
    taskItemCard: {
      background: "rgba(255, 255, 255, 0.14)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "16px",
      padding: "16px",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease",
      height: "15rem",
      overflow: "auto"
    },
    deleteButton: {
      top: "1rem",
      right: "1rem",
      position: "absolute",
      borderRadius: "6px", 
      background: "none",
      border: "none",
      fontSize: "1rem"
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "600",
      paddingTop: "0.5rem"
    },
    content: {
      fontSize: "0.95rem",
    },
}

export default TaskItem;