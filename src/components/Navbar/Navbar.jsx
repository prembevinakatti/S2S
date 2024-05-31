import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Logout from "../Logout";

const Navbar = () => {
  const authdata=useSelector((state)=>state.auth.userData)
  console.log(authdata);


  return (
    <div className="w-full h-[5vw] mb-2 flex justify-between">
      <div className="Logo m-2 p-1 w-16 h-full">
        <img className="w-fit h-full object-center" src="src/assets/S2SLogo.png" alt="" />
      </div>
      <div>
        {
          authdata&&(
            <Logout/>
          )
        }
        
      </div>
    </div>
  );
};

export default Navbar;
