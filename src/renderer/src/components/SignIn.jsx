import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { auth } from '../../../../firebase'

const SignIn = () => {
  const [page, setPage] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState(null)
  

  const signIn = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password,)
      
    } catch (e) {
      console.log(e)
    }
  }

  const signout = async () => {
    try {
      await signOut(auth)
    } catch (e) {
      console.log(e)
    }
  }

  onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (!user){
      setPage(0)
    } else if (user.displayName == null) {
      setPage(2)
    } else {
      setPage(1)
    }
  })

  const updateprofile = async () => {
    try {
      await updateProfile(auth.currentUser, {displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      setPage(1)
    }).catch((error) => {
    });
    
      console.log(auth.currentUser.displayName)
    } catch (e) {
      console.log(e)
    }
  }
  

  if(page == 0){
  return (
    <div>
      <div className="h-screen flex items-center justify-center ">
        <div className="bg-[#EEEEEE] w-3/5 h-3/5 rounded-2xl shadow-xl ">
          <div className="m-10">
            <h1 className="font-bold text-6xl">Let's get you Signed In.</h1>
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
            <Link to={"/signup"}>
              <div>
                <h1>Don't Have An Account?</h1>
              </div>
            </Link>
            <button onClick={signIn}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  )
  } else if (page == 1) {
    return (
      <div>
      <div className="h-screen flex items-center justify-center ">
        <div className="bg-[#EEEEEE] w-3/5 h-3/5 rounded-2xl shadow-xl ">
        <h1>{auth.currentUser.email}</h1>
        <h1>{auth.currentUser.displayName}</h1>
        <button onClick={signout}>Sign Out</button>
        </div>
      </div>
    </div>
    )
  } else if (page == 2){
    return (
    <div>
      <div className="h-screen flex items-center justify-center ">
        <div className="bg-[#EEEEEE] w-3/5 h-3/5 rounded-2xl shadow-xl ">
        <div className='m-10'>
        <h1 className='font-bold text-6xl'>Let's finish up a few things.</h1>
        <h1>{auth.currentUser.email}</h1>
        <input
                type="text"
                placeholder="display name"
                onChange={(e) => {
                  setName(e.target.value)
                }}
                className=" px-10 py-2 mt-1 rounded-lg shadow-sm bg-white"
              />
        <button onClick={updateprofile}>Finalize Account</button>
        <button onClick={signout}>Sign Out</button>
        </div>
        </div>
      </div>
    </div>
    )
  }
}

export default SignIn
