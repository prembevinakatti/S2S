import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const Footer = () => {
  const [activeButton, setActiveButton] = useState('Home');
  const profileData = useSelector((state) => state.profile.profiledata);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
if(profileData.neoNumber=null||" "||undefined){
  return (
    <div className='fixed z-10 bottom-0 px-5 w-full h-14 rounded-md flex items-center justify-between bg-slate-800'>
      <button
        className={`btn btn-outline btn-primary ${activeButton === 'Home' ? 'btn-active' : ''}`}
        onClick={() => handleButtonClick(`ResHomepage`)}
      >
        Home
      </button>
      <button
        className={`btn btn-outline btn-primary ${activeButton === 'Upload' ? 'btn-active' : ''}`}
        onClick={() => handleButtonClick('ResUploedpage')}
      >
        Upload
      </button>
      <button
        className={`btn btn-outline btn-primary ${activeButton === 'Profile' ? 'btn-active' : ''}`}
        onClick={() => handleButtonClick(`/ResDashboard/${profileData.$id}`)}
      >
        Profile
      </button>
    </div>
  );
}
else{
  return (
    <div className='fixed z-10 bottom-0 px-5 w-full h-14 rounded-md flex items-center justify-between bg-slate-800'>
      <button
        className={`btn btn-outline btn-primary ${activeButton === 'Home' ? 'btn-active' : ''}`}
        onClick={() => handleButtonClick('NgoHomepage')}
      >
        Home
      </button>
      <button
        className={`btn btn-outline btn-primary ${activeButton === 'Upload' ? 'btn-active' : ''}`}
        onClick={() => handleButtonClick('Orderdetailspage')}
      >
        Upload
      </button>
      <button
        className={`btn btn-outline btn-primary ${activeButton === 'Profile' ? 'btn-active' : ''}`}
        onClick={() => handleButtonClick(`/ResDashboard/${profileData.$id}`)}
      >
        Profile
      </button>
    </div>
  );
}
  
};

export default Footer;
