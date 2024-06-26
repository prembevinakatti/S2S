import React from 'react'
import authService from '../appwrite/services'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authslice'
import toast from 'react-hot-toast'
const Logout = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  function handelogout(){
    authService.logout().then(()=>{
      
      navigate("/")
      dispatch(logout())
      toast.success("Logout Successfully")
    })
  }
  return (
    <button className='btn btn-outline m-3 btn-error' onClick={handelogout}>Logout</button>
  )
}

export default Logout