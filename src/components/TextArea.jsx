import React, { forwardRef } from 'react';

const TextArea = forwardRef((props, ref) => {
  return (
    <div>
      <textarea type="text" placeholder={props.placeholder}  className="textarea w-[22vw] textarea-bordered" ref={ref} {...props} />
    </div>
  );
});

export default TextArea;
