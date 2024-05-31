import { useEffect } from 'react'
import LandingPage from './components/LandingPage/LandingPage'
import SignUp from './components/LoginAndSignUp/SignUp'
import { useDispatch } from 'react-redux'
import authService from './appwrite/services'
import { login } from './store/authslice'

function App() {
  const dispatch =useDispatch()
  useEffect(()=>{
    try {
      authService.getCurrentUser().then((data)=>{
        if(data){
          console.log(data)
          dispatch(login(data))
        }
      })
    } catch (error) {
      console.log(error)
    }
  },[])
  return (
   <></>
  )
}

export default App
