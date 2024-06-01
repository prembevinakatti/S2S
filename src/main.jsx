import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Outlate from "./components/Outlate.jsx";
import Login from "./components/LoginAndSignUp/Login.jsx";
import SignUp from "./components/LoginAndSignUp/SignUp.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/dashboard/:slug" element={<Dashboard />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
