import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route,  RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Register'
import Protectedroute from './protected/Protectedroute'
import Profile from './Pages/Profile'

function App() {


  const router = createBrowserRouter(
createRoutesFromElements(
   <>
  <Route path='/' element = {<Login/>}/>
  <Route path='/login' element = {<Login/>}/>

  <Route path='/register' element = {<Register/> }/>

<Route element = {<Protectedroute/> }>
  <Route path='/dashboard' element = {<Dashboard/> }/>
   <Route path="/profile" element = {<Profile/>} />
</Route>
 </>
)
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
