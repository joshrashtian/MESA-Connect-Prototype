/* eslint-disable prettier/prettier */
import React from 'react'
import { auth } from '../../../../firebase'

export const Home = () => {
  return (
    <div className=' justify-evenly items-center'>
      <h1 className='m-16 text-5xl '>Good morning, {auth.currentUser != undefined || null ? auth.currentUser.displayName : "guest"}</h1>

      <div className='p-52 bg-white'>
        <h1>Hello</h1>
      </div>
      <div className='p-52 bg-white'>
        <h1>Hello</h1>
      </div>
    </div>
  )
}
