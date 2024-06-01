import React from "react";
import Input from "../InputComponent/Input";
import TextArea from "../TextArea";
import DropDown from "../DropDown";
import { useForm } from "react-hook-form";
import { ID } from "appwrite";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profile";
import uploadServices from "../../appwrite/uploedservices";

const UploadPage = ({ editdata }) => {
  const authdata = useSelector((state) => state.auth.userData);
  const { register, handleSubmit } = useForm();
  const [fileUrl, setFileUrl] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
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
    if (!selectedFile && !editdata) {
      console.error("No file selected.");
      return;
    }
    try {
      let fileId;
      if (selectedFile) {
        fileId = await profileService.uploadFileToStorage(selectedFile);
        console.log("Uploaded file ID:", fileId);
      }

      data.imgId = fileId.$id;
      console.log(data.imgId)

      if (editdata) {
        const foodata = await profileService.uploadFile(editdata.UserId, data);
        console.log("Updated profile data:", foodata);
        if (foodata) {
          navigate(`/dashboard/${foodata.$id}`);
        }
      } else {
        data.UserId =authdata.$id? authdata.$id:null
        data.slug = ID.unique()
        const foodata = await uploadServices.uploadFile(data);
        console.log("Created profile data:", foodata);
        if (foodata) {
          navigate(`/post/${foodata.$id}`);
        }
      }
    
    } catch (error) {
      console.error("Error during upload:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleUpload)}>
      <div className="UploadPage w-full h-full flex px-10 gap-10 items-center justify-evenly">
        <div className="UploadImg w-[30vw] h-[70vh] m-2">
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
        <div className="UploadDetails flex items-center flex-col justify-center gap-5">
          <Input placeholder="Number Of People To Feed" {...register("nofeed")} />
          <TextArea placeholder="Food Items" {...register("fooddetails")} />
          <Input placeholder="Location" {...register("location")} />
          <DropDown {...register("modofdev")} />
          <button className="btn btn-outline w-[22vw] btn-primary" type="submit">
            Upload
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadPage;
