import React from 'react'

const CardDetails = (props) => {
  return (
    <div className={`w-[23vw] px-2  flex items-start justify-center flex-col h-10 text-lg border-b-2 overflow-x-hidden  border-slate-400 `}>
        <p className='line-clamp-1'>{props.details}</p>
    </div>
  )
}

export default CardDetails