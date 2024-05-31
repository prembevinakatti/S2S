import { useEffect } from 'react'
import LandingPage from './components/LandingPage/LandingPage'
import SignUp from './components/LoginAndSignUp/SignUp'
import { useDispatch } from 'react-redux'
import authService from './appwrite/services'
import { login } from './store/authslice'
import { data } from 'autoprefixer'
function App() {
  const dispatch =useDispatch()
  useEffect(()=>{
    try {
      authService.getCurrentUser().then(()=>{
        if(data){
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
