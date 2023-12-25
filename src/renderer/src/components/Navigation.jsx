import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../../../firebase'
import { SidebarIcons } from '../assets/icons/sidebar/sidebar.js'
import UserIcon from '../assets/icons/UserIcon.png'

const Navigation = () => {

  console.log(SidebarIcons)

  return (
    <div className="fixed gap-5 top-0 left-0 w-[10vw] max-w-[90px] max-h-screen mt-[40px] justify-center items-center h-screen bg-gradient-to-b from-[#c76c12] via-[#8d4111] to-[#a33a20] ">
      <div className=" mt-[50px] gap-5">
        {SidebarIcons.map((a, index) => (
          <div key={index}>
          <Link to={a.link}>
            {
              <div className=" relative bg-white w-[5vw] h-[5vw] max-w-[75px] max-h-[75px] hover:scale-110 hover:shadow-2xl rounded-3xl hover:rounded-2xl mx-auto mt-5  shadow-xl duration-300 transition-all">
                <div className='justify-center items-center p-2'>
                {a.icon !== null ? 
                <img className='' src={a.icon}/>
                  : null}
                </div>
              </div>
            }
          </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Navigation
