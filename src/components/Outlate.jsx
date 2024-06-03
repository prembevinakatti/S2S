import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useSelector } from "react-redux";

const Outlate = () => {
  const authData = useSelector((state) => state.auth.userData);
  return (
    <div>
      <Navbar />
      <Outlet />
      {authData?.status === true && <Footer />}
    </div>
  );
};

export default Outlate;
