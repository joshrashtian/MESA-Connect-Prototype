import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../firebase'
import { Link } from 'react-router-dom'

const Post = ({ post, current }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const userRef = doc(db, 'users', current)
        const got = await getDoc(userRef)
        console.log(got.data())
        setUser(got.data())
      } catch (e) {
        console.log(e)
      }
    }
    console.log('Post Data', post, 'Current', current)
    getUser()
  }, [])

  return (
    <div
      className="w-[50%] py-0.5 mb-3 rounded-lg hover:scale-105 hover:shadow-lg cursor-default bg-white duration-200"
      key={post.id}
    >
      <div className="m-3">
        <header className='flex justify-between items-center'>
        <h1 className=" font-eudoxusbold text-2xl">{post.header}</h1>
        <Link to={`/social/${current}`}>
          <div className='flex items-center p-2 gap-2 cursor-pointer hover:shadow-md rounded-md scale-105 duration-200'>
            <h1 className={`font-eudoxusbold `}>{user.realname !== undefined ? user.realname : null}</h1>
            <img src={user.photoURL} className='w-8 h-8' />
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
