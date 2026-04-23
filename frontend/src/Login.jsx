import { useState } from "react";
import './index.css';
import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      // Save token
      localStorage.setItem("token", data.access_token);
    // 🚀 redirect
      navigate("/tasks");

    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.h2} >Welcome Back</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
container: {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: `
    linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
    url('/login-background.jpg')
  `,
  backgroundSize: "cover",
  backgroundPosition: "center",
},
form: {
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)", // for Safari
  borderRadius: "16px",
  padding: "2rem",
  width: "320px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
},
  h2: {
    color: "white", 
    textAlign: "center"
   },
input: {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.2)",
  color: "#fff",
  outline: "none",
},
button: {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "rgba(0,0,0,0.6)",
  color: "white",
  cursor: "pointer",
  transition: "0.2s ease",
},
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
};

export default Login;