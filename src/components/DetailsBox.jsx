import React from 'react'

const DetailsBox = (props) => {
  return (
    <div className='w-[25vw] px-2 flex items-start justify-center flex-col h-14 text-lg border-2 rounded-lg border-slate-400'>
        <p>{props.details}</p>
    </div>
  )
}

export default DetailsBox