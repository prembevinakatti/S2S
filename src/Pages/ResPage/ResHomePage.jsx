import React, { useEffect, useState } from "react";
import Card from "../../components/CardComp/Card";
import uploadServices from "../../appwrite/uploedservices";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

const ResHomePage = () => {
  const usedata = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("pending");

  useEffect(() => {
    async function getFoodItems(type) {
      if (!usedata?.$id) return;

      let query = [
        Query.equal("userId", usedata.$id),
        Query.equal("status", type)
      ];

      console.log("Query:", query);

      try {
        const data = await uploadServices.getFood(query);
        console.log("Fetched data:", data);
        setPosts(data.documents.reverse()); // Reverse the order of the posts
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    }

    getFoodItems(type);
  }, [type, usedata?.$id]); // Add usedata.$id to the dependency array

  return (
    <div className="w-full h-screen overflow-auto">
      <div className="statusSection fixed bg-[#1D232A] z-10 w-full h-fit p-3  flex items-center justify-start gap-3">
        <button
          className="btn btn-primary btn-wide"
          onClick={() => setType("delivered")}
        >
          Delivered
        </button>
        <button
          className="btn btn-primary btn-wide"
          onClick={() => setType("pending")}
        >
          Pending
        </button>
      </div>
      <div className="CardBox bg-[#1D232A] mt-20 w-full flex flex-wrap items-center justify-center gap-10 p-3">
        {posts && posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4 max-[600px]:w-11/12">
            <Card {...post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResHomePage;
