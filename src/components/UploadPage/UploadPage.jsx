import React from "react";
import Input from "../InputComponent/Input";
import TextArea from "../TextArea";
import DropDown from "../DropDown";
import { useForm } from "react-hook-form";
import { ID } from "appwrite";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profile";
import uploadServices from "../../appwrite/uploadServices";

const UploadPage = ({ editdata }) => {
  const authdata = useSelector((state) => state.auth.userData);
  const { register, handleSubmit } = useForm();

  async function handleUpload(data) {
    try {
      const imageIds = [];
      const uploadImagePromises = data.images.map(async (image) => {
        const uploadResult = await profileService.uploadFile(image);
        if (uploadResult) {
          imageIds.push(uploadResult.$id);
        }
      });
      await Promise.all(uploadImagePromises);

      if (imageIds.length > 0) {
        data.imageId = JSON.stringify(imageIds);
      }

      data.userId = authdata.$id;

      if (editdata) {
        data.slug = editdata.$id;
        const updatedFile = await uploadServices.updateFile(editdata.$id, data);
        if (updatedFile) {
          console.log("File updated successfully:", updatedFile);
        }
      } else {
        data.slug = ID.unique();
        const uploadedFile = await uploadServices.uploadFile(data);
        if (uploadedFile) {
          console.log("File uploaded successfully:", uploadedFile);
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
          <input
            id="image-upload"
            type="file"
            className="hidden"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("images")}
          />
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
