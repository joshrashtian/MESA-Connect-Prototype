/* eslint-disable prettier/prettier */
import React from 'react'
import { auth } from '../../../../firebase'

export const Home = () => {
  return (
    <div className=' justify-evenly items-center h-[100vh]'>
      <h1 className='m-16 text-5xl font-eudoxusbold '>Good morning, {auth.currentUser != undefined || null ? auth.currentUser.displayName : "guest"}</h1>
      <div className='mx-6 flex gap-10 justify-center'>
        <div className='w-1/2 h-3/4 bg-white rounded-xl'>
          <div className='justify-center text-center p-5'>
            <h1 className='font-eudoxus text-xl'>News Around MESA</h1>
          </div>
        </div>
        <div className='w-1/2 h-1/2 bg-white font-semibold rounded-xl'>
          <div className='justify-center text-center p-5'>
            <h1 className='font-eudoxus text-xl'>MESA News</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
