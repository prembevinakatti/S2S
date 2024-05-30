import React from "react";
import { useSelector } from "react-redux";
import Logout from "../Logout";
const Navbar = () => {
  const authdata=useSelector((state)=>(state.auth.userData))
  return (
    <div className="w-full h-[5vw] flex justify-between">
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
