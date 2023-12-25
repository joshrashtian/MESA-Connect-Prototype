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
      <h1 className="m-16 font-eudoxusbold text-6xl">Activity</h1>
      <div className="flex flex-col flex-wrap">
        {posts.map((post) => (
          <div className="p-12 mr-[50vh] bg-white" key={post.id}>
            <h1>{post.header}</h1>
            {post.contents !== undefined
              ? post.contents.map((content, index) => (
                  <div key={index}>
                    {content.text !== undefined ? <h1>{content.text}</h1> : null}
                  </div>
                ))
              : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activity
