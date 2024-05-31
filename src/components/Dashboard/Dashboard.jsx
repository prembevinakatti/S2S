import React, { useEffect } from "react";
import { useState } from "react";
import DetailsBox from "../DetailsBox";
import profileService from "../../appwrite/profile";
import { useParams } from "react-router-dom";
const Dashboard = () => {
  const [userData,setuserdata]=useState(null)
  const{slug}=useParams()
  useEffect(()=>{
    async function getuser(){
      try {
        const userdata= await profileService.getUser(slug)
        if(userdata){
          setuserdata(userdata)
        }
   
      } catch (error) {
        console.log(error)
      }
    }
    getuser()

  })
  return (
    <div>
      <div className="mainbox flex flex-col items-center justify-center">
        <div className="firstBox w-full h-[45vh] flex items-center gap-10 justify-center">
          <div className="imageBox  rounded-lg p-2 flex items-center justify-center w-[25vw] h-[45vh]">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://imgs.search.brave.com/bIkpHw6cWZRHzdOnYK7TnI67_uqVzpREf0V0pQWu_pw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RkL2Yw/LzExL2RkZjAxMTBh/YTE5ZjQ0NTY4N2I3/Mzc2NzllZWM5Y2Iy/LmpwZw"
              alt=""
            />
          </div>
          <div className="detailsBox p-3 flex items-center  justify-center gap-10 w-[70vw] h-full">
            <div>
            <div className="m-3">
              <label htmlFor="">Res Name</label>
              <DetailsBox details="Res Name" userData />
            </div>
            <div className="m-3">
              <label htmlFor="">Location</label>
              <DetailsBox details="Location" userData />
            </div>
            </div>
            <div>
            <div className="m-3">
              <label htmlFor="">Phone Number</label>
              <DetailsBox details="Phone Number" userData />
            </div>
            <div className="m-2">
              <label htmlFor="">Numbers Of Feed</label>
              <DetailsBox details="Numbers Of Feed" />
            </div>
            </div>
          </div>
        </div>
        <div className="secondBox w-full h-[42vh] bg-green-500">
          <div className="graph bg-red-600 w-[70vw] h-full"></div>
          <div className="ratings"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
