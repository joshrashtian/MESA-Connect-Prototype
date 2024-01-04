import React, { useEffect, useState } from 'react'
import { useScroll, motion } from 'framer-motion'
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../../../../firebase'
import PostTypeArray from './PostCreator/Types'
import NewWim from './PostCreator/NewWim'
import Sumbitting from './PostCreator/Sumbitting'
import EventCreator from './PostCreator/EventCreator'

const PostBuilder = () => {
  const [text, setText] = useState()
  const [header, setHeader] = useState()
  const [role, setRole] = useState()
  const [active, setActive] = useState('Post')
  const [rendering, setRendering] = useState(false)

  const nav = useNavigate()

  const { scrollYprogress } = useScroll()

  useEffect(() => {
    const getUser = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid)
        const got = await getDoc(userRef)
        setRole(got.data())
      } catch (e) {
        alert(e)
      }
    }
    getUser()
  },  [])

  const submitPost = async () => {
    setRendering(true)
    if ( active === 'Post') {
    try {
      const postRef = await addDoc(collection(db, 'posts'), {
        contents: [{text: text}],
        header: header,
        userID: auth.currentUser.uid,
        postTime: serverTimestamp()
      })
    } catch (e) {
      console.error(e)
    }
  }
  if ( active === 'Wim') {
    try {
      const postRef = await addDoc(collection(db, 'posts'), {
        text: text,
        userID: auth.currentUser.uid,
        type: 'wim',
        postTime: serverTimestamp()
      })
    } catch (e) {
      console.error(e)
    }
  }
    await nav("/social")
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-4/5 h-4/5 bg-[#EEE] rounded-2xl shadow-2xl p-12 pb-36">
        <h1 className="font-eudoxusbold text-6xl mb-2">Post Lab</h1>
        <PostTypeArray category={(e) => {setActive(e)}} />
        { active === 'Post' &&
          <div className="flex flex-row-reverse h-[100%] w-[100%]">
          <div className="overflow-y-scroll no-scrollbar  w-[98%] h-[95%] p-6 px-28 align-top">
            <input
              onChange={e => setHeader(e.target.value)}
              maxLength="65"
              className="w-full cursor-pointer focus:cursor-text font-eudoxusbold text-4xl rounded-xl p-3 mb-5 focus:outline-none bg-gradient-to-r from-amber-600 via-red-500 to-blue-400 inline-block bg-clip-text text-transparent hover:text-current focus:text-current duration-300"
              placeholder="Header..."
            />
            <textarea
              onChange={(e) => setText(e.target.value)}
              className="h-[50%] font-eudoxus focus:outline-none w-full bg-gradient-to-tr from-white to-slate-100 rounded-xl text-left p-3"
              placeholder="Text..."
            />
            {text && text.length != 0 ? (
              <motion.div
                className="bg-[#ddd] flex gap-10 p-3 justify-center"
                initial={{ opacity: '0%', y: -20 }}
                animate={{ opacity: '100%', y: 0 }}
              >
                <h1 className="font-jet text-slate-600">Character Count: {text.length}</h1>
                <h1 className="font-jet text-slate-600">Word Count: {text.split(' ').length}</h1>
              </motion.div>
            ) : null}
          </div>
        </div>
        }
        { active === 'Wim' && <NewWim exit={() => {nav("/social")}} updateText={e => {setText(e)}} />}
        { active === 'Event' && <EventCreator />}
        { !text || (active != 'Wim' && !header) ? null : text.length != 0 ? (
        <motion.section initial={{y: 20, opacity: '0%'}} animate={{y: 0, opacity: '100%'}} className='h-16 bg-gradient-to-tr from-orange-600 to-orange-400 flex justify-center gap-5 items-center rounded-full shadow-xl absolute bottom-[15%] left-[25%] w-[53%] right-[75%]'>
          { !rendering ?
          <>
          <button onClick={submitPost} className='p-2 bg-white hover:bg-orange-500 px-7 rounded-full cursor-pointer hover:scale-110 duration-300 flex justify-center items-center'>
            <h1 className=' font-eudoxusbold text-black'>Submit</h1>
          </button>
          <ul className='p-2 bg-white px-7 text-black hover:bg-red-500 hover:text-white rounded-full cursor-pointer hover:scale-110 duration-300 flex justify-center items-center'>
            <h1 className=' font-eudoxusbold text-black'>Discard Changes</h1>
          </ul>
          </>
          : <Sumbitting />}
        </motion.section>
        ) : null}
        
      </div>
    </div>
  )
}

export default PostBuilder
