import React, { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" placeholder={props.placeholder} className="input input-bordered w-[23vw] max-w-xs" ref={ref} {...props} />
    </div>
  );
});

export default Input;
