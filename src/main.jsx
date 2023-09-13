import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import HTMLTemplateFormEditorPage from "./Pages/HTMLTemplateFormEditor/Index.jsx";
import CodeEditor from "./Pages/CodeEditor/Index.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/html-template-form-editor",
    element: <HTMLTemplateFormEditorPage />,
  },
  {
    path: "/code-editor",
    element: <CodeEditor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
