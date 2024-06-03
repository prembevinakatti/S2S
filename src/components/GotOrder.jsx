import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import uploadServices from '../appwrite/uploedservices';
import profileService from '../appwrite/profile';

const GotOrder = ({data}) => {
  const [profiledata,profilesetData]=useState()
  const profileData = useSelector((state) => state.profile.profiledata);
  async function handelapprove(){
    let approvedSection = JSON.parse(data.approvedSection || "[]");
    approvedSection = approvedSection.filter((id) => id !==data.slug);
   const updateapp= await profileService.updateapprovedSection(profiledata.$id, { approvedSection: JSON.stringify(approvedSection) });
   if(updateapp){
    let deliveredSection = JSON.parse(data.deliveredSection || "[]");
    deliveredSection = deliveredSection.push(data.slug);
   const updatedel= await profileService.updatedeliveredSection(profiledata.$id, { deliveredSection: JSON.stringify(deliveredSection) });
      if(updatedel){
        await uploadServices.updaterequests(data.slug,"delivered")
        
      }
   }

  }
  useEffect(()=>{
    async function getUser() {
      try {
        const userData = await profileService.getUser(profileData);
        if (userData) {
          profilesetData(userData);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
   

  },[ ])
  return (
    <div>
        <div className="GotOrder w-fit h-fit border p-3 border-slate-500 rounded-lg flex flex-col gap-10 items-center  justify-center">
            <h2 className='w-full text-4xl font-semibold text-center'>Got Your Order..?</h2>
            <div className="GotBtns flex items-center gap-5">
                <button className='btn btn-wide btn-success' onClick={handelapprove}>Yes</button>
                <button className='btn btn-wide btn-error'>No</button>
            </div>
        </div>
    </div>
  )
}

export default GotOrder