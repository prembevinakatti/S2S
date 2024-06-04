import React, { useEffect } from "react";
import { useState } from "react";
import DetailsBox from "../DetailsBox";
import profileService from "../../appwrite/profile";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const Dashboard = ({ flag }) => {
  const [userData, setuserdata] = useState(null);
  constarts[a]
  const { slug } = useParams();
  useEffect((flag) => {
    async function getuser() {
      try {
        const userdata = await profileService.getUser(slug);
        if (userdata) {
          console.log(userdata);
          setuserdata(userdata);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getuser();
  }, []);
  return (
    <div>
      <div className="mainbox flex flex-col items-center justify-center">
        <div className="firstBox w-full h-[45vh] flex items-center gap-10 justify-center">
          <div className="imageBox  rounded-lg p-2 flex items-center justify-center w-[25vw] h-[45vh]">
            <img
              className="w-full border border-slate-600 h-full object-cover rounded-lg"
              src={profileService.getFilePreview(
                userData ? userData.imgId : null
              )}
              alt=""
            />
          </div>
          <div className="detailsBox p-3 flex items-center  justify-center gap-10 w-[70vw] h-full">
            <div>
              {flag ? (
                <div className="m-3">
                  <label htmlFor="">Res Name</label>
                  <DetailsBox details={userData ? userData.name : "1233"} />
                </div>
              ) : (
                <div className="m-3">
                  <label htmlFor="">Ngo Name</label>
                  <DetailsBox details={userData ? userData.name : "1233"} />
                </div>
              )}
              <div className="m-3">
                <label htmlFor="">Location</label>
                <DetailsBox details={userData ? userData.location : "1233"} />
              </div>
              {flag ? null : (
                <div className="m-3">
                  <label htmlFor="">Ngo Number</label>
                  <DetailsBox
                    details={userData ? userData.ngoNumber : "1233"}
                  />
                </div>
              )}
            </div>
            <div>
              <div className="m-3">
                <label htmlFor="">Phone Number</label>
                <DetailsBox
                  details={userData ? userData.phoneNumber : "1233"}
                />
              </div>
              <div className="m-2">
                <label htmlFor="">Numbers Of Feed</label>
                <DetailsBox details= {userData ? userData.nofeed : 0}/>
              </div>
            </div>
          </div>
        </div>
        <div className="secondBox w-full h-[42vh] bg-green-500">
        <AreaChart
      width={250}
      height={250}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
          <div className="graph  w-[70vw] h-full"></div>
          <div className="ratings"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
