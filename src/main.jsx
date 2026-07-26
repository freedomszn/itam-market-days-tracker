import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import App from "./App.jsx";
import "./styles.css";
// import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Analytics /> */}
    <App />
  </React.StrictMode>,
);
