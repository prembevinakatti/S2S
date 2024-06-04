import React, { useEffect, useState, useMemo } from "react";
import profileService from "../../appwrite/profile";

const CardNav = ({ name }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await profileService.getUser(name);
      if (userData) {
        setData(userData);
      }
    };
    getUser();
  }, [name]);

  const imageSrc = useMemo(() => {
    return data && data.imageId ? profileService.getFilePreview(data.imgId) : "";
  }, [data]);

  return (
    <div className="CardNav flex items-center p-3 bg-slate-800 justify-between rounded-md w-full h-20">
      <div className="NavImage w-12">
        {imageSrc && <img src={imageSrc} alt="Profile" />}
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
