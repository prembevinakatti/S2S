import React from "react";

const Notification = () => {
  return (
    <div>
      <div className="notificationsl flex items-center justify-between w-full h-fit p-2 px-5 rounded-xl mt-2 mb-2 bg-slate-800">
        <div className="flex items-center gap-20">
          <div className="notiImgae w-16 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://imgs.search.brave.com/8e6QukitGDYl8tmQQnBNVFHUheB31mnXT_OeI49PdME/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0Lzk4LzcyLzQz/LzM2MF9GXzQ5ODcy/NDMyM19Gb25BeThM/WVlmRDFCVUMwYmNL/NTZhb1l3dUxISjJH/ZS5qcGc"
              alt=""
            />
          </div>
          <div className="notiContent">
            <p className="text-lg text-white">name</p>
            <p className="text-lg text-white">location</p>
            <p className="text-lg text-white">food</p>
          </div>
        </div>
        <div className="notiTime">
          <p className="text-lg text-white">Time</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
