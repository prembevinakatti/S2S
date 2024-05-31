import React, { useState } from 'react';

const Footer = () => {
  const [activeButton, setActiveButton] = useState('Home');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className='absolute bottom-0 px-5 w-full h-14 rounded-md flex items-center justify-between bg-slate-800'>
      <button
        className={`btn btn-outline btn-primary ${activeButton === 'Home' ? 'btn-active' : ''}`}
        onClick={() => handleButtonClick('Home')}
      >
        Home
      </button>
      <button
        className={`btn btn-outline btn-primary ${activeButton === 'Upload' ? 'btn-active' : ''}`}
        onClick={() => handleButtonClick('Upload')}
      >
        Upload
      </button>
      <button
        className={`btn btn-outline btn-primary ${activeButton === 'Profile' ? 'btn-active' : ''}`}
        onClick={() => handleButtonClick('Profile')}
      >
        Profile
      </button>
    </div>
  );
};

export default Footer;
