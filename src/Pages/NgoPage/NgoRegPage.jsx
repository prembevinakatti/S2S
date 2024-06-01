import React from "react";
import SignUp from "../../components/LoginAndSignUp/SignUp";

const NgoRegPage = () => {
  return (
    <>
      <div className="text-4xl w-full mb-5 mt-5 text-center">Ngo Register Page</div>
      <SignUp flag={false} />
    </>
  );
};

export default NgoRegPage;
