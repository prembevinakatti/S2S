import React, { useEffect, useState } from "react";
import DetailsBox from "../DetailsBox";
import { useParams } from "react-router-dom";
import uploedservices from "../../appwrite/uploedservices";
import { useSelector } from "react-redux";
import TextAreaBox from "../TextAreaBox";
import profileService from "../../appwrite/profile";
import { ID } from "appwrite";
import RequestCard from "../RequestCard/RequestCard";
import GotOrder from "../GotOrder";
import DistanceCalculator from "../DistanceMap";

import FeedBack from "../FeedBackRatings/FeedBack";

import toast from "react-hot-toast";
import LoadingPage from "../LoadingPage";


const PostPage = ({ flag }) => {
  const profiledata = useSelector((state) => state.profile.profiledata);
  const [fooddata, setFooddata] = useState(null);
  const [type, setType] = useState("place order");
  const [app,setapp]=useState(false)
  const [dev,setdev]=useState(false)
  let currentDate = new Date();
  currentDate=currentDate.toLocaleTimeString()
  
  const { slug } = useParams();
  
  const handleOrder = async () => {
    try {
      const requests = JSON.parse(fooddata.requests || "[]");
      requests.push({ profileId: profiledata.$id, currentDate, id: ID.unique() });
      await uploedservices.updaterequests(fooddata.$id, { requests: JSON.stringify(requests) });

      if (profiledata) {
        const pendingSection = JSON.parse(profiledata.pendingSection || "[]");
        pendingSection.push(fooddata.$id);
        await profileService.updatependingSection(profiledata.$id, { pendingSection: JSON.stringify(pendingSection) });
        setType("pending");
        toast.success("Ordered Successfully")
      }
    } catch (error) {
      toast.error("Error in handleOrder: ", error);
    }
  };

  useEffect(() => {
    async function getFood() {
      try {
        const fooddata = await uploedservices.getSingleFood(slug);
        if (fooddata) {
          setFooddata(fooddata);
          console.log(fooddata.name
          )
          const requests = JSON.parse(fooddata.requests || "[]");
          requests.forEach((request) => {
            if (request.profileId === profiledata.$id) {
              setType("pending");
            }
            
          });
          if(fooddata.status=="delivered"){
            setType("delivered")
          }
          const profileapp= JSON.parse(profiledata.approvedSection||"[]")
          if(profileapp){
            profileapp.map((Id)=>{
              if(Id==fooddata.$id){
                setapp(true)
                
              }
      
            })
          }
          const profiledev= JSON.parse(profiledata.deliveredSection||"[]")
          if(profiledev){
            profiledev.map((Id)=>{
              if(Id==fooddata.$id){
                setdev(true)
                
              }
      
            })
          }
        }
      } catch (error) {
        toast.error("Error in getFood: ", error);
      }
    }
    if (slug && profiledata) {
      getFood();
    }
   
  }, [slug, profiledata]);

  if (!fooddata) {
    return <div><LoadingPage /></div>;
  }

  return (
    <>
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
            <label className="text-sm text-slate-500">
              Number Of People to Feed
            </label>
            <DetailsBox details={fooddata.nofeed} />
          </div>
          <div>
            <label className="text-sm text-slate-500">Phone Number</label>
            <DetailsBox details={fooddata.phoneNumber} />
          </div>
          {profiledata.ngoNumber && (
            <button
              className={`${type === "pending" ? 'btn-disabled' : 'btn btn-wide btn-outline btn-primary'}`}
              onClick={handleOrder}
              disabled={type === "pending"}
            >
              {type}
            </button>
          )}
        </div>
      </div>

      <div>
        {!profiledata.ngoNumber && fooddata.requests
          ? JSON.parse(fooddata.requests).map((request) => (
              <RequestCard key={request.id} request={{ request, allreq: JSON.parse(fooddata.requests), slug: fooddata.$id }} />
            ))
          : null}
          {
            app&&(
              <>
              <DistanceCalculator startCoord={JSON.parse(fooddata.coordinates)} reslocation={fooddata.location} negolocation={profiledata.location} endCoord={JSON.parse(profiledata.coordinates)}/>
              <GotOrder data={{slug:fooddata.$id,}}/>
              </>
              
            )

          } 
          {
            dev&&(

              <FeedBack id={fooddata.name}/>
            )
          }

      </div>
    </>
  );
};

export default PostPage;
