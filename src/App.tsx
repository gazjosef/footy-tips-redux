import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"; // adjust path as needed
import AppRouter from "./routes/AppRouter"; // your routes
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
