/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "L");

  function themeToggler() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "L" ? "D" : "L";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeToggler }}>
      {children}
    </ThemeContext.Provider>
  );
};
