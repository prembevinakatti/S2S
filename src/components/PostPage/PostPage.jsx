import React, { useEffect, useState } from "react";
import DetailsBox from "../DetailsBox";
import { useParams } from "react-router-dom";
import uploedservices from "../../appwrite/uploedservices";
import { useSelector } from "react-redux";
import TextAreaBox from "../TextAreaBox";
import profileService from "../../appwrite/profile";

const PostPage = ({ flag }) => {
  const profiledata = useSelector((state) => state.profile.profiledata);
  const [fooddata, setFooddata] = useState();
  const [type, setType] = useState("place order");

  const handleOrder = async () => {
    const requests = JSON.parse(fooddata.requests);
    requests.push(profiledata.$id);
    await uploedservices.updaterequests({ slug : fooddata.$id, requests: JSON.stringify(requests) });

    if(uploedservices){
      const pendingSection = JSON.parse(profiledata.pendingSection)
      await profileService.updatePendingSection({slug : profiledata.$id, pendingSection: pendingSection})
    }
  };


  const { slug } = useParams();

  useEffect(() => {
    async function getFood() {
      try {
        const fooddata = await uploedservices.getSingleFood(slug);
        if (fooddata) {
          setFooddata(fooddata);
          const requests = JSON.parse(fooddata.requests);
          requests?.forEach((request) => {
            if (request === profiledata.$id) {
              setType("pending");
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (slug && profiledata) {
      getFood();
    }
  }, [slug, profiledata]);

  if (!fooddata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PostPage py-10 w-full h-full gap-5 flex items-center justify-center">
      <div className="PostImg w-[25vw] h-[70vh]">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={profileService.getFilePreview(fooddata.imageId)}
          alt=""
        />
      </div>
      <div className="PostDetails m-5 border border-slate-500 rounded-lg p-3 flex flex-col items-center justify-center gap-3 w-[50vw] h-fit">
        <div>
          <label className="text-sm text-slate-500">Res Name</label>
          <DetailsBox details={fooddata.name} />
        </div>
        <div>
          <label className="text-sm text-slate-500">Location</label>
          <DetailsBox details={fooddata.location} />
        </div>
        <div>
          <label className="text-sm text-slate-500">Items</label>
          <TextAreaBox details={fooddata.fooddetails} />
        </div>
        <div>
          <label className="text-sm text-slate-500">Mode Of Delivery</label>
          <DetailsBox details={fooddata.modofdev} />
        </div>
        <div>
          <label className="text-sm text-slate-500">Number Of People to Feed</label>
          <DetailsBox details={fooddata.nofeed} />
        </div>
        <div>
          <label className="text-sm text-slate-500">Phone Number</label>
          <DetailsBox details={fooddata.phoneNumber} />
        </div>
        {!flag && (
          <button className="btn btn-wide btn-outline btn-primary" onClick={handleOrder}>
            {type}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostPage;
