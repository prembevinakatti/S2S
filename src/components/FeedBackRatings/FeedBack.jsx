import React, { useEffect, useState } from "react";
import TextArea from "../TextArea";
import profileService from "../../appwrite/profile";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

        
const FeedBack = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [prodata, setProdata] = useState(null);

  const profiledata = useSelector((state) => state.profile.profiledata);

  useEffect(() => {
    async function getUser() {
      try {
        const userData = await profileService.getUser(id);
        if (userData) {
          setProdata(userData);
        }
      } catch (error) {
        toast.error(error.message || error);
      }
    }
    getUser();
  }, [id]); // Added id as a dependency

  const handleRatingChange = (value) => {
    setRating(value);
    console.log(value);
  };

  const handleFeedbackChange = (e) => {
    setComment(e.target.value);
    console.log(e.target.value);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const feed = JSON.parse(prodata.feedback || "[]");
      console.log(feed);
      const data = {
        ngoid: profiledata.$id,
        rating: rating,
        comment: comment,
      };
      feed.push(data);
      console.log(feed);
      const feeddata = JSON.stringify(feed);
      console.log(feeddata);
      await profileService.updatefeedback(prodata.$id, feeddata); // Ensure the method name is correct
      toast.success("Feedback submitted successfully");
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  return (
    <form onSubmit={handleFeedbackSubmit}>
      <div className="w-full flex items-center justify-center">
        <div className="FeedBox w-[40vw] h-[50vh] border flex flex-col items-center justify-center gap-20 border-slate-600 rounded-lg">
          <div className="feedback w-full flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl text-center w-full">FeedBack</h1>
            <TextArea placeholder="Submit Your FeedBack" onChange={handleFeedbackChange} />
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
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedBack;