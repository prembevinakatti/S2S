import React, { useEffect, useState } from 'react'
import DetailsBox from "../DetailsBox";

import { useParams } from 'react-router-dom';
import uploedservices from '../../appwrite/uploedservices';

import TextAreaBox from '../TextAreaBox';
import profileService from '../../appwrite/profile';


const PostPage = () => {
    const[fooddata,setfooddata]=useState()
    const {slug}=useParams()
    useEffect(() => {
        async function getfoood() {
          try {
            const fooddata = await uploedservices.getSingleFood(slug);
            if (fooddata) {
              console.log(fooddata)
              setfooddata(fooddata);
            }
          } catch (error) {
            console.log(error);
          }
        }
        getfoood();
      },[]);
  if(fooddata){
    return(
      <div className='PostPage py-10 w-full h-full gap-5 flex items-center justify-center'>
        <div className="PostImg w-[25vw] h-[70vh]">
        <img className="w-full h-full object-cover rounded-lg"
          src={profileService.getFilePreview(fooddata.imageId)}
          alt=""
        />
        </div>
        <div className="PostDetailes m-5 border border-slate-500 rounded-lg p-3 flex flex-col items-center justify-center gap-3 w-[50vw] h-fit">
            <div>
                <label className='text-sm text-slate-500'>Res Name</label>
                <DetailsBox details={fooddata.name} />
            </div>
            <div>
                <label className='text-sm text-slate-500'>Location</label>
                <DetailsBox details={fooddata.location} />
            </div>
            <div>
                <label className='text-sm text-slate-500'>Items</label>
                <TextAreaBox  details={fooddata.fooddetails} />
            </div>
            <div>
                <label className='text-sm text-slate-500'>Mode Of Delivery</label>
                <DetailsBox  details={fooddata.modofdev} />
            </div>
            <div>
                <label className='text-sm text-slate-500'>Number Of People Feed</label>
                <DetailsBox  details={fooddata.nofeed} />
            </div>
            <div>
                <label className='text-sm text-slate-500'>Phone Number</label>
                <DetailsBox  details={fooddata.phoneNumber} />
            </div>
        </div>
    </div>
    )
  }
}

export default PostPage