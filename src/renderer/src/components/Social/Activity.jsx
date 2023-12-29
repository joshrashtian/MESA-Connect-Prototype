import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../firebase'
import Post from './Post'
import { motion } from 'framer-motion'
import LoadingScreen from '../LoadingScreen'
import Wim from './PostTypes/Wim'
import { forums } from '../functions'
import QuickWim from './QuickWim'

const Activity = () => {
  const [posts, setPosts] = useState([{}])
  const [activePosts, setActivePosts] = useState([{}])
  const [menu, setMenu] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState()

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


  if (loading) return <LoadingScreen />

  return (
    <motion.div className="h-screen" initial={{ opacity: '0%' }} animate={{ opacity: '100%' }}>
      <motion.h1
        className="m-16 mb-4 font-eudoxusbold text-6xl bg-gradient-to-tr "
        initial={{ x: -20, y: 20, opacity: '0%' }}
        animate={{y: 20, x: 0, opacity: '100%'}}
      >
        Activity
      </motion.h1>
      <div className="flex flex-col m-16">
        <h1 className="font-eudoxusbold mb-2 text-slate-600 text-3xl">Recent Posts</h1>
        <div className='flex justify-between'>
        <div className="my-1 w-[70%]">
          <section className="flex w-[100%] justify-evenly mb-4 bg-[#BBB] p-3 rounded-xl">
            { menu == 0 ?
            <>
            <button className=" bg-gradient-to-r from-amber-600 to-amber-500 hover:scale-105 duration-300  w-[45%] rounded-lg shadow-xl py-2">
              <h1 className='text-white font-eudoxus'>Create Post</h1>
            </button>
            <button className="text-white font-eudoxus bg-gradient-to-r from-blue-500 to-blue-400 hover:scale-105 duration-300  w-[45%] rounded-lg shadow-xl py-2" onClick={() => {setMenu(1)}}>
              <h1 className='text-white font-eudoxus'>Create A Wim</h1>
            </button>
            </>
            : <QuickWim />}
          </section>
          {posts.map((e, index) => {
            if (!e.type)
              return (
                <motion.div
                  initial={{ x: -20, opacity: '0%' }}
                  animate={{ x: 0, opacity: '100%' }}
                  transition={{ delay: 0.1 + 0.1 * index }}
                >
                  <Post post={e} current={e.userID} />
                </motion.div>
              )
            if (e.type == 'wim') return <Wim />
          })}
        </div>
        <section className='w-3/12 bg-slate-500 rounded-xl shadow-lg'>
          <div className='gap-3 flex flex-col h-[100%] overflow-y-scroll no-scrollbar'>
          <input className='rounded-2xl mt-4 m-3 p-2 px-4 font-jet' placeholder='Search' />
          {
            forums.map(c => (
              <div className='w-[100%] py-3 cursor-pointer hover:scale-105 justify-center flex bg-slate-500 rounded-lg hover:rounded-lg hover:bg-slate-700 duration-200'>
                <h1 className='text-white font-eudoxusbold'>{c.toUpperCase()}</h1>
              </div>
            ))
          }
          </div>
        </section>
        </div>
      </div>
    </motion.div>
  )
}

export default Activity
