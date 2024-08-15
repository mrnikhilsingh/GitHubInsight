import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Home searchQuery={searchQuery} />
    </ThemeProvider>
  );
}

export default App;
