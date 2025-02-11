import React from "react"; // useEffect // lazy, // Suspense,
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";

// Context
import { AuthProvider } from "../context/authContext";

import Navbar from "../layout/Navbar";
// Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tipping from "../pages/Tipping";
import PrivateRoute from "../pages/PrivateRoute";

import "../styles/index.scss";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Tipping />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tipping"
            element={
              <PrivateRoute>
                <Tipping />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
