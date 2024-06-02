import React from "react";
import DetailsBox from "../DetailsBox";

const RequestCard = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[40vw] relative h-fit p-5 rounded-lg border border-slate-500 flex items-center justify-between">
        <div className="timing absolute top-0 right-5">
            <p>timing</p>
        </div>
        <div className="ReqImage w-[8vw] flex items-center justify-center rounded-full overflow-hidden ">
          <img
            src="https://imgs.search.brave.com/oUCHWCnXFlhrQwRHjc75Qk249pfxXQIsWZRpJIZB7g8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q5L2Jh/LzRiL2Q5YmE0Yjdl/YWU2MGExNDJlYjE0/YzBhZWY4MzFkZTA4/LmpwZw"
            alt=""
          />
        </div>
        <div className="ResDetails">
            <DetailsBox details="Ngo Name" />
            <DetailsBox details="Location" />
            <DetailsBox details="Number Of Peoples" />
            <DetailsBox details="Phone Number" />
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
