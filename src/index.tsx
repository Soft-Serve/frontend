import React from "react";
import { createRoot } from "react-dom/client";

import "./styles/tailwind.css";
import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
