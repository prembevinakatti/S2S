import React, { useEffect, useState } from "react";
import DetailsBox from "../DetailsBox";
import toast from "react-hot-toast";
import profileService from "../../appwrite/profile";
import TextAreaBox from "../TextAreaBox";

const FeedbackSection = ({ data }) => {
  const [prodata, setProdata] = useState(null);
  const [feedbackError, setFeedbackError] = useState(null);

  useEffect(() => {
    if (!data) return;

    async function getUserFeedback() {
      try {
        const userData = await profileService.getUser(data.ngoid);
        if (userData) {
          setProdata(userData);
        } else {
          setFeedbackError("No user data found.");
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
        <div className="ReqImage w-[8vw] m-3 flex items-center justify-center rounded-full overflow-hidden">
          {prodata && prodata.imgId && (
            <img
              src={profileService.getFilePreview(prodata.imgId)}
              alt="Profile"
            />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-10 items-center justify-center">
            <div className="ResDetails mr-3 flex flex-col items-center justify-center gap-5">
              <DetailsBox details={prodata?.name} />
              <DetailsBox details={prodata?.location} />
              <DetailsBox details={prodata?.$id} />
              <TextAreaBox details={data.comment} />
            </div>
          </div>
          <div className="flex ">
            {Array.from({ length: data.rating }, (_, i) => (
              <input
                key={i}
                type="readonly"
                name="rating-8"
                className="mask mask-star-2 w-10 bg-orange-400"
                checked
                readOnly
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
