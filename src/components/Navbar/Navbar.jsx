import React from "react";
import { useSelector } from "react-redux";
import Logout from "../Logout";
import Logo from "../../assets/S2SLogo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const authdata = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const profiledata = useSelector((state) => state.profile.profiledata);
  const handleClickFeedback = () => {
    navigate("/feedback");
  };

  return (
    <div className="fixed top-0  z-30 w-full  bg-white backdrop-blur-sm bg-[rgb(255 255 255 / 80%)]  h-[5vw] mb-5 flex justify-between items-center">
      <div className="Logo m-2 p-1 w-14 h-16">
        <img className="w-full h-full object-center" src={Logo} alt="Logo" />
      </div>
      <div>
        {authdata && (
          <div className="drawer z-20 m-5 drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="btn btn-circle">
                {/* this hidden checkbox controls the state */}
                <svg
                  className=" backdrop-blur-md swap w-full h-full p-1 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}

                {profiledata?.ngoNumber}
                <button
                  className="btn btn-outline m-3 btn-error"
                  onClick={handleClickFeedback}
                >
                  Feedback
                </button>
                <Logout />
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
