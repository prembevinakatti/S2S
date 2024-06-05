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
    <div className="CardNav flex items-center p-3 bg-slate-800 justify-between rounded-md w-full h-20" onClick={handleNavigation}>
      <div className="NavImage w-20  z-10 rounded-lg overflow-hidden">
        {data && data.imgId ? (
          <img src={profileService.getFilePreview(data.imgId)} alt={`${data.name}'s profile`} />
        ) : (
          <img src="default-profile.png" alt="Default profile" />
        )}
      </div>
      <div>
        <div className="NavName">
          <p className="text-2xl">{data ? data.name : "null"}</p>
        </div>
        <div className="NavLocation">
          <p>{data ? data.location : "null"}</p>
        </div>
      </div>
    </div>
  );
};

export default CardNav;
