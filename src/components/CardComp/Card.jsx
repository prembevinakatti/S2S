import React from "react";
import CardNav from "./CardNav";
import DetailsBox from "../DetailsBox";
import CardDetails from "../CardDetails";
import profileService from "../../appwrite/profile";

const Card = (props) => {
  
  return (
    <div className="card shadow-xl bg-slate-700 gap-1 rounded-lg overflow-hidden w-[25vw] h-auto p-3">
      <CardNav />
      <div className="CardImg overflow-hidden w-full rounded-md h-[30vh]">
        {/* <img
          className="w-full h-full object-cover"
          // src={profileService.getFilePreview(props ? props.imageId : null)}
          alt=""
        /> */}
      </div>
      <div className="CardContent flex flex-col gap-2">
        <CardDetails details={props.nofeed} />
        <CardDetails details={props.fooddetails} />
        <CardDetails details={props.modofdev} />
      </div>
    </div>
  );
};

export default Card;
