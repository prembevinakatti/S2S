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
  const [app, setApp] = useState(false);
  const [dev, setDev] = useState(false);
  let currentDate = new Date();
  currentDate = currentDate.toLocaleTimeString();
  const { slug } = useParams();

  const handleOrder = async (isEmergency = false) => {
    try {
      const requests = JSON.parse(fooddata.requests || "[]");
      requests.push({
        profileId: profiledata.$id,
        currentDate,
        id: ID.unique(),
        badge: isEmergency,
      });

      await uploedservices.updaterequests(fooddata.$id, {
        requests: JSON.stringify(requests),
      });

      if (profiledata) {
        const pendingSection = JSON.parse(profiledata.pendingSection || "[]");
        pendingSection.push(fooddata.$id);
        await profileService.updatependingSection(profiledata.$id, {
          pendingSection: JSON.stringify(pendingSection),
        });
        setType("pending");
        window.location.reload();
        toast.success("Ordered Successfully");
      }
    } catch (error) {
      toast.error("Error in handleOrder: " + error.message);
    }
  };

  useEffect(() => {
    async function getFood() {
      try {
        const fooddata = await uploedservices.getSingleFood(slug);
        if (fooddata) {
          setFooddata(fooddata);
          const requests = JSON.parse(fooddata.requests || "[]");
          requests.forEach((request) => {
            if (request.profileId === profiledata.$id) {
              setType("pending");
            }
          });
          if (fooddata.status === "delivered") {
            setType("delivered");
          }
          const profileapp = JSON.parse(profiledata.approvedSection || "[]");
          profileapp.forEach((Id) => {
            if (Id === fooddata.$id) {
              setType("approved");
              setApp(true);
            }
          });
          const profiledev = JSON.parse(profiledata.deliveredSection || "[]");
          profiledev.forEach((Id) => {
            if (Id === fooddata.$id) {
              setType("delivered");
              setDev(true);
            }
          });
        }
      } catch (error) {
        toast.error("Error in getFood: " + error.message);
      }
    }
    if (slug && profiledata) {
      getFood();
    }
    function getDate() {
      const deta = JSON.parse(profiledata.pendingSection || "[]");
      console.log(deta);
      if (deta.length >= 1) {
        setType("you can't order now");
      }
    }

    getDate();
  }, [slug, profiledata]);

  if (!fooddata) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  // Parse and sort requests
  const requests = JSON.parse(fooddata.requests || "[]");
  requests.sort((a, b) => {
    if (a.badge === b.badge) {
      return new Date(a.currentDate) - new Date(b.currentDate);
    }
    return a.badge ? -1 : 1;
  });

  async function handeldelect() {
    try {
      await uploedservices.deleteFile(fooddata.$id);
    } catch (error) {
      toast.error("Error in handeldelect: " + error.message);
    }
  }

  return (
    <>
      <div className="w-full h-full gap-5 flex items-center justify-center">
        <div className="PostPage bg-slate-900 rounded-lg px-5 py-10 flex items-center justify-center ">
          <div className="PostImg w-[25vw] h-fit">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={profileService.getFilePreview(fooddata.imageId)}
              alt=""
            />
          </div>
          <div className="PostDetails text-white relative m-5 border border-slate-500 rounded-lg p-3 flex flex-col items-start justify-center gap-3 w-[50vw] h-fit">
            <div className="absolute m-1 top-0 right-0">
              <p className="text-sm">
                Food Prepared Time: {fooddata.timeoffoodprepared}
              </p>
              <p className="text-sm">
                Food Expired Time approximately: {fooddata.foodsustainability}
              </p>
            </div>
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
                className={`${
                  type === "pending" ||
                  type === "delivered" ||
                  type === "approved" ||
                  type === "you can't order now"
                    ? "btn-disabled"
                    : "btn btn-wide btn-outline btn-primary"
                }`}
                onClick={() => handleOrder(false)}
                disabled={
                  type === "pending" ||
                  type === "delivered" ||
                  type === "approved" ||
                  type === "you can't order now"
                }
              >
                {type}
              </button>
            )}
            {profiledata.$id === fooddata.userId && (
              <button className="btn-outline btn-error" onClick={handeldelect}>
                Delete
              </button>
            )}
            <div>
              {profiledata.ngoNumber &&
                type !== "you can't order now" &&
                type !== "pending" &&
                type !== "approved" &&
                type !== "delivered" && (
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => handleOrder(true)}
                  >
                    Emergency
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {!profiledata.ngoNumber && fooddata.requests && (
          <div>
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={{
                  request,
                  allreq: JSON.parse(fooddata.requests),
                  slug: fooddata.$id,
                }}
              />
            ))}
          </div>
        )}
        {app && (
          <>
            <DistanceCalculator
              startCoord={JSON.parse(fooddata.coordinates)}
              reslocation={fooddata.location}
              negolocation={profiledata.location}
              endCoord={JSON.parse(profiledata.coordinates)}
            />
            <GotOrder data={{ slug: fooddata.$id, respro: fooddata }} />
          </>
        )}
        {dev && <FeedBack id={fooddata.name} />}
      </div>
    </>
  );
};

export default PostPage;
