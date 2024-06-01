import React from "react";
import Login from "../../components/LoginAndSignUp/Login";

const NgoLoginPage = () => {
  return (
    <>
      <div className="text-4xl w-full text-center">Ngo Login Page</div>
      <Login flag={false} />
    </>
  );
};

export default NgoLoginPage;
