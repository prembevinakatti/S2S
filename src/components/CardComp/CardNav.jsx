import React, { useEffect, useState } from "react";
import profileService from "../../appwrite/profile";
import { useNavigate } from "react-router-dom";

const CardNav = ({ name }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await profileService.getUser(name);
        if (userData) {
          setData(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, [name]);

  const handleNavigation = () => {
    if (data && data.$id) {
      navigate(`/ResDashboard/${data.$id}`);
    }
  };

  return (
    <div className="CardNav flex mt-[-130px] mb-10 flex-col items-center p-3 gap-16  justify-between rounded-md w-full h-fit" onClick={handleNavigation}>
      <div className="NavImage w-56 h-56 rounded-full bg-red-500  z-10  ">
        {data && data.imgId ? (
          <img src={profileService.getFilePreview(data.imgId)} alt={`${data.name}'s profile`} />
        ) : (
          <img src="default-profile.png" alt="Default profile" />
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="NavName">
          <p className="text-4xl text-black font-semibold">{data ? data.name : "Resturant Name"}</p>
        </div>
        <div className="NavLocation font-semibold text-lg">
          <p>{data ? data.location : "Location"}</p>
        </div>
      </div>
    </div>
  );
};

export default CardNav;
