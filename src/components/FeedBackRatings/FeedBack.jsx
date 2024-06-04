import React, { useEffect, useState } from "react";
import TextArea from "../TextArea";
import profileService from "../../appwrite/profile";
import { useSelector } from "react-redux";

const FeedBack = ({id}) => {
  console.log(id)
  const [rating, setRating] = useState(0);
  const [data,setData]=useState(null)
  const [commment,setcomment]=useState(null)

  const profiledata = useSelector((state) => state.profile.profiledata);
  const handleRatingChange = (value) => {
    setRating(value);
    console.lsetcommentog(value);
  };
  const comment = (value) => {
    setcomment(value);
    
  };
  
 async function handelfeedback(){
  data={
    ngoid:profiledata.$id,
    rating:rating,
    comment:commment


  }
    await profileService.updatefeedback(id,data)
  }

  return (<form onSubmit={handelfeedback}>
    <div className="w-full flex items-center justify-center">
      <div className="FeedBox w-[40vw] h-[50vh] border flex flex-col items-center justify-center gap-20 border-slate-600 rounded-lg">
        <div className="feedback w-full flex flex-col items-center justify-center gap-5">
          <h1 className="text-3xl text-center w-full">FeedBack</h1>
          <TextArea placeholder="Submit Your FeedBack"
          onChange={() => comment(value)}  />
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

      <button className="btn tbn-primary" type="submit">Submit</button>
    </div>
    </form>
  );
};

export default FeedBack;
