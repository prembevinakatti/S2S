import React from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Navbar />
      <div className="LandingContent w-full h-[85vh]">
        <div className="heading flex flex-col items-center justify-center gap-3">
          <motion.h1
            initial={{ opacity: 0, x: -50 }} // Initial animation state
            animate={{ opacity: 1, x: 0 }} // Animation to apply
            transition={{ duration: 1 }}
            className="text-5xl font-semibold text-white"
          >
            Surplus To Serve
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: 50 }} // Initial animation state
            animate={{ opacity: 1, x: 0 }} // Animation to apply
            transition={{ duration: 1 }}
            className="text-4xl"
          >
            Efficient Food Redistribution Platform
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
