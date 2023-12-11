import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../../../firebase'

const Navigation = () => {

  console.log(auth?.currentUser)

  return (
    <div className='fixed gap-5 top-0 left-0 w-[6vw] max-w-[100px] justify-center items-center h-screen bg-gradient-to-b from-[#c76c12] via-[#8d4111] to-[#a33a20] '>
        <div className=' mt-[50px] gap-5'>
        <Link to={"/signIn"}>
          { 
            <div className=' relative bg-white w-[5vw] h-[5vw] max-w-[84px] max-h-[84px] hover:scale-110 hover:shadow-2xl mx-auto mt-5 rounded-full shadow-xl duration-300 transition-all' /> }
        </Link>
        <Link to={"/"}>
            <div className=' relative bg-white w-[5vw] h-[5vw] max-w-[84px] max-h-[84px] hover:scale-110 hover:shadow-2xl mx-auto mt-5 rounded-full shadow-xl duration-300 transition-all' />
        </Link>
        </div>
    </div>
  )
}

export default Navigation