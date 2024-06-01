import React from "react";
import Google from "../../assets/google.png";

const CardNav = () => {
  return (
    <div className="CardNav flex items-center p-3 bg-slate-800 justify-between rounded-md w-full h-20 ">
      <div className="NavImage w-12">
        <img src={Google} alt="" />
      </div>
      <div>
        <div className="NavName">
          <p className="text-2xl">Res Name</p>
        </div>
        <div className="NavLocation">
            <p>Location</p>
        </div>
      </div>
    </div>
  );
};

export default CardNav;
