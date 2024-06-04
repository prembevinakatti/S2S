import React from "react";
import DetailsBox from "../DetailsBox";
import profileService from "../../appwrite/profile";

const FeedbackSection = () => {
  return (
    <div className="w-full h-fit m-5 p-3 flex items-center justify-center">
      <div className="w-[40vw] relative h-fit p-5 rounded-lg border border-slate-500 flex items-center justify-between">
        <div className="ReqImage w-[8vw] flex  items-center justify-center rounded-full overflow-hidden">
          {/* <img src={profileService.getFilePreview(data.imgId)} alt="Profile" /> */}
        </div>
        <div className="flex flex-col gap-5 items-center justify-start">
          <div className="ResDetails">
            <DetailsBox details="Ngo Name" />
            <DetailsBox details="Location" />
            <DetailsBox details="Food Name" />
            <DetailsBox details="Feedback" />
          </div>

          <div className="flex flex-col gap-5 items-center justify-center">
            <h1 className="text-3xl">Ratings</h1>
            <div className="rating rating-lg">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
