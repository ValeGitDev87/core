import React from 'react'
import {Outlet, Navigate} from "react-router-dom"
import { useStateContext } from '../context/Context'

function GuestLayout() {
  
  const {token,user} = useStateContext();

  if(token){

    return <Navigate to='/users'/>
  }


  return (
   <div id='guestLayout'>

     <Outlet/>
   </div>
    
  )
}

export default GuestLayout