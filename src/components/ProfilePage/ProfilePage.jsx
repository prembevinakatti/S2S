import React, { useState } from "react";
import Input from "../InputComponent/Input";
import { useForm } from "react-hook-form";

import profileService from "../../appwrite/profile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProfilePage = (editdata) => {
  const authdata=useSelector((state)=>state.auth.userData)
  const navigate=useNavigate()
  const { register, handleSubmit } = useForm();
  const[filee,setfile]=useState()
  const[fileurl,setfileurl]=useState()
  function hanglepreviewimage(e) {
    const file = e.target.files[0];
    if (file) {
        setfile(file);
        const filepreview = URL.createObjectURL(file);
        console.log("File preview URL:", filepreview); // Check if URL is generated correctly
        setfileurl(filepreview);
    }
}
  async  function handelprofile(data){
    console.log(data)
      if(editdata){

      }else{
        try {
          const fileid=await profileService.uploadFile(data.image)
          if(fileid){
            data.userId=authdata.$id
            data.imageId=fileid
            data.slug=createslug(data.name)
            profileService.createProfile(...data).then((profiledata)=>{
              console.log(profiledata)
              if(profiledata){
                navigate(`/dashbord${profiledata.$id}`)
              }
            })
          }
        } catch (error) {
          
        }
      }
    }
    function createslug(name){
      return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '-')
    }
  return (
    <form onSubmit={handleSubmit(handelprofile)}>
      <div className="w-full h-[80vh]  flex items-center justify-center">
        <div className="profileBox w-[70vw] h-[70vh] bg-slate-800 rounded-xl flex items-center justify-center">
          <div className="leftSide p-3 m-3 w-1/2 flex gap-10 flex-col items-center justify-center">
            <div className="profileImg w-24 bg-white p-2 rounded-full">
              <img
                className="w-full h-full object-cover"
                src={fileurl}
                alt=""
              />
            </div>
            <div className="Add">
              <label
                htmlFor="image-upload"
                className="bg-slate-600 text-white py-2 px-4 rounded cursor-pointer"
              >
                Add Image
              </label>
              <input
              onChange={hanglepreviewimage}
                id="image-upload"
                type="file"
                className=" hidden cursor-pointer"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image")
                 
                }
              />
            </div>
          </div>
          <div className=" divider lg:divider-horizontal"></div>
          <div className="rightSide  w-1/2 flex flex-col items-center justify-start gap-3">
            <div>
              <label>Res Name</label>
              <Input
              placeholder="Res Name"{...register("name")}
               />
            </div>
            <div>
              <label>Phone Number</label>
              <Input placeholder="phone number"{...register("phoneNumber")} />
            </div>
            <div>
              <label>Location</label>
              <Input placeholder="Location"{...register("location")}/>
            </div>
                

            <div className="mt-5">
              <button className="btn btn-wide bg-blue-600 text-2xl font-semibold">Set</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfilePage;
