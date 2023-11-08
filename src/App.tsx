import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { THEME } from "./consts";

const App = () => {

  const [theme, colorMode] = useMode();
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", THEME.LIGHT);
  }

  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={Router}/>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
