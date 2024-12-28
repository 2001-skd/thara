import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../public/assets/css/index.css";
import "../public/assets/css/style.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
