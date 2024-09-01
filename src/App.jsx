import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

function App() {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")),
  );

  function handleThemeSwitch() {
    setIsDark(!isDark);
    localStorage.setItem("isDark", !isDark);
  }

  useEffect(() => {
    if (isDark) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [isDark]);

  return (
    <ThemeProvider theme={theme}>
      <Header isDark={isDark} handleThemeSwitch={handleThemeSwitch} />
      <Home isDark={isDark} />
    </ThemeProvider>
  );
}

export default App;
