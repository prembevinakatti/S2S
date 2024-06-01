import React from "react";
import CardNav from "./CardNav";
import CardDetails from "../CardDetails";
import profileService from "../../appwrite/profile";

const Card = (props) => {

  return (
    <div className="card shadow-xl bg-slate-700 gap-1 rounded-lg overflow-hidden w-[25vw] h-auto p-3">
      <CardNav />
      <div className="CardImg overflow-hidden w-full rounded-md h-[30vh]">
        <img
          className="w-full h-full object-cover"
          src={profileService.getFilePreview(props.imageId)}
          alt="Food Item"
        />
      </div>
      <div className="CardContent flex flex-col gap-2">
        <CardDetails details={`Number of People to Feed: ${props.nofeed}`} />
        <CardDetails details={`Food Details: ${props.fooddetails}`} />
        <CardDetails details={`Mode of Delivery: ${props.modofdev}`} />
      </div>
    </div>
  );
};

export default Card;
