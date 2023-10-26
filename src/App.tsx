import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

const App = () => {

  const [theme, colorMode] = useMode();

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
