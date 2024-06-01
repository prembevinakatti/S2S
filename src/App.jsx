import { useEffect } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUp from "./components/LoginAndSignUp/SignUp";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/services";
import { login } from "./store/authslice";
import Outlate from "./components/Outlate";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Dashboard from "./components/Dashboard/Dashboard";
import UploadPage from "./components/UploadPage/UploadPage";
import PostPage from "./components/PostPage/PostPage";
import Card from "./components/CardComp/Card";
import HomePage from "./Pages/ResPage/ResHomePage";
import profileService from "./appwrite/profile";
import { updateProfile } from "./store/profuleslice";
import NgoHomePage from "./Pages/NgoPage/NgoHomePage";
import OrderDetailsPage from "./Pages/NgoPage/OrderDetailsPage";
import ResLoginPage from "./Pages/ResPage/ResLoginPage";
import ResRegPage from "./Pages/ResPage/ResRegPage";
import NgoLoginPage from "./Pages/NgoPage/NgoLoginPage";
import NgoRegPage from "./Pages/NgoPage/NgoRegPage";
import ResProfilePage from "./Pages/ResPage/ResProfilePage";
import NgoProfilePage from "./Pages/NgoPage/NgoProfilePage";
import NgoDashboard from "./Pages/NgoPage/NgoDashboard";
import ResDashboard from "./Pages/ResPage/ResDashboard";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      authService.getCurrentUser().then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
           profileService.getUser(userData.name).then((profiledata)=>{
            dispatch(updateProfile({profiledata}))
           })
         
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      {/* <Outlate /> */}
      {/* <Card /> */}
      {/* <Dashboard /> */}
      {/* <ProfilePage /> */}
      {/* <UploadPage /> */}
      {/* <PostPage /> */}
      {/* <HomePage /> */}
      {/* <LandingPage /> */}
      {/* <NgoHomePage /> */}
      {/* <OrderDetailsPage /> */}
      {/* <ResLoginPage /> */}
      {/* <ResRegPage /> */}
      {/* <NgoLoginPage /> */}
      {/* <NgoRegPage /> */}
      {/* <ResProfilePage /> */}
      {/* <NgoProfilePage /> */}
      {/* <NgoDashboard/> */}
      <ResDashboard />
      
    </>
  );
}

export default App;
