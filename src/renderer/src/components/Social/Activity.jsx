import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../firebase'

const Activity = () => {
  const [posts, setPosts] = useState([{}])

  useEffect(() => {
    const getFeed = async () => {
      try {
        const postsRef = collection(db, 'posts')
        const fetchData = await getDocs(postsRef)
        const postData = fetchData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setPosts(postData)
      } catch (e) {
        alert(e)
      }
    }
    getFeed()
    console.log(posts)
  }, [])

  return (
    <div className="h-screen">
      <h1 className="m-16 mb-4 font-eudoxusbold text-6xl">Activity</h1>
      <div className="flex flex-col m-16">
        <h1 className="font-eudoxusbold mb-2 text-slate-600 text-3xl">Recent Posts</h1>
        {posts.map((post) => (
          <div className="w-[50%] rounded-lg hover:scale-105 hover:shadow-lg cursor-default bg-white duration-200" key={post.id}>
            <div className='m-3'>
            <h1 className=' font-eudoxusbold text-2xl'>{post.header}</h1>
            <div className='flex flex-col'>
            {post.contents !== undefined
              ? post.contents.map((content, index) => (
                  <div key={index}>
                    {content.text !== undefined ? <h1>{content.text}</h1> : null}
                  </div>
                ))
              : null}
              </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activity
