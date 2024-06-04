import React, { useEffect, useState } from "react";
import DetailsBox from "../DetailsBox";
import toast from "react-hot-toast";
import profileService from "../../appwrite/profile";

const FeedbackSection = ({ data }) => {
  console.log(data);
  console.log(data && data[0] && data[0].ngoid);

  const [prodata, setProdata] = useState(null);
  const [feedbackError, setFeedbackError] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const userData = await profileService.getUser(data[0].ngoid);
        if (userData) {
          setProdata(JSON.parse(userData.feedback));
        } else {
          setFeedbackError('No feedback data found for this user.');
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error); // Log the error
        setFeedbackError(error.message || error);
        toast.error(error.message || error);
      }
    }

    getUser();
  }, [data]);

  return (
    <div className="w-full h-fit m-5 p-3 flex items-center justify-center">
      <div className="w-[40vw] relative h-fit p-5 rounded-lg border border-slate-500 flex items-center justify-between">
        <div className="ReqImage w-[8vw] flex items-center justify-center rounded-full overflow-hidden">
          <img src={profileService.getFilePreview(data ? data.imgId : null)} alt="Profile" />
        </div>
        <div className="flex flex-col gap-5 items-center justify-start">
          <div className="ResDetails">
            <DetailsBox details="name" />
            <DetailsBox details="Location" />
            <DetailsBox details="Food Name" />
            <DetailsBox details="Feedback">
              {prodata ? (
                prodata
              ) : (
                <span className="text-red-500">{feedbackError || 'Loading feedback...'}</span>
              )}
            </DetailsBox>
          </div>

          <div className="flex flex-col gap-5 items-center justify-center">
            <h1 className="text-3xl">Ratings</h1>
            {/* <div className="rating rating-lg">
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
                checked
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
