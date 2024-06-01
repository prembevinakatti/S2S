import React from "react";
import CardNav from "./CardNav";
import DetailsBox from "../DetailsBox";
import CardDetails from "../CardDetails";

const Card = () => {
  return (
    <div className="card shadow-xl bg-slate-700 gap-1 rounded-lg overflow-hidden w-[25vw] h-auto p-3">
      <CardNav />
      <div className="CardImg overflow-hidden w-full rounded-md h-[30vh]">
        <img
          className="w-full h-full object-cover"
          src="https://imgs.search.brave.com/0tky2yPxJM7n6eER8ZmhdJ0AdSSMOKMYARxzt6jDZbA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NTk4NDc4NDQtNTMx/NTY5NWRhZGFlP3E9/ODAmdz0xMDAwJmF1/dG89Zm9ybWF0JmZp/dD1jcm9wJml4bGli/PXJiLTQuMC4zJml4/aWQ9TTN3eE1qQTNm/REI4TUh4elpXRnlZ/Mmg4TVRSOGZHUmxi/R2xqYVc5MWN5VXlN/R1p2YjJSOFpXNThN/SHg4TUh4OGZEQT0.jpeg"
          alt=""
        />
      </div>
      <div className="CardContent flex flex-col gap-2">
        <CardDetails details="Number Of People To Feed" />
        <CardDetails details="Items" />
        <CardDetails details="Mode Of Delivery" />
        <CardDetails details="Details" />
      </div>
    </div>
  );
};

export default Card;
