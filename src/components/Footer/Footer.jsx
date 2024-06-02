import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const [activeButton, setActiveButton] = useState("Home");
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.profile.profiledata);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  if (profileData !== null) {
    if (profileData.ngoNumber !== null) {
      
      return (
        <div className="fixed z-10 bottom-0 px-5 w-full h-14 rounded-md flex items-center justify-between bg-slate-800">
          <button
            className={`btn btn-outline btn-primary ${
              activeButton === "Home" ? "btn-active" : ""
            }`}
            onClick={() => (
              handleButtonClick("NgoHomepage"), navigate("/NgoHomepage")
            )}
          >
            Home
          </button>
          <button
            className={`btn btn-outline btn-primary ${
              activeButton === "Upload" ? "btn-active" : ""
            }`}
            onClick={() => (
              handleButtonClick("Orderdetailspage"),
              navigate("/Orderdetailspage")
            )}
          >
            Order Details
          </button>
          <button
            className={`btn btn-outline btn-primary ${
              activeButton === "Profile" ? "btn-active" : ""
            }`}
            onClick={() => (
              handleButtonClick(`/ResDashboard/${profileData.$id}`),
              navigate(`/NgoDashboard/${profileData.$id}`)
            )}
          >
            Dashboard
          </button>
        </div>
      );
    } else {
      return (
          <div className="fixed z-10 bottom-0 px-5 w-full h-14 rounded-md flex items-center justify-between bg-slate-800">
            <button
              className={`btn btn-outline btn-primary ${
                activeButton === "Home" ? "btn-active" : ""
              }`}
              onClick={() => (
                handleButtonClick(`ResHomepage`), navigate("/ResHomepage")
              )}
            >
              Home{" "}
            </button>
            <button
              className={`btn btn-outline btn-primary ${
                activeButton === "Upload" ? "btn-active" : ""
              }`}
              onClick={() => (
                handleButtonClick("ResUploedpage"), navigate("/ResUploedpage")
              )}
            >
              Upload
            </button>
            <button
              className={`btn btn-outline btn-primary ${
                activeButton === "Profile" ? "btn-active" : ""
              }`}
              onClick={() => (
                handleButtonClick(`/ResDashboard/${profileData.$id}`),
                navigate(`/ResDashboard/${profileData.$id}`)
              )}
            >
              Dashboard
            </button>
          </div>
        );
    }
  }
};

export default Footer;
