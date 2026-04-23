import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Tasks from "./Tasks";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;