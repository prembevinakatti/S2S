import React from 'react'

const TextAreaBox = (props) => {
  return (
    <div className='w-[25vw] scroll-auto px-2 flex items-start justify-start flex-col h-32 text-lg border-2 rounded-lg border-slate-400'>
        <p>{props.details}</p>
    </div>
  )
}

export default TextAreaBox