import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../firebase'
import Post from './Post'
import { motion } from 'framer-motion'
import LoadingScreen from '../LoadingScreen'

const Activity = () => {
  const [posts, setPosts] = useState([{}])
  const [loading, setLoading] = useState(true)

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
        setLoading(false)
      } catch (e) {
        alert(e)
      }
    }
    getFeed()
    console.log(posts)
  }, [])

  if(loading) return <LoadingScreen />;

  return (
    <motion.div className="h-screen" initial={{opacity: '0%'}} animate={{opacity: '100%'}}>
      <motion.h1 className="m-16 mb-4 font-eudoxusbold text-6xl" initial={{y: 20}}>Activity</motion.h1>
      <div className="flex flex-col m-16">
        <h1 className="font-eudoxusbold mb-2 text-slate-600 text-3xl">Recent Posts</h1>
        {posts.map((e) => <Post post={e} current={e.userID} />)}
      </div>
    </motion.div>
  )
}

export default Activity
