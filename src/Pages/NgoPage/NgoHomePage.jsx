import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import Card from "../../components/CardComp/Card";
import uploadServices from "../../appwrite/uploedservices";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import toast from "react-hot-toast";

const NgoHomePage = () => {
  const userData = useSelector((state) => state.auth.userData);
  const profileData = useSelector((state) => state.profile.profiledata);
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("pending");

  useEffect(() => {
    // Function to fetch food items based on the selected type
    async function getFoodItems(type) {
      let query;

      // Construct the query based on the type
      if (type === "NearLocation") {
        query = [
          Query.equal("location", profileData.location),
          Query.equal("status", "pending")
        ];
      } else {
        query = [
          Query.equal("status", "pending")
        ];
      }

      console.log("Query:", query);

      try {
        const data = await uploadServices.getFood(query);
        console.log("Fetched data:", data);
        setPosts(data.documents.reverse()); // Reverse the array to set the cards last
      } catch (error) {
        toast.error("Error fetching food items:", error);
      }
    }

    // Call the function with the current type
    getFoodItems(type);
  }, [type]);

  return (
    <div className="w-full h-screen overflow-auto">
      <div className="statusSection z-20 mt-2  bg-[#1D232A] fixed w-full h-fit p-3  flex items-center justify-start  gap-3">
        <button
          className="btn btn-primary btn-wide"
          onClick={() => setType("NearLocation")}
        >
          Near Location
        </button>
        <button
          className="btn btn-primary btn-wide"
          onClick={() => setType("FarLocation")}
        >
          Far Location
        </button>
      </div>
      <div className="CardBox mt-16 w-full flex flex-wrap items-center justify-center gap-10 p-3">
        {posts && posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4 max-[600px]:w-11/12">
            <Card {...post} />
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default NgoHomePage;
