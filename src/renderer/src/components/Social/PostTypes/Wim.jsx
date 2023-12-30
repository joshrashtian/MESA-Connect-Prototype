import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../../../../firebase'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import OptionsButton from './OptionsButton'

const Wim = ({ wim }) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const userRef = doc(db, 'users', wim.userID)
        const got = await getDoc(userRef)
        setUser(got.data())
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    getUser()
  }, [])

  if (loading) return

  return (
    <div
      className="w-[100%] py-0.5 mb-3 rounded-2xl hover:scale-[1.02] hover:shadow-lg cursor-default bg-gradient-to-tr from-slate-100 to-slate-200 duration-700"
      key={wim.id}
    >
      <div className="m-1 ml-3">
        <header className="flex justify-between items-center">
          <Link to={`/social/${wim.userID}`}>
            <div className="flex justify-evenly items-center cursor-pointer rounded-md duration-200">
              <div className="flex items-center gap-2 hover:shadow-md hover:scale-105 duration-200">
              
                <h1 className={`font-eudoxusbold text-lg `}>
                  {user.realname !== undefined ? user.realname : null}
                </h1>
              </div>
            </div>
          </Link>
          <div className='flex duration-150 cursor-pointer' onClick={() => {!menu ? setMenu(true) : null}}>
            <div className='flex p-2 flex-col gap-1 hover:scale-110' onClick={() => {menu ? setMenu(false) : setMenu(true)}}>
            <div className="h-1 w-1 bg-slate-800" />
            <div className="h-1 w-1 bg-slate-800" />
            <div className="h-1 w-1 bg-slate-800" />
            </div>

            { menu ? 
            <OptionsButton post={wim.id} isOwner={auth.currentUser?.uid === wim.userID} />
            : null }
          </div>
        </header>
        <div className="flex flex-col">
          <h1 className="font-eudoxus text-slate-700 my-1">{wim.text}</h1>
        </div>
      </div>
    </div>
  )
}

export default Wim
