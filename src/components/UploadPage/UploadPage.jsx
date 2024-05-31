import React from "react";
import Input from "../InputComponent/Input";
import TextArea from "../TextArea";
import DropDown from "../DropDown";
import { useForm } from "react-hook-form";
import { ID } from "appwrite";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profile";
const UploadPage = (editdata) => {
  const authdata = useSelector((state) => state.auth.userData);
  const {register,handleSubmit} =useForm()
  async function  handeluplod(data){
    if(editdata){
      try {
        data.slug=editdata.$id
        data.userId=authdata.$id
        const imageid=[]
        data.images.map((image,index)=>{
           const data=async()=>(await profileService.uploadFile(image))
            if(data){
              imageid.push(data)
            }

            if(imageid.length!=0){
              data.imageids=JSON.stringify(imageid)
              const uplodfile=async()=>(k)


            }
        })
      } catch (error) {
        
      }
    }
    else{
        try {
          data.slug=ID.unique()
          data.userId=authdata.$id
          const imageid=[]
          data.images.map((image,index)=>{
             const data=async()=>(await profileService.uploadFile(image))
              if(data){
                imageid.push(data)
              }

              if(imageid.length!=0){
                data.imageids=JSON.stringify(imageid)
                const uplodfile=async()=>(k)


              }
          })
        } catch (error) {
          
        }

    }
  }
  return (
    <form action="" onSubmit={handleSubmit(handeluplod)}>
    <div className="UploadPage w-full h-full flex px-10 gap-10 items-center justify-evenly ">
      <div className="UploadImg w-[30vw] h-[70vh] m-2">
      <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                onChange={handlePreviewImage}
                {...register("images")}
              />
      </div>
      <div className="UploadDetails flex items-center flex-col justify-center gap-5">
        <Input placeholder="Number Of People To Feed" {...register("nofood")} />
        <TextArea placeholder="Food Items" {...register("details")} />
        <Input placeholder="Location" {...register("location")} />
        <DropDown {...register("modofdev")} />
        <button className="btn btn-outline w-[22vw] btn-primary" type="submit">Upload</button>
      </div>
    </div>
    </form>
  );
};

export default UploadPage;
