import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Force Tailwind CSS to process all styles
createRoot(document.getElementById("root")).render(<App />);
