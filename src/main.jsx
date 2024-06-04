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
import PostPage from "./components/PostPage/PostPage.jsx";
import UploadPage from "./components/UploadPage/UploadPage.jsx";
import HomePage from "./Pages/ResPage/ResHomePage.jsx";
import ResLoginPage from "./Pages/ResPage/ResLoginPage.jsx";
import ResRegPage from "./Pages/ResPage/ResRegPage.jsx";
import NgoLoginPage from "./Pages/NgoPage/NgoLoginPage.jsx";
import NgoRegPage from "./Pages/NgoPage/NgoRegPage.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import ResProfilePage from "./Pages/ResPage/ResProfilePage.jsx";
import NgoProfilePage from "./Pages/NgoPage/NgoProfilePage.jsx";
import ResDashboard from "./Pages/ResPage/ResDashboard.jsx";
import NgoDashboard from "./Pages/NgoPage/NgoDashboard.jsx";
import ResUploedpage from "./Pages/ResPage/ResUploedpage.jsx";
import ResHomePage from "./Pages/ResPage/ResHomePage.jsx";
import NgoHomePage from "./Pages/NgoPage/NgoHomePage.jsx";
import OrderDetailsPage from "./Pages/NgoPage/OrderDetailsPage.jsx";
import FeedbackSection from "./components/FeedbackSection/FeedbackSection.jsx"
import NotificationPage from "./components/NotificationPage/NotificationPage.jsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/ResLoginPage" element={<ResLoginPage />} />
        <Route path="/ResRegPage" element={<ResRegPage />} />
        <Route path="/NgoLoginPage" element={<NgoLoginPage />} />
        <Route path="/NgoRegPage" element={<NgoRegPage />} />
        <Route path="/ResProfilePage" element={<ResProfilePage />} />
        <Route path="/NgoProfilePage" element={<NgoProfilePage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/ResDashboard/:slug" element={<ResDashboard />} />
        <Route path="ResUploedpage" element={<ResUploedpage />} />
        <Route path="/NgoDashboard/:slug" element={<NgoDashboard />} />
        <Route path="ResHomepage" element={<ResHomePage/>}/>
        <Route path="NgoHomepage" element={<NgoHomePage/>}/>
        <Route path="Orderdetailspage" element={<OrderDetailsPage/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/feedback" element={<FeedbackSection />} />
      </Route>
      <Route path="/" element={<Outlate />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
