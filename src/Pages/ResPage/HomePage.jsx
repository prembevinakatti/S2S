import React, { useEffect, useState } from "react";
import Card from "../../components/CardComp/Card";
import uploadServices from "../../appwrite/uploedservices";
import { Query } from "appwrite";
import authService from "../../appwrite/services";
import { useSelector } from "react-redux";
const HomePage = () => {
<<<<<<< HEAD
  const usedata=useSelector((state)=>(state.auth.userData))
  const[posts,setposts]=useState(null)
  const[type,settype]=useState("pending")
  useEffect(()=>{
   function getfooditeams(type){
    if(type=="deliverd"){
      const query=Query( [Query.equal("userId",`${usedata.$id}`,Query.equal("status",false))])
      uploadServices.getFood({query}).then((data)=>{
          setposts([...posts,data.documents])
    })}
    else{
      const query=Query( [Query.equal("userId",`${usedata.$id}`,Query.equal("status",false))])
      uploadServices.getFood({query}).then((data)=>{
          setposts([...posts,data.documents])
    })
    }
   }
    getfooditeams(type)
  },[type])
=======
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
        setPosts(data.documents);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    }

    getFoodItems(type);
  }, [type, usedata]);

>>>>>>> 99a310e05489ebdd1d4cafab5bc92d1dcfc5eb16
  return (
    <div className="w-full h-screen overflow-auto">
      <div className="statusSection w-fit h-fit p-3 m-3 flex items-center justify-center gap-3">
        <button className="btn btn-primary btn-wide" onClick={settype("deliverd")}>Delivered</button>
        <button className="btn btn-primary btn-wide"  onClick={settype("Pending")}>Pending</button>
      </div>
      <div className="CardBox w-full flex flex-wrap items-center justify-center gap-10 p-3">
      {
                    posts&&(
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4 max-[600px]:w-11/12'>
                                <Card {...post} />
                            </div>
                        ))
                    )
                }
        
      </div>
    </div>
  );
};

export default HomePage;
