import { useEffect } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUp from "./components/LoginAndSignUp/SignUp";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/services";
import { login } from "./store/authslice";
import Outlate from "./components/Outlate";
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
    </>
  );
}

export default App;
