import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/services";
import { login } from "./store/authslice";
import profileService from "./appwrite/profile";
import { updateProfile } from "./store/profuleslice";
import ResDashboard from "./Pages/ResPage/ResDashboard";
import Outlate from "../src/components/Outlate"
import { Outlet, useNavigate } from "react-router-dom";
import RequestCard from "./components/RequestCard/RequestCard";
import FeedBack from "./components/FeedBackRatings/FeedBack";
import GotOrder from "./components/GotOrder";
import NotificationPage from "./components/NotificationPage/NotificationPage";
import LoadingPage from "./components/LoadingPage";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.profile.profiledata);
  const [loading, setLoading] = useState(true); // State variable to manage loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          const profiledata = await profileService.getUser(userData.name);
          dispatch(updateProfile({ profiledata }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  if (loading) {
    return <div>
      <LoadingPage />
    </div>
  }

  return (
    <>
      <Outlate />
      {/* Add your other components here */}
    </>
  );
}

export default App;
