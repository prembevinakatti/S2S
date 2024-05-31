import React from 'react'

const TextArea = (props) => {
  return (
    <textarea className="textarea w-[22vw] resize-none textarea-bordered" placeholder={props.placeholder}></textarea>
  )
}

export default TextArea