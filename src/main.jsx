import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { FormDataProvider } from "./Forms/FormDataProvider.jsx";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <FormDataProvider>
        <App />
      </FormDataProvider>
    </Router>
  </React.StrictMode>
);
