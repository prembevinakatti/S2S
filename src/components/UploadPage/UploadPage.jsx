import React from "react";
import Input from "../InputComponent/Input";
import TextArea from "../TextArea";
import DropDown from "../DropDown";

const UploadPage = () => {
  return (
    <div className="UploadPage w-full h-full flex px-10 gap-10 items-center justify-evenly ">
      <div className="UploadImg w-[30vw] h-[70vh] m-2">
        <img className="w-full h-full object-cover rounded-lg"
          src="https://imgs.search.brave.com/fEvwJdYKaOMoBRa31i9328qtO4yj1b-3yAOeG_2U4jY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NjcwMDM5MDk1ODUt/MmY4YTcyNzAwMjg4/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVEI4Zkh4bGJu/d3dmSHg4Zkh3PQ.jpeg"
          alt=""
        />
      </div>
      <div className="UploadDetails flex items-center flex-col justify-center gap-5">
        <Input placeholder="Number Of People To Feed" />
        <TextArea placeholder="Food Items" />
        <Input placeholder="Location" />
        <DropDown />
        <button className="btn btn-outline w-[22vw] btn-primary">Upload</button>
      </div>
    </div>
  );
};

export default UploadPage;
