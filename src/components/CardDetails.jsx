import React from 'react'

const CardDetails = (props) => {
  return (
    <div className={`w-[23vw] px-2  flex items-start justify-center flex-col h-10 text-lg border-b-2  border-slate-400 overflow-auto`}>
        <p className='line-clamp-1'>{props.details}</p>
    </div>
  )
}

export default CardDetails