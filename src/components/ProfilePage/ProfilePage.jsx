import React, { useState } from "react";
import Input from "../InputComponent/Input";
import { useForm } from "react-hook-form";
import profileService from "../../appwrite/profile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const ProfilePage = ({ editdata }) => {
  const authdata = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [fileUrl, setFileUrl] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  function handlePreviewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const filePreview = URL.createObjectURL(file);
      console.log("File preview URL:", filePreview);
      setFileUrl(filePreview);
      setSelectedFile(file);
      setValue("image", file);
    }
  }

  async function handleProfile(data) {
    console.log("Selected file:", selectedFile);
    if (!selectedFile && !editdata) {
      console.error("No file selected.");
      return;
    }

    try {
      let fileId;
      if (selectedFile) {
        fileId = await profileService.uploadFile(selectedFile);
        console.log("Uploaded file ID:", fileId);
      }

      data.imgId = fileId.$id;
      console.log(data.imgId)

      if (editdata) {
        const profileData = await profileService.updateProfile(editdata.UserId, data);
        console.log("Updated profile data:", profileData);
        if (profileData) {
          navigate(`/dashboard/${profileData.$id}`);
        }
      } else {
        data.UserId =authdata.$id? authdata.$id:null
        data.slug = createSlug(data.name);
        const profileData = await profileService.createProfile(data);
        console.log("Created profile data:", profileData);
        if (profileData) {
          navigate(`/dashboard/${profileData.$id}`);
        }
      }
    } catch (error) {
      console.error("Error uploading file or creating/updating profile:", error);
    }
  }

  function createSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return (
    
    <form onSubmit={handleSubmit(handleProfile)}>
      <Navbar />
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="profileBox w-[70vw] h-[70vh] bg-slate-800 rounded-xl flex items-center justify-center">
          <div className="leftSide p-3 m-3 w-1/2 flex gap-10 flex-col items-center justify-center">
            <div className="profileImg w-24 h-24 bg-white rounded-full">
              <img
                className="w-full h-full object-cover rounded-full"
                src={
                  fileUrl
                    ? fileUrl
                    : "https://imgs.search.brave.com/bIkpHw6cWZRHzdOnYK7TnI67_uqVzpREf0V0pQWu_pw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RkL2Yw/LzExL2RkZjAxMTBh/YTE5ZjQ0NTY4N2I3/Mzc2NzllZWM5Y2Iy/LmpwZw"
                }
                alt="Profile Preview"
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
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                onChange={handlePreviewImage}
              />
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="rightSide w-1/2 flex flex-col items-center justify-start gap-3">
            <div>
              <label>Res Name</label>
              <Input placeholder="Res Name" {...register("name")} />
            </div>
            <div>
              <label>Phone Number</label>
              <Input placeholder="Phone Number" {...register("phoneNumber")} />
            </div>
            <div>
              <label>Location</label>
              <Input placeholder="Location" {...register("location")} />
            </div>
            <div className="mt-5">
              <button className="btn btn-wide bg-blue-600 text-2xl font-semibold">
                Set
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfilePage;
