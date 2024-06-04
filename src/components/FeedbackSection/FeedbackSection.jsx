import React, { useEffect, useState } from "react";
import DetailsBox from "../DetailsBox";
import toast from "react-hot-toast";
import profileService from "../../appwrite/profile";

const FeedbackSection = ({ data }) => {
  const [prodata, setProdata] = useState(null);
  const [feedbackError, setFeedbackError] = useState(null);
console.log(data)
  useEffect(() => {
    if (!data) return;

    async function getUserFeedback() {
      try {
        const userData = await profileService.getUser(data.ngoid);
        if (userData) {
          const feedback = JSON.parse(userData.feedback);
          setProdata(feedback);
        } else {
          setFeedbackError("No feedback data found for this user.");
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        setFeedbackError(error.message || error);
        toast.error(error.message || error);
      }
    }

    getUserFeedback();
  }, [data]);

  return (
    <div className="w-full h-fit m-5 p-3 flex items-center justify-center">
      <div className="w-[40vw] relative h-fit p-5 rounded-lg border border-slate-500 flex items-center justify-between">
        <div className="ReqImage w-[8vw] flex items-center justify-center rounded-full overflow-hidden">
          {data && data.imgId && (
            <img
              src={profileService.getFilePreview(data.imgId)}
              alt="Profile"
            />
          )}
        </div>
        <div className="flex flex-col gap-5 items-center justify-start">
          <div className="ResDetails">
            <DetailsBox details="Name" value={data?.name || ""} />
            <DetailsBox details="Location" value={data?.location || ""} />
            <DetailsBox details="Food Name" value={data?.foodname || ""} />
            <DetailsBox details="Feedback">
              {prodata ? (
                prodata
              ) : (
                <span className="text-red-500">
                  {feedbackError || "Loading feedback..."}
                </span>
              )}
            </DetailsBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
