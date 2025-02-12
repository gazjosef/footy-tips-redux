import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "../context/authContext";

// Layout
import Navbar from "../layout/Navbar";

// Pages & Components
import Tipping from "../pages/Tipping";
import PrivateRoute from "../pages/PrivateRoute";
import LoginForm from "../feature/LoginForm";
import RegisterForm from "../feature/RegisterForm";

import "../styles/index.scss";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Tipping />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/tipping"
              element={
                <PrivateRoute>
                  <Tipping />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
