import React from "react"; // useEffect // lazy, // Suspense,
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";

// Context
import { AuthProvider } from "../context/authContext";

// Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tipping from "../pages/Tipping";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Tipping />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
