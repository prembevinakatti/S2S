import React from "react";
import CardNav from "./CardNav";
import DetailsBox from "../DetailsBox";
import CardDetails from "../CardDetails";

const Card = () => {
  return (
    <div className=" w-full h-full flex items-center justify-center">
      <div className="card p-3 shadow-xl bg-slate-700 gap-1 rounded-lg overflow-hidden w-[25vw] h-fit">
        <CardNav />
        <div className="CardImg overflow-hidden w-full rounded-md h-[30vh]">
          <img className="w-full h-full object-cover"
            src="https://imgs.search.brave.com/J026JRgV5rpmD0jDWcZylUNjOyfVFu3u3L3Id0EFnKg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8x/Mi8wOS8xNy8xMS92/ZWdldGFibGVzLTEw/ODUwNjNfNjQwLmpw/Zw"
            alt=""
          />
        </div>
        <div className="CardContent flex flex-col gap-2">
            <CardDetails details="details" />
            <CardDetails details="details" />
            <CardDetails details="details" />
            <CardDetails details="details" />
        </div>
      </div>
    </div>
  );
};

export default Card;
