/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { auth } from '../../../../firebase'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { greetings } from './functions'

export const Home = () => {
  const [user, setUser] = useState({})
  const [greeting, setGreeting] = useState()

  const currentDate = new Date(Date.now())

  const currentHour = () => {
    let a = (currentDate.getHours())

    if(a < 4 || a >= 18) return greetings[0]
    if(a >= 4 && a < 12 ) return greetings[1]
    else return greetings[2]
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid)
        const got = await getDoc(userRef)
        console.log(got.data())
        setUser(got.data())
      } catch (e) {
        console.log(e)
      }
    }
    getUser()
    setGreeting(currentHour())
  }, [])

  return (
    <div className=' justify-evenly items-center h-screen'>
      <h1 className='ml-16 mt-16 mb-8 text-5xl font-eudoxusbold '>{greeting}, {user.realname !== null || undefined ? user.realname : auth.currentUser != undefined || null ? auth.currentUser.displayName : "guest"}</h1>
      <section className='mx-6 flex gap-10 justify-center'>
        <div className='w-1/2 h-3/4 bg-white rounded-xl'>
          <div className='justify-center text-center p-5'>
            <h1 className='font-eudoxus text-xl'>News Around MESA</h1>
          </div>
        </div>
        <div className='w-1/2 h-1/2 bg-white font-semibold rounded-xl'>
          <div className='justify-center text-center p-5'>
            <h1 className='font-eudoxus text-xl'>MESA News</h1>
          </div>
        </div>
      </section>
      <h1 className='ml-16 mt-16 mb-8 text-3xl font-eudoxusbold'>Current Events You May Be Interested In</h1>
      <section>
      </section>
    </div>
  )
}
