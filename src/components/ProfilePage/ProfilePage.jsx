import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import profileService from "../../appwrite/profile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/services";
import toast from "react-hot-toast";

const ProfilePage = ({ editdata, flag }) => {
  const authdata = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [fileUrl, setFileUrl] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [cordinates, setCordinates] = useState(null);
  const validNgoNumbers = ["12345", "67890", "ABCDE"];

  function handlePreviewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const filePreview = URL.createObjectURL(file);
      setFileUrl(filePreview);
      setSelectedFile(file);
      setValue("image", file);
    }
  }

  async function handleProfile(data) {
    if (!selectedFile && !editdata) {
      toast.error("No file selected.");
      return;
    }

    try {
      let fileId;
      if (selectedFile) {
        fileId = await profileService.uploadFile(selectedFile);
        data.imgId = fileId.$id;
      }

      if (editdata) {
        const profileData = await profileService.updateProfile(editdata.UserId, data);
        if (profileData) {
          navigate(`/dashboard/${profileData.$id}`);
        }
      } else {
        if (cordinates) {
          data.coordinates = cordinates;
        }
        data.UserId = authdata && authdata.$id ? authdata.$id : "vgvgvvhg";
        data.slug = createSlug(data.name);
        authService.updateName(data.slug);
        const profileData = await profileService.createProfile(data);
        if (profileData) {
          flag
            ? navigate(`/ResDashboard/${profileData.$id}`)
            : navigate(`/NgoDashboard/${profileData.$id}`);
        }
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Error uploading file or creating/updating profile: " + error.message);
    }
  }

  function createSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCordinates(
            JSON.stringify([
              position.coords.latitude,
              position.coords.longitude,
            ])
          );
        },
        (error) => {
          toast.error("Error getting geolocation: " + error.message);
        }
      );
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(handleProfile)} className="w-full h-[80vh] flex items-center justify-center">
      <div className="profileBox w-[70vw] h-[70vh] bg-slate-800 rounded-xl flex items-center justify-center p-6">
        <div className="leftSide p-3 m-3 w-1/2 flex flex-col items-center justify-center gap-4">
          <div className="profileImg w-24 h-24 bg-white rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                fileUrl
                  ? fileUrl
                  : "https://imgs.search.brave.com/bIkpHw6cWZRHzdOnYK7TnI67_uqVzpREf0V0pQWu_pw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RkL2Yw/LzExL2RkZjAxMTBh/YTE5ZjQ0NTY4N2I3/Mzc2NzllZWM5Y2Iy/LmpwZw"
              }
              alt="Profile Preview"
            />
          </div>
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
        <div className="divider lg:divider-horizontal"></div>
        <div className="rightSide w-1/2 flex flex-col items-center justify-start gap-4">
          {flag ? (
            <div className="w-full">
              <label className="block text-sm text-gray-200 mb-1">Res Name</label>
              <input 
                placeholder="Res Name" 
                className="input input-bordered w-full"
                {...register("name", { required: "Res Name is required" })} 
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
          ) : (
            <div className="w-full">
              <label className="block text-sm text-gray-200 mb-1">Ngo Name</label>
              <input 
                placeholder="Ngo Name" 
                className="input input-bordered w-full"
                {...register("name", { required: "Ngo Name is required" })} 
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
          )}
          {!flag && (
            <div className="w-full">
              <label className="block text-sm text-gray-200 mb-1">Ngo Number</label>
              <input
                placeholder="Ngo Number"
                className="input input-bordered w-full"
                {...register("ngoNumber", {
                  required: "Ngo Number is required",
                  validate: (value) =>
                    validNgoNumbers.includes(value) || "Invalid Ngo Number",
                })}
              />
              {errors.ngoNumber && <p className="text-red-500 text-sm">{errors.ngoNumber.message}</p>}
            </div>
          )}
          <div className="w-full">
            <label className="block text-sm text-gray-200 mb-1">Phone Number</label>
            <input 
              placeholder="Phone Number" 
              className="input input-bordered w-full"
              {...register("phoneNumber", { required: "Phone Number is required" })} 
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>
          <div className="w-full">
            <label className="block text-sm text-gray-200 mb-1">Location</label>
            <input 
              placeholder="Location" 
              className="input input-bordered w-full"
              {...register("location", { required: "Location is required" })} 
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>
          {!flag && (
            <div className="w-full">
              <label className="block text-sm text-gray-200 mb-1">Number of People to Feed</label>
              <input 
                placeholder="Number of People to Feed" 
                className="input input-bordered w-full"
                {...register("nofeed", { required: "Number of People to Feed is required" })} 
              />
              {errors.nofeed && <p className="text-red-500 text-sm">{errors.nofeed.message}</p>}
            </div>
          )}
          <div className="mt-5">
            <button className="btn btn-wide bg-blue-600 text-2xl font-semibold">
              Set Profile
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfilePage;
