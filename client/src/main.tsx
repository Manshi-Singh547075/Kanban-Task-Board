import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "./hooks/useIsMobile";

// Choose the appropriate backend based on device
const backend = isMobile() ? TouchBackend : HTML5Backend;

// Get the root element
const rootElement = document.getElementById("root");

// Create root and render app
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <DndProvider backend={backend}>
      <App />
    </DndProvider>
  );
}
