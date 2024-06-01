import React, { useState } from 'react'
import DetailsBox from "../DetailsBox";
import { useParams } from 'react-router-dom';
import uploedservices from '../../appwrite/uploedservices';

const PostPage = () => {
    const[fooddata,setfooddata]=useState()
    const {slug}=useParams()
    useEffect(() => {
        async function getfoood() {
          try {
            const fooddata = await uploedservices.getFood(slug);
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
  return (
    <div className='PostPage py-10 w-full h-full gap-5 flex items-center justify-center'>
        <div className="PostImg w-[25vw] h-[70vh]">
        <img className="w-full h-full object-cover rounded-lg"
          src="https://imgs.search.brave.com/fEvwJdYKaOMoBRa31i9328qtO4yj1b-3yAOeG_2U4jY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NjcwMDM5MDk1ODUt/MmY4YTcyNzAwMjg4/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVEI4Zkh4bGJu/d3dmSHg4Zkh3PQ.jpeg"
          alt=""
        />
        </div>
        <div className="PostDetailes border border-slate-500 rounded-lg flex flex-col items-center justify-center gap-3 w-[50vw] h-[70vh]">
            <div>
                <label className='text-sm text-slate-500'>Res Name</label>
                <DetailsBox details="Res Name" />
            </div>
            <div>
                <label className='text-sm text-slate-500'>Location</label>
                <DetailsBox details="Location" />
            </div>
            <div>
                <label className='text-sm text-slate-500'>Items</label>
                <DetailsBox  details="Items" />
            </div>
            <div>
                <label className='text-sm text-slate-500'>Mode Of Delivery</label>
                <DetailsBox  details="Mode Of Delivery" />
            </div>
            <div>
                <label className='text-sm text-slate-500'>Number Of People Feed</label>
                <DetailsBox  details="Number Of People Feed" />
            </div>
        </div>
    </div>
  )
}

export default PostPage