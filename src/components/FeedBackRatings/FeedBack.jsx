import React from "react";
import TextArea from "../TextArea";

const FeedBack = () => {
  return (
    <div>
      <div className="FeedBox w-[40vw] h-[50vh] border flex flex-col items-center justify-center gap-20 border-slate-600 rounded-lg">
        <div className="feedback w-full flex flex-col items-center justify-center gap-5">
          <h1 className="text-3xl text-center w-full">FeedBack</h1>
          <TextArea placeholder="Submit Your FeedBack" />
        </div>
        <div className="ratings flex flex-col items-center justify-center gap-5">
          <h2 className="text-3xl w-full text-center">Give Ratings</h2>
          <div className="rating rating-lg">
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
            <input
              type="radio"
              name="rating-8"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
