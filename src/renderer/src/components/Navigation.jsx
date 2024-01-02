import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../../../firebase'
import { SidebarIcons } from '../assets/icons/sidebar/sidebar.js'
import UserIcon from '../assets/icons/UserIcon.png'
import { onAuthStateChanged } from 'firebase/auth'

const Navigation = () => {
  const [prof, setProf] = useState()
  
  const fetchPic = () => {
    if(!auth){setProf(UserIcon); return} 
    if(!auth.currentUser?.photoURL) {setProf(UserIcon); return}
    setProf(auth.currentUser.photoURL)
  }

  useEffect(() => {
    fetchPic()
  }, [])
  console.log(SidebarIcons)

  return (
    <div className="fixed gap-5 top-0 left-0 w-[70px] mt-[40px] max-h-screen flex flex-col justify-between items-center h-screen bg-gradient-to-b from-[#c76c12] via-[#8d4111] to-[#a33a20] ">
      <div className=" mt-[50px] gap-5">
        <Link to="/signIn">
          <div className="flex justify-center items-center bg-white w-[55px] h-[55px] hover:scale-110 hover:shadow-2xl rounded-3xl hover:rounded-2xl mx-auto mt-5  shadow-xl duration-300 transition-all">
            <div className="flex justify-center items-center p-2">
              <img className="w-[90%] h-[90%] rounded-full" src={prof} />
            </div>
          </div>
        </Link>
        {SidebarIcons.map((a, index) => (
          <div key={index}>
            <Link to={a.link}>
              {
                <div className=" relative bg-white w-[50px] h-[50px] hover:scale-110 hover:shadow-2xl rounded-3xl hover:rounded-2xl mx-auto mt-5  shadow-xl duration-300 transition-all">
                  <div className="flex justify-center items-center p-2">
                    {a.icon !== null ? <img className="" src={a.icon} /> : null}
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
