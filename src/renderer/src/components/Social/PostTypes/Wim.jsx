import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../firebase'
import { Link } from 'react-router-dom'

const Wim = ({ wim }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const userRef = doc(db, 'users', wim.userID)
        const got = await getDoc(userRef)
        setUser(got.data())
      } catch (e) {
        console.log(e)
      }
    }
    getUser()
  }, [])

  return (
    <div
      className="w-[50%] py-0.5 mb-3 rounded-lg hover:scale-105 hover:shadow-lg cursor-default bg-slate-300 duration-200"
      key={wim.id}
    >
      <div className="m-3">
        <header className="flex justify-between items-center">
          <h1 className=" font-eudoxusbold text-2xl">{wim.header}</h1>
          <Link to={`/social/${wim.userID}`}>
            <div className="flex items-center px-1 gap-2 cursor-pointer hover:shadow-md rounded-md hover:scale-105 duration-200">
              <h1 className={`font-eudoxusbold `}>
                {user.realname !== undefined ? user.realname : null}
              </h1>
              <img src={user.photoURL} className="w-8 h-8" />
            </div>
          </Link>
        </header>
        <div className="flex flex-col">
          {wim.contents !== undefined
            ? wim.contents.map((content, index) => (
                <div key={index}>{content.text !== undefined ? <h1>{content.text}</h1> : null}</div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default Wim
