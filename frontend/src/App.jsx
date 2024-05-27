import Login from "./pages/login/Login";
import "../scss/index.css";
import { useThemeContext } from "./context/theme";
import { Button } from "./components/ui/button";
import Light from "./assets/icons/light.png";
import Dark from "./assets/icons/dark.png";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect } from "react";
import Signup from "./pages/signup/Signup";
import Sidebar from "./elements/Sidebar";

export default function App() {
  const { theme, themeToggler } = useThemeContext();
  useEffect(() => {
    console.log(theme);
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
        <Sidebar />
      </div>
    </main>
  );
}
