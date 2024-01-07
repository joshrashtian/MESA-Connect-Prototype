import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, googleProvider, userdb } from '../../../../firebase'
import { collection, setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { refactorName } from './functions'
import { motion } from 'framer-motion'

const SignUp = () => {
    const navigation = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [realname, setRealName] = useState('')
    const [errorMsg, setErrorMessage] = useState()

    const signUp = async () => {
        if(email === '' || password === '' || realname === '') {setErrorMessage('One or more fields are empty.'); return}

        let newName = refactorName(name) 

        if (newName === null) {setErrorMessage('Error with username.'); return}
        try {
            await createUserWithEmailAndPassword(auth, email, password).then(cred => {
              return setDoc(doc(db, 'users', cred.user.uid), {
                bio: '',
                email: cred.user.email,
                realname: realname,
                major: 'TBA',
                joined: serverTimestamp(),
              })
            })
        } catch (e) {
            console.log(e)
        } finally {
            navigation("/signIn")
        }
    }

    const googleSignUp = async () => {
        try {
          await signInWithPopup(auth, googleProvider)
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <div>
    <div className="h-screen flex items-center justify-center ">
      <div className="bg-[#EEEEEE] sm:w-4/5 sm:h-4/5 lg:w-3/5 lg:h-3/5 rounded-2xl shadow-xl ">
        <div className="m-10">
          <h1 className="font-bold text-6xl font-eudoxusbold">Create Account</h1>
          <div className="flex flex-col mt-6 mx-20">
            {errorMsg != undefined ? (
                <motion.div className="p-5 bg-red-300 shadow-sm rounded-lg flex flex-row-reverse justify-between">
                  <div className='font-eudoxus text-white cursor-pointer' onClick={() => {setErrorMessage(undefined)}} >x</div>
                  <h1 className='font-eudoxus text-white'>Error: {errorMsg}</h1>
                </motion.div>
              ) : null}
            <input
              type="text"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className=" px-10 py-2 mt-2 rounded-lg shadow-sm bg-white font-eudoxus"
            />
            <input
              type="text"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className=" px-10 py-2 mt-1 rounded-lg shadow-sm bg-white font-eudoxus"
            />
            <input
              type="text"
              placeholder="first / last Name"
              onChange={(e) => {
                setRealName(e.target.value)
              }}
              className=" px-10 py-2 mt-1 rounded-lg shadow-sm bg-white font-eudoxus"
            />
          </div>
          <div className='flex justify-center mt-10 gap-7'>
            <button onClick={googleSignUp} className='w-2/5 h-11 bg-blue-800 text-white font-semibold rounded-xl hover:bg-blue-600 duration-200 hover:scale-105'>Google Sign In</button>
            <button onClick={signUp} className='w-2/5 h-11 bg-stone-800 text-white font-semibold rounded-xl hover:bg-slate-800 duration-200 hover:scale-105'>Create Account</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignUp