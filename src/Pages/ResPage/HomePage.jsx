import React, { useEffect } from "react";
import Card from "../../components/CardComp/Card";
import { useState } from "react";
import uploadServices from "../../appwrite/uploedservices";
import { Query } from "appwrite";
import authService from "../../appwrite/services";
import { useSelector } from "react-redux";
const HomePage = () => {
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
