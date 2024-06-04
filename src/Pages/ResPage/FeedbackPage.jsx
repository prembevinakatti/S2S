import React, { useEffect,useState } from "react";
import FeedbackSection from "../../components/FeedbackSection/FeedbackSection";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import profileService from "../../appwrite/profile";

const FeedbackPage = () => {
  const profiledata = useSelector((state) => state.profile.profiledata);
  const [prodata, setProdata] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const userData = await profileService.getUser(profiledata.$id);
        if (userData) {
          setProdata(JSON.parse(userData.feedback));
          console.log(userData.feedback);
        }
      } catch (error) {
        toast.error(error.message || error);
      }
    }
    getUser();
  }, []);
  return (
    <div>
      {prodata?.map((data) => {
        return <FeedbackSection setProdata={data} />;
      })}
    </div>
  );
};

export default FeedbackPage;
