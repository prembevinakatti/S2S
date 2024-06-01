import React from "react";
import ProfilePage from "../../components/ProfilePage/ProfilePage";

const NgoProfilePage = () => {
  return (
    <>
      <div className="text-4xl w-full mb-5 mt-5 text-center">Ngo Profile Page</div>
      <ProfilePage flag={false} />
    </>
  );
};

export default NgoProfilePage;
