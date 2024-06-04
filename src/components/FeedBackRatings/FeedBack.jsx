import React, { useState } from "react";
import TextArea from "../TextArea";

const FeedBack = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
    console.log(value);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="FeedBox w-[40vw] h-[50vh] border flex flex-col items-center justify-center gap-20 border-slate-600 rounded-lg">
        <div className="feedback w-full flex flex-col items-center justify-center gap-5">
          <h1 className="text-3xl text-center w-full">FeedBack</h1>
          <TextArea placeholder="Submit Your FeedBack" />
        </div>
        <div className="ratings flex flex-col items-center justify-center gap-5">
          <h2 className="text-3xl w-full text-center">Give Ratings</h2>
          <div className="rating rating-lg">
            {[1, 2, 3, 4, 5].map((value) => (
              <input
                key={value}
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
                checked={rating === value}
                onChange={() => handleRatingChange(value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
