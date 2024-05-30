import React, { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" ref={ref} {...props} />
    </div>
  );
});

export default Input;
