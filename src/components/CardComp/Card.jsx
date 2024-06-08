import React from "react";
import CardNav from "./CardNav";
import CardDetails from "../CardDetails";
import profileService from "../../appwrite/profile";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${props.$id}`);
  };

  return (
    <div className="FoodCard rounded-3xl w-[25vw] h-fit p-3">
      <CardNav name={props.name} />
      <div className="CardContent flex flex-col items-center  justify-center gap-8">
        <div className="flex w-full h-fit items-center justify-around ">
          <div className="flex w-full items-center justify-around ">
            <div className=" m-0 p-0 w-36 h-24 flex flex-col items-center justify-center">
              <p className="text-2xl">Type</p>
              <p className="text-black font-semibold text-2xl">Non - Veg</p>
            </div>
            <div className="divider divider-horizontal h-20 m-0"></div>
            <div className=" m-0 p-0 w-36 h-24 flex flex-col items-center justify-center">
              <p className="text-2xl">Persons</p>
              <p className="text-black font-semibold text-2xl">3</p>
            </div>
          </div>
        </div>
        <div className="divider m-0"></div>

        <div onClick={handleCardClick} className="cursor-pointer">Click Here For More Information</div>
      </div>
    </div>
  );
};

export default Card;
