import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Outlate from './components/Outlate.jsx'
import Login from './components/LoginAndSignUp/Login.jsx'
import SignUp from './components/LoginAndSignUp/SignUp.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Outlate />} >
    <Route path='/login'  element={<Login />} />
    <Route path='/register'  element={<SignUp />} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
