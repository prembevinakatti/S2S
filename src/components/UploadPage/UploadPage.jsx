import React, { useEffect, useState } from "react";
import Input from "../InputComponent/Input";
import TextArea from "../TextArea";
import DropDown from "../DropDown";
import { useForm } from "react-hook-form";
import { ID } from "appwrite";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profile";
import uploadServices from "../../appwrite/uploedservices";
import { useNavigate } from "react-router-dom"; // Add this import if not already present
import toast from "react-hot-toast";

const UploadPage = ({ editdata }) => {
  const authdata = useSelector((state) => state.auth.userData);
  const navigate = useNavigate(); // Add this line if not already present
  const { register, handleSubmit, setValue } = useForm();
  const [fileUrl, setFileUrl] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [cordinates,setcordinates]=useState(null)
  function handlePreviewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const filePreview = URL.createObjectURL(file);
      console.log("File preview URL:", filePreview);
      setFileUrl(filePreview);
      setSelectedFile(file);
      setValue("image", file); // Manually set the file value
    }
  }

  async function handleUpload(data) {
    console.log(data);
    if (!selectedFile && !editdata) {
      console.error("No file selected.");
      return;
    }
    try {
      let fileId;
      if (selectedFile) {
        fileId = await uploadServices.uploadFileToStorage(selectedFile);
        console.log("Uploaded file ID:", fileId);
      }

      data.imageId = fileId?.$id;
      console.log(data.imageId);

      if (editdata) {
        const foodata = await profileService.uploadFile(editdata.UserId, data);
        console.log("Updated profile data:", foodata);
        if (foodata) {
          navigate(`/dashboard/${foodata.$id}`);
        }
      } else {
        if(cordinates){
          data.coordinates=cordinates
        }
        data.userId = authdata?.$id ?? null;
        data.slug = ID.unique();
        data.name = authdata?.name ?? null;
        const foodata = await uploadServices.uploadFile(data);
        console.log("Created profile data:", foodata);
        if (foodata) {
          navigate(`/post/${foodata.$id}`);
        }
        toast.success("Food Posted successfully")
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  }
  useEffect(()=>{
    if ('geolocation' in navigator) {
      console.log('Geolocation is available.');
      navigator.geolocation.getCurrentPosition(
          
          (position) => {
            setcordinates(JSON.stringify([position.coords.latitude,position.coords.longitude]))
            
          },
          
          (error) => {
              console.error('Error getting geolocation:', error.message);
          },
          
          
      );
  } else {
      console.log('Geolocation is not available.');
  }

  },[ ])

  return (
    <form onSubmit={handleSubmit(handleUpload)}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="UploadPage border border-slate-700 w-fit h-full flex p-20 gap-20 items-center justify-evenly">
          <div className="UploadImg  w-[20vw] flex flex-col items-center gap-5 justify-center m-2">
            <img
              className="w-full h-full object-cover rounded-full"
              src={
                fileUrl
                  ? fileUrl
                  : "https://imgs.search.brave.com/bIkpHw6cWZRHzdOnYK7TnI67_uqVzpREf0V0pQWu_pw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RkL2Yw/LzExL2RkZjAxMTBh/YTE5ZjQ0NTY4N2I3/Mzc2NzllZWM5Y2Iy/LmpwZw"
              }
              alt="Profile Preview"
            />
            <div className="Add">
              <label
                htmlFor="image-upload"
                className="bg-slate-600 text-white py-2 px-4 rounded cursor-pointer"
              >
                Add Image
              </label>
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                onChange={handlePreviewImage}
              />
            </div>
          </div>
          <div className="UploadDetails flex items-start flex-col justify-center gap-5">
            <Input
              placeholder="Number Of People To Feed"
              {...register("nofeed")}
            />
            <Input
            type="time"
              placeholder="timea at which food prepared"
              {...register("timeoffoodprepared")}
            />
            <Input
            type="time"
              placeholder="approximate time it expire"
              {...register("foodsustainability")}
            />
            <TextArea placeholder="Food Items" {...register("fooddetails")} />
            <Input placeholder="Location" {...register("location")} />
            <DropDown register={register} />
            <button
              className="btn btn-outline w-[20vw] btn-primary"
              type="submit"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UploadPage;
