import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { Link } from 'react-router-dom'
import { auth, storage, userdb } from '../../../../firebase'
import { refactorName } from './functions'
import { db } from '../../../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'

const SignIn = () => {
  const [page, setPage] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState(null)
  const [errorMsg, setErrorMessage] = useState(undefined)
  const [data, setData] = useState({})

  const [currentpic, setCurrentPic] = useState()
  const picRef = useRef()

  const signIn = async () => {
    if (email === '' || password === '') {
      setErrorMessage('Invalid Email/Password.')
      return
    }
    try {
      signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      setErrorMessage(e)
    } finally {
      if (auth.currentUser === null) {
        setErrorMessage('Incorrect Email / Password.')
      }
    }
  }

  const signout = async () => {
    try {
      await signOut(auth)
    } catch (e) {
      console.log(e)
    }
  }

  const changeImage = async (e) => {
    if (!e.target.files[0]) return
    let pic = e.target.files[0]
    let refName = `profpictures/${auth.currentUser.uid}`
    const storRef = ref(storage, refName)
    try {
      await uploadBytes(storRef, pic).then(() => {
        getDownloadURL(storRef)
          .then((img) => {
            setCurrentPic(img)
            updateProfile(auth.currentUser, {
              displayName: auth.currentUser.displayName,
              photoURL: img
            })
              .then(() => {
                const ref = doc(db, 'users', auth.currentUser.uid)
                setDoc(ref, { photoURL: img }, { merge: true })
              })
              .catch((error) => {
                console.error(error)
              })
          })
          .catch((e) => {
            console.error(e)
          })
      })
    } catch (e) {
      console.error(e)
    }
  }

  const fileUpload = () => {}

  useEffect(() => {
    setErrorMessage(null)

    onAuthStateChanged(auth, (user) => {
      if (!user) { setPage(0) } 
      else if (user.displayName == null) { setPage(2) } 
      else { setPage(1) + setCurrentPic(auth.currentUser.photoURL) }
    })
  }, [])

  const updateprofile = async () => {
    if (name === null || name === '') {
      setErrorMessage('Must provide a username.')
      return
    }

    if (name.length > 15 || name.length < 3) {
      setErrorMessage('Username must be between 3 to 15 characters long.')
      return
    }

    let newName = refactorName(name)

    if (newName != null) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: newName,
          photoURL: 'https://example.com/jane-q-user/profile.jpg'
        })
          .then(() => {
            const ref = doc(db, 'users', auth.currentUser.uid)
            setDoc(ref, { username: newName }, { merge: true })
          })
          .catch((error) => {})
          .finally(() => {
            setPage(1)
          })
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    const getUser = async () => {
      if (auth.currentUser.uid != null) {
        try {
          const ref = await doc(db, 'users', auth.currentUser.uid)
          const got = await getDoc(ref)
          setData(got.data())
        } catch (e) {
          alert(e)
        }
      }
    }
    getUser()
  }, [])

  if (page == 0) {
    return (
      <div>
        <div className="h-screen flex items-center justify-center ">
          <div className="bg-[#EEEEEE] w-4/5 h-3/5 rounded-2xl shadow-xl ">
            <div className="m-10">
              <h1 className="text-6xl font-eudoxusbold">Let's get you signed in.</h1>
              <div className="flex flex-col mt-6 mx-20">
                <input
                  type="text"
                  placeholder="email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  className=" px-10 py-2 mt-2 rounded-lg shadow-sm bg-white font-eudoxus"
                />
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  className=" px-10 py-2 mt-1 rounded-lg shadow-sm bg-white font-eudoxus"
                />
              </div>
              <div className="flex justify-center gap-2 mt-3">
                <Link to={'/signup'}>
                  <div className="p-2 bg-cyan-700 text-white rounded-lg px-5">
                    <h1>Don't Have An Account?</h1>
                  </div>
                </Link>
                <button onClick={signIn} className="p-2 bg-slate-500 text-white rounded-lg px-5">
                  Sign In
                </button>
              </div>
              {errorMsg != undefined ? (
                <motion.div className="p-10 bg-red-300">
                  <h1>Error: {errorMsg}</h1>
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  } else if (page == 1) {
    return (
      <div>
        <div className="h-screen flex items-center justify-center ">
          <div className="bg-[#EEEEEE] w-4/5 h-3/5 rounded-2xl shadow-xl p-10">
            <h1 className="font-bold text-6xl font-eudoxusbold">Account Details</h1>
            <div className="flex my-4 justify-between items-center bg-stone-200 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  onChange={changeImage}
                  ref={picRef}
                  style={{ display: 'none' }}
                />
                <img
                  src={currentpic}
                  className="rounded-full h-16 w-16 hover:scale-110 duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
                  onChange={() => {
                    changeImage
                  }}
                  onClick={() => {
                    picRef.current.click()
                  }}
                />
                <div>
                  <h1 className="font-eudoxusbold">{auth.currentUser.email}</h1>
                  <h1 className="font-eudoxusbold">{auth.currentUser.displayName}</h1>
                </div>
              </div>
              <div className="w-[1px] h-12 bg-stone-400 " />
              <div>
                {data != undefined ? (
                  <>
                    <h1 className="font-eudoxusbold">{data.realname}</h1>
                    <h1 className="font-eudoxusbold text-right">{data.major} Major</h1>
                  </>
                ) : null}
              </div>
            </div>
            {data === undefined ? (
              <div className="bg-red-200 mx-5 p-2 my-10 rounded-lg">Missing Data?</div>
            ) : null}
            <div className="justify-center flex-col flex gap-1 text-center">
              <Link
                to={'/Onboarding'}
                className=" bg-orange-600 font-eudoxus text-lg hover:bg-orange-700 text-white p-3 w-1/3 rounded-full duration-500"
              >
                Edit Profile Details
              </Link>
              <Link
                to={`/social/${auth.currentUser.uid}`}
                className=" bg-orange-600 font-eudoxus text-lg hover:bg-orange-700 text-white p-3 w-1/3 rounded-full duration-500"
              >
                View Profile
              </Link>
              <button
                onClick={signout}
                className=" bg-orange-600 font-eudoxus text-lg hover:bg-orange-700 text-white p-3 w-1/3 rounded-full duration-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (page == 2) {
    return (
      <div>
        <page className="h-screen flex items-center justify-center ">
          <div className="bg-[#EEEEEE] w-3/5 h-3/5 rounded-2xl shadow-xl ">
            <section className="m-10">
              <h1 className="font-bold text-6xl font-eudoxusbold">Let's finish up a few things.</h1>
              <section className='bg-stone-200 p-3 mt-3 rounded-xl duration-200 '>
                <h1 className='font-jet text-stone-500'>Your Email: {auth.currentUser.email}</h1>
                <h1 className='font-jet text-stone-500'>Full Name: {data.realname}</h1>
                {!name ? null : 
                <div className='flex justify-between'>
                <h1 className='font-jet text-stone-500'> Username: {refactorName(name)}</h1>
                <h1 className='font-jet text-slate-400'>{name.length > 15 ? 'Name Too Long!' : name.length < 3 ? 'Name Too Short!' : null}</h1>
                </div>
                }

              </section>
              <input
                type="text"
                placeholder="display name"
                onChange={(e) => {
                  setName(e.target.value)
                }}
                className="w-full px-10 py-2 mt-4 rounded-lg shadow-lg bg-gradient-to-br from-white to-slate-200 hover:shadow-xl duration-500 focus:outline-none text-slate-600"
              />
              <div className="flex justify-center mt-5 gap-5">
                <button className='w-1/2 h-12 rounded-2xl shadow-lg bg-gradient-to-tr from-orange-400 to-amber-300 hover:bg-amber-700 text-lg font-eudoxus text-white hover:scale-105 duration-200 hover:shadow-xl ' onClick={updateprofile}>Finalize Account</button>
                <button className='w-1/2 h-12 rounded-2xl shadow-lg bg-gradient-to-tr from-orange-400 to-amber-300 hover:bg-amber-700 text-lg font-eudoxus text-white hover:scale-105 duration-200 hover:shadow-xl ' onClick={signout}>Sign Out</button>
              </div>
              {errorMsg != undefined ? (
                <motion.div initial={{opacity: '0%', y: -20}} animate={{opacity: '100%', y: 0}} transition={{ type: 'spring', stiffness: 500, damping: 20 }} className="p-5 bg-red-300 flex gap-3 mt-2 items-center rounded-lg shadow-lg">
                  <motion.div className='font-eudoxus text-white cursor-pointer' whileHover={{scale: 1.5}} transition={{type: 'spring', stiffness: 500, damping: 25}} onClick={() => {setErrorMessage(undefined)}} >x</motion.div>
                  <h1 className='text-red-500 p-1.5 rounded-xl bg-white font-eudoxusbold'>ERROR</h1>
                  <h1 className='text-white font-eudoxusbold'>{errorMsg}</h1>
                </motion.div>
              ) : null}
            </section>
          </div>
        </page>
      </div>
    )
  }
}

export default SignIn
