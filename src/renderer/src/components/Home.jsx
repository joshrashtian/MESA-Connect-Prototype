/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { auth } from '../../../../firebase'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { greetings } from './functions'
import { onAuthStateChanged } from 'firebase/auth'
import { motion } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import EventPanel from './Events/Event'

export const Home = () => {
  const [user, setUser] = useState({realname: null})
  const [greeting, setGreeting] = useState()
  const [loading, setLoading] = useState(true)

  const currentDate = new Date(Date.now())

  const currentHour = () => {
    let a = (currentDate.getHours())

    if(a < 4 || a >= 18) return greetings[0]
    if(a >= 4 && a < 12 ) return greetings[1]
    else return greetings[2]
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {console.log('Signed In As: ' + user.displayName); getUser(auth.currentUser.uid)}
      else {console.log('No user signed in.'); setLoading(false)}
    })

    const getUser = async (e) => {
      try {
        const userRef = doc(db, 'users', e)
        const got = await getDoc(userRef)
        console.log(got.data())
        setUser(got.data())
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    
    
    setGreeting(currentHour())
    
  }, [])

  if(loading) return <LoadingScreen />

  return (
    <motion.div className=' justify-evenly items-center h-screen no-scrollbar overflow-y-scroll' initial={{opacity: '0%'}} animate={{opacity: '100%'}} >
      <motion.h1 transition={{delay: 0.4}} initial={{x: -20, opacity: '0%'}} animate={{x: 0, opacity: '100%'}}  className='ml-16 mt-16 mb-8 text-5xl font-eudoxusbold '>{greeting}, {user.realname != null ? user.realname : "guest"}</motion.h1>
      <section className='mx-6 flex gap-10 justify-center'>
        <div className='w-1/2 h-3/4 bg-white rounded-xl'>
          <div className='justify-center text-center p-5'>
            <h1 className='font-eudoxus text-xl'>News Around MESA</h1>
          </div>
        </div>
        <div className='w-1/2 h-1/2 bg-white rounded-xl'>
          <div className='justify-center text-center p-5'>
            <h1 className='font-eudoxus text-xl'>News Around MESA</h1>
          </div>
        </div>
      </section>
      <h1 className='ml-16 mt-16 mb-8 text-3xl font-eudoxusbold'>Current Events You May Be Interested In</h1>
      <section className='mx-10'>
        <EventPanel />
      </section>
    </motion.div>
  )
}
