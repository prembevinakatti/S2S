import React from 'react'
import authService from '../appwrite/services'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authslice'
const Logout = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  function handelogout(){
    authService.logout().then(()=>{
      
      navigate("/login")
      dispatch(logout())
    })
  }
  return (
    <button className='btn btn-outline btn-error' onClick={handelogout}>Logout</button>
  )
}

export default Logout