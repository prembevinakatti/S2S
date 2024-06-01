import React from "react";
import Login from "../../components/LoginAndSignUp/Login";

const ResLoginPage = () => {
  return (
    <>
      <div className="text-4xl w-full mb-5 mt-5 text-center">Resturant Login Page</div>
      <Login flag={true} />
    </>
  );
};

export default ResLoginPage;
