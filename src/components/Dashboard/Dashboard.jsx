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
  const [charts, setCharts] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await profileService.getUser(slug);
        if (userData) {
          setUserData(userData);
          const parsedCharts = JSON.parse(userData.charts || "[]");
          setCharts(Array.isArray(parsedCharts) ? parsedCharts : []);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, [slug]);

  return (
    <div>
      <div className="mainbox flex flex-col  items-center justify-center">
        <div className="firstBox w-full h-[45vh] flex items-center gap-10 justify-center">
          <div className="imageBox z-10 rounded-lg p-2 flex items-center justify-center w-[25vw] h-[45vh]">
            <img
              className="dashImg w-full border h-full object-cover rounded-lg"
              // src={profileService.getFilePreview(userData?.imgId || null)}
              src="https://imgs.search.brave.com/Dp4GkFY7tQyFrFXVwvuNsB_gHVMcIi3nFjqG_n053SE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQz/NTY2MTk2OS9waG90/by9jbG9zZS11cC1v/Zi1jaGlsZHJlbi1o/b2xkaW5nLWEtcGxh/bmV0LWF0LXRoZS1i/ZWFjaC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9VHVaVEw4/S0VkcU5ReFM1bmxz/SDVpMXRUT0tOV29w/ajJkSFdrbTl5azJ1/bz0"
              alt=""
            />
          </div>
          <div className="detailsBox p-3 flex items-center justify-center gap-10 w-[70vw] h-fit">
            <div>
              <div className="m-3">
                <label htmlFor="">{flag ? "Res Name" : "Ngo Name"}</label>
                <DetailsBox details={userData?.name || "Not Available"} />
              </div>
              <div className="m-3">
                <label htmlFor="">Location</label>
                <DetailsBox details={userData?.location || "Not Available"} />
              </div>
              {!flag && (
                <div className="m-3">
                  <label htmlFor="">Ngo Number</label>
                  <DetailsBox
                    details={userData?.ngoNumber || "Not Available"}
                  />
                </div>
              )}
              {flag && (
                <div className="m-3">
                  <label htmlFor="">Phone Number</label>
                  <DetailsBox
                    details={userData?.phoneNumber || "Not Available"}
                  />
                </div>
              )}
            </div>

            <div>
              {/* <div className="m-2">
                <label htmlFor="">Numbers Of Feed</label>
                <DetailsBox details={userData?.nofeed || 0} />
              </div> */}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-around">
          <div className="analyteBox bg-red-600 w-[60vw] flex flex-col gap-5 items-center justify-center h-[42vh]">
            <p className="text-3xl">Analytics</p>
            {flag && (
              <div>
                {charts.length > 0 ? (
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
                  <div className="graph w-[70vw] flex items-center justify-center h-full">
                    No data available
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="totalFeed flex flex-col items-center justify-center gap-10 bg-red-500 w-[30vw] h-[42vh]">
            <div className="statflex text-black flex-col items-center justify-center text-center ">
              <div className="stat-title text-slate-900 font-semibold">
                {flag ? "Total Food Donated" : "Total Food Recieved"}
              </div>
              <div className="stat-value">894</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <div
                className="radial-progress text-primary"
                style={{ "--value": 70 }}
                role="progressbar"
              >
                21%
              </div>
              <div className="stat-desc text-sm font-semibold text-slate-500">
                more than last month
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
