/* React */
import React from    "react";
import ReactDOM from "react-dom/client";

/* Routes */
import UserLayout from "./views/layouts/user.layout";

/* CSS */
import "./assets/css/global.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserLayout />
    </React.StrictMode>
);