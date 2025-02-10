import React from "react"; // useEffect // lazy, // Suspense,
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tipping from "../pages/Tipping";

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// // const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
// console.log("Supabase URL:", SUPABASE_URL);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tipping />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
