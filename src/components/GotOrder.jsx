import React from 'react'

const GotOrder = () => {
  return (
    <div>
        <div className="GotOrder w-fit h-fit border p-3 border-slate-500 rounded-lg flex flex-col gap-10 items-center  justify-center">
            <h2 className='w-full text-4xl font-semibold text-center'>Got Your Order..?</h2>
            <div className="GotBtns flex items-center gap-5">
                <button className='btn btn-wide btn-success'>Yes</button>
                <button className='btn btn-wide btn-error'>No</button>
            </div>
        </div>
    </div>
  )
}

export default GotOrder