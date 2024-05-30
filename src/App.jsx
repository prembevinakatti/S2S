import { useState } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/LoginAndSignUp/Login'
import SignUp from './components/LoginAndSignUp/SignUp'
function App() {

  return (
   <div>
     <LandingPage />
     <SignUp />
   </div>
  )
}

export default App
