import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, googleProvider } from '../../../../firebase'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password,)
        } catch (e) {
            console.log(e)
        }
    }

    const googleSignUp = async () => {
        try {
          await signInWithPopup(auth, googleProvider)
        } catch (e) {
            console.log(e)
        }
    }

    const changePhoto = () => {

    }

  return (
    <div>
    <div className="h-screen flex items-center justify-center ">
      <div className="bg-[#EEEEEE] w-3/5 h-3/5 rounded-2xl shadow-xl ">
        <div className="m-10">
          <h1 className="font-bold text-6xl">Create Account</h1>
          <div className="flex flex-col mt-6 mx-20">
            <input
              type="text"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className=" px-10 py-2 mt-2 rounded-lg shadow-sm bg-white"
            />
            <input
              type="text"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className=" px-10 py-2 mt-1 rounded-lg shadow-sm bg-white"
            />
          </div>
          
          <button onClick={googleSignUp}>Google Sign In</button>

          <button onClick={signUp}>Create Account</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignUp