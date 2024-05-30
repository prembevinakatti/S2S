import React from 'react'
import { forwardRef } from 'react'
const Input = ({ref}) => {
  return (
    <div>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" ref={ref} />
    </div>
  )
}

export default forwardRef.Input