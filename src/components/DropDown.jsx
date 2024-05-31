import React from "react";

const DropDown = () => {
  return (
    <div>
      <select className="select w-[23vw] select-bordered max-w-xs">
        <option disabled selected>
          Mode Of Delivery
        </option>
        <option>Delivery by Us</option>
        <option>Self Pickup</option>
      </select>
    </div>
  );
};

export default DropDown;
