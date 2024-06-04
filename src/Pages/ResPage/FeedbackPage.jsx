import React, { useEffect, useState } from "react";
import FeedbackSection from "../../components/FeedbackSection/FeedbackSection";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import profileService from "../../appwrite/profile";

const FeedbackPage = () => {
  const profiledata = useSelector((state) => state.profile.profiledata);
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    async function getUserFeedback() {
      try {
        const userData = await profileService.getUser(profiledata.$id);
        if (userData) {
          const feedback = JSON.parse(userData.feedback);
          setFeedbackData(feedback);
          console.log(userData.feedback);
        }
      } catch (error) {
        toast.error(error.message || error);
      }
    }
    getUserFeedback();
  }, [profiledata]);

  return (
    <div>
      {feedbackData?.map((data, index) => {
        {
          console.log(data)
        }
        return <FeedbackSection key={index} data={data} />;
      })}
    </div>
  );
};

export default FeedbackPage;
