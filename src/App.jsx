import { useState } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/LoginAndSignUp/Login'
function App() {

  return (
   <div>
     <LandingPage />
    <Login />
   </div>
  )
}

export default App
