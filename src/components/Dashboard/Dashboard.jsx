import React, { useEffect } from "react";
import { useState } from "react";
import DetailsBox from "../DetailsBox";
import profileService from "../../appwrite/profile";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const Dashboard = ({ flag }) => {
  const [userData, setuserdata] = useState(null);
  const { slug } = useParams();
  useEffect(() => {
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
      <Navbar />
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
                <DetailsBox details={userData ? userData.name : "1233"} />
              </div>
            </div>
          </div>
        </div>
        <div className="secondBox w-full h-[42vh] bg-green-500">
          <div className="graph bg-red-600 w-[70vw] h-full"></div>
          <div className="ratings"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
