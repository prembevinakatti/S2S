import React, { useEffect, useState } from "react";
import Card from "../../components/CardComp/Card";
import uploadServices from "../../appwrite/uploedservices";
import { useSelector } from "react-redux";


const OrderDetailsPage = () => {
  const usedata = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("pending");
  const profiledata = useSelector((state) => state.profile.profiledata);

  useEffect(() => {
    async function getFoodCards(type) {
      if (Array.isArray(profiledata.type)) {
        const promises = profiledata.type.map((cardType) => 
          uploadServices.getSingleFood(cardType)
        );
        const results = await Promise.all(promises);
        setPosts(results);
      }
    }

    getFoodCards(type);
  }, [type, usedata, profiledata.type]);

  return (
    <div className="w-full h-screen overflow-auto">
      <div className="statusSection w-fit h-fit p-3 m-3 flex items-center justify-center gap-3">
        <button
          className="btn btn-primary btn-wide"
          onClick={() => setType("pending")}
        >
          Pending
        </button>
        <button
          className="btn btn-primary btn-wide"
          onClick={() => setType("approved")}
        >
          Approved
        </button>
        <button
          className="btn btn-primary btn-wide"
          onClick={() => setType("delivered")}
        >
          Delivered
        </button>
      </div>
      <div className="CardBox w-full flex flex-wrap items-center justify-center gap-10 p-3">
        {posts && posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4 max-[600px]:w-11/12">
            <Card {...post} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default OrderDetailsPage;
