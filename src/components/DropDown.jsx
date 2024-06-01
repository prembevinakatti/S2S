import React, { useRef } from "react";

const DropDown = ({ register }) => {
  const selectRef = useRef(null);

  return (
    <div>
      <select
        ref={selectRef}
        {...register("modofdev")}
        className="select w-[23vw] select-bordered max-w-xs"
        defaultValue=""
      >
        <option value="" disabled>
          Mode Of Delivery
        </option>
        <option value="Delivery by Us">Delivery by Us</option>
        <option value="Self Pickup">Self Pickup</option>
      </select>
    </div>
  );
};

export default DropDown;
