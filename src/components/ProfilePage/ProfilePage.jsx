import React from 'react'

const ProfilePage = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className="leftSide w-1/2 bg-red-500 flex flex-col items-center justify-center">
          <div className="profileImg w-24 bg-white p-2 rounded-full">
            <img className='w-full h-full object-cover' src="src/assets/google.png" alt="" />
          </div>
      </div>
      <div className="rightSide w-1/2 bg-blue-600">
        <h1>Profile Page</h1>
      </div>
    </div>
  )
}

export default ProfilePage