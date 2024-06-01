import React from "react";
import SignUp from "../../components/LoginAndSignUp/SignUp";

const ResRegPage = () => {
  return (
    <>
      <div className="text-4xl w-full mb-5 mt-5 text-center">Resturant Register Page</div>
      <SignUp flag={true} />
    </>
  );
};

export default ResRegPage;
