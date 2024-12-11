import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../public/assets/css/index.css";
import App from "./App";
import Context from "./context-reducer/Context";
import { ThemeProvider } from "@material-tailwind/react";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Context>
        <App />
      </Context>
    </ThemeProvider>
  </StrictMode>
);
