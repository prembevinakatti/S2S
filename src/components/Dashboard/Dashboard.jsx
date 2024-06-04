import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsBox from "../DetailsBox";
import profileService from "../../appwrite/profile";
import Footer from "../Footer/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = ({ flag }) => {
  const [userData, setUserData] = useState(null);
  const [charts, setCharts] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await profileService.getUser(slug);
        if (userData) {
          setUserData(userData);
          const parsedCharts = JSON.parse(userData.charts || "[]");
          setCharts(parsedCharts);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, [slug]);

  return (
    <div>
      <div className="mainbox flex flex-col items-center justify-center">
        <div className="firstBox w-full h-[45vh] flex items-center gap-10 justify-center">
          <div className="imageBox rounded-lg p-2 flex items-center justify-center w-[25vw] h-[45vh]">
            <img
              className="w-full border border-slate-600 h-full object-cover rounded-lg"
              src={profileService.getFilePreview(userData?.imgId || null)}
              alt=""
            />
          </div>
          <div className="detailsBox p-3 flex items-center justify-center gap-10 w-[70vw] h-full">
            <div>
              <div className="m-3">
                <label htmlFor="">{flag ? "Res Name" : "Ngo Name"}</label>
                <DetailsBox details={userData?.name || "1233"} />
              </div>
              <div className="m-3">
                <label htmlFor="">Location</label>
                <DetailsBox details={userData?.location || "1233"} />
              </div>
              {!flag && (
                <div className="m-3">
                  <label htmlFor="">Ngo Number</label>
                  <DetailsBox details={userData?.ngoNumber || "1233"} />
                </div>
              )}
            </div>
            <div>
              <div className="m-3">
                <label htmlFor="">Phone Number</label>
                <DetailsBox details={userData?.phoneNumber || "1233"} />
              </div>
              <div className="m-2">
                <label htmlFor="">Numbers Of Feed</label>
                <DetailsBox details={userData?.nofeed || 0} />
              </div>
            </div>
          </div>
        </div>
        <div className="secondBox w-full h-[42vh]">
          {flag && (
            <div>
              {charts ? (
                <BarChart
                  width={500}
                  height={300}
                  data={charts}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip shared={false} trigger="click" />
                  <Legend />
                  <Bar dataKey="nuberoffeed" fill="#8884d8" />
                </BarChart>
              ) : (
                <div className="graph w-[70vw] h-full">Loading...</div>
              )}
            </div>
          )}
          <div className="ratings"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
