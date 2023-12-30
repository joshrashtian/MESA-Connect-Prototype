import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../firebase'
import { Link } from 'react-router-dom'

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
      className="w-[100%] py-0.5 mb-3 rounded-2xl hover:scale-105 hover:shadow-lg cursor-default bg-gradient-to-tr from-slate-100 to-slate-200 duration-200"
      key={wim.id}
    >
      <div className="m-3">
        <header className="flex justify-between items-center">
          <Link to={`/social/${wim.userID}`}>
            <div className="flex justify-evenly items-center cursor-pointer rounded-md duration-200">
              <div className="flex items-center gap-2 hover:shadow-md hover:scale-105 duration-200">
                <img src={user.photoURL} className="w-8 h-8 rounded-full" />
                <h1 className={`font-eudoxusbold `}>
                  {user.realname !== undefined ? user.realname : null}
                </h1>
              </div>
            </div>
          </Link>
          <div className='flex flex-col gap-1' onClick={() => {menu ? setMenu(false) : setMenu(true)}}>
            <div className="h-1 w-1 bg-slate-800" />
            <div className="h-1 w-1 bg-slate-800" />
            <div className="h-1 w-1 bg-slate-800" />

            { menu ? 
            <div className='absolute mt-8 ml-[-50px] w-24 h-auto py-2 flex justify-center items-center bg-white rounded-lg'>
              <h1>Delete</h1>
            </div>
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
