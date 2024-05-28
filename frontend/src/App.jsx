import Login from "./pages/login/Login";
import "../scss/index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useThemeContext } from "./context/theme";
import { Button } from "./components/ui/button";
import Light from "./assets/icons/light.png";
import Dark from "./assets/icons/dark.png";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect } from "react";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { useAuthContext } from "./context/authContext";

export default function App() {
  const { theme, themeToggler } = useThemeContext();
  const { authUser } = useAuthContext();
  useEffect(() => {
    toast(`Theme Changed To: ${theme === "L" ? "Light" : "Dark"}`);
  }, [theme]);
  return (
    <main className={`${theme === "L" ? "L" : "D"}`}>
      <Toaster />
      <div className="theme-toggle">
        <Button onClick={themeToggler} variant="primary">
          {theme === "L" ? <img src={Light} /> : <img src={Dark} />}
        </Button>
      </div>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </div>
    </main>
  );
}
