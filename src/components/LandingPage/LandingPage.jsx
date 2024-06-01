import React from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const paragraphText = `Our web application simplifies the process of sharing surplus food, offering a user-friendly and efficient workflow. 
  Users start by registering and logging in securely through Appwrite's authentication service. Once logged in, they 
  can create and manage their profiles, including personal and contact information. The core feature allows users to upload 
  details about surplus food they wish to share, such as the name, location, mode of delivery, and a detailed description. Users 
  can also upload images of the food items, with an immediate preview to ensure accuracy. The app provides real-time updates on 
  available food items, ensuring the most current information is always accessible. A robust search and filter system allows users
   to find specific food items based on various criteria, such as location, type of food, and delivery method. Additionally, users 
   have the ability to edit or delete their uploaded food items and update their profile information as needed, making the process of 
   sharing and receiving surplus food seamless and efficient.`;

  const words = paragraphText.split(" ").map((word, index) => (
    <span key={index} className="word">
      {word}{" "}
    </span>
  ));

  const handleResClick = () => {
    navigate("/ResLoginPage");
  };
  const handleNgoClick = () => {
    navigate("/NgoLoginPage");
  };

  return (
    <div className="LandingPage">
      <div className="LandingContent w-full h-[85vh]">
        <div className="heading flex flex-col items-center justify-center gap-3">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-semibold text-white"
          >
            Surplus To Serve
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl"
          >
            Efficient Food Redistribution Platform
          </motion.h1>
        </div>

        <div className="paraContent w-full p-3 mt-10 h-fit flex items-start justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-[70vw] text-center font-semibold text-2xl "
          >
            {words}
          </motion.p>
        </div>

        <div className="LandingBtns w-full h-fit flex items-center mt-10 justify-center gap-5">
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            onClick={handleResClick}
            className="btn btn-wide btn-outline btn-primary"
          >
            Restaurant
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            onClick={handleNgoClick}
            className="btn btn-wide btn-outline btn-primary"
          >
            NGO
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
