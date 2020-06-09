import React from 'react';
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
