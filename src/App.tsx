import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "./context/authContext";

// Layout
// import Navbar from "../layout/Navbar";
import Header from "../layout/header/Header";

// Pages & Components
import Tipping from "./pages/Tipping";
import PrivateRoute from "./pages/PrivateRoute";
import LoginForm from "./feature/LoginForm";
import RegisterForm from "./feature/RegisterForm";

import "./styles/index.scss";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <Header />
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
            <Route path="/tips" element={<Tipping />} />
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
