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
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      authService.getCurrentUser().then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Outlate />
      {/* <Dashboard /> */}
      {/* <ProfilePage /> */}
      {/* <UploadPage /> */}
      <PostPage />
    </>
  );
}

export default App;
