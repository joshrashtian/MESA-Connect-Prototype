import { collection } from 'firebase/firestore'
import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { db } from '../../../../firebase'

const Social = () => {
  return (
    <div className=''>
     <Outlet />
    </div>
  )
}

export default Social