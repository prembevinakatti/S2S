import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/services";
import { login } from "./store/authslice";
import profileService from "./appwrite/profile";
import { updateProfile } from "./store/profuleslice";
import ResDashboard from "./Pages/ResPage/ResDashboard";
import { useNavigate } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
    const profileData = useSelector((state) => state.profile.profiledata);
    try {
      authService.getCurrentUser().then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
           profileService.getUser(userData.name).then((profiledata)=>{
            
            dispatch(updateProfile({profiledata}))

           })
           if(profileData==null){
              if(profileData.ngoNumber==null||undefined||""){
                navigate("ResProfilePage")
              }
              else{
                navigate("NgoProfilePage")
              }
           }
         
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
