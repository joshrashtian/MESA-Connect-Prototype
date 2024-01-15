import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../firebase'
import { Link } from 'react-router-dom'
import OptionsButton from './PostTypes/OptionsButton'

const Post = ({ post, current, type }) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const userRef = doc(db, 'users', post.userID)
        const got = await getDoc(userRef)
        setUser(got.data())
        if(user) setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    getUser()
  }, [])

  if (loading) return

  return (
    <div
      className={`${!type ? 'w-[100%]' : 'w-[100%]'} py-0.5 mb-3 rounded-xl hover:scale-105 hover:shadow-lg cursor-default bg-white duration-200`}
      key={post.id}
      onContextMenu={e => {e.preventDefault() (<OptionsButton />)}}
    >
      <div className="m-3">
        <header className="flex justify-between items-center">
          <Link to={`/social/posts/${post.id}`}>
          <h1 className=" font-eudoxusbold text-2xl">{post.header}</h1>
          </Link>
          <Link to={`/social/${post.userID}`}>
            <div className="flex items-center px-1 gap-2 cursor-pointer hover:shadow-md rounded-md hover:scale-105 duration-200">
              <h1 className={`font-eudoxusbold `}>
                {user.realname !== undefined ? user.realname : null}
              </h1>
              <img src={user.photoURL} className="w-8 h-8" />
            </div>
          </Link>
        </header>
        <div className="flex flex-col">
          {post.contents !== undefined
            ? post.contents.map((content, index) => (
                <div key={index}>{content.text !== undefined ? <h1>{content.text}</h1> : null}</div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default Post
