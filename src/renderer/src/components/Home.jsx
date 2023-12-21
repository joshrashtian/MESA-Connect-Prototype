/* eslint-disable prettier/prettier */
import React from 'react'
import { auth } from '../../../../firebase'

export const Home = () => {
  return (
    <div className=' justify-evenly items-center h-[100vh]'>
      <h1 className='m-16 text-5xl '>Good morning, {auth.currentUser != undefined || null ? auth.currentUser.displayName : "guest"}</h1>
    </div>
  )
}
