
import React from 'react'
import { Outlet } from 'react-router-dom'

const EventOutlet = () => {
  return (
    <div className='h-screen'>
     <Outlet />
    </div>
  )
}

export default EventOutlet