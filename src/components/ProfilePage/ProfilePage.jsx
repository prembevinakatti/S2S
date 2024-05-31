import React, { useState } from "react";
import Input from "../InputComponent/Input";
import { useForm } from "react-hook-form";
const ProfilePage = (editdata) => {
  const { register, handleSubmit } = useForm();

  const[fileurl,setfileurl]=useState()
  function hanglepreviewimage(e){
       const file= e.target.files[0]
       setfileurl(URL.createObjectURL(file))
  }
  return (
    <form>
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
              <Input />
            </div>
            <div>
              <label>Phone Number</label>
              <Input />
            </div>
            <div>
              <label>Location</label>
              <Input />
            </div>
            <div>
              <label>Number Of Feed</label>
              <Input />
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
