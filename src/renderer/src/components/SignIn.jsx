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

const SignIn = () => {
  const [page, setPage] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState(null)
  const [errorMsg, setErrorMessage] = useState(undefined)
  const [data, setData] = useState({})

  const [currentpic, setCurrentPic] = useState(auth.currentUser.photoURL)
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
      console.log(user)
      if (!user) {
        setPage(0)
      } else if (user.displayName == null) {
        setPage(2)
      } else {
        setPage(1)
      }
    })
  }, [])

  const updateprofile = async () => {
    if (name === null || name === '') {
      setErrorMessage('Invalid Username.')
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

        console.log(auth.currentUser.displayName)
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
          console.log(got.data())
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
                <div className="p-10 bg-red-300">
                  <h1>Error: {errorMsg}</h1>
                </div>
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
          <div className="bg-[#EEEEEE] w-4/5 h-3/5 rounded-2xl shadow-xl ">
            <h1 className="font-bold text-6xl m-5 font-eudoxusbold">Account Details</h1>
            <div className="flex m-5 justify-between items-center bg-stone-200 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  onChange={changeImage}
                  ref={picRef}
                  style={{ display: 'none' }}
                />
                <img
                  src={currentpic}
                  className="rounded-2xl h-16 w-16 hover:scale-110 duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
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
            <div className="justify-center items-center sm:flex-col  md:flex-row flex mx-5 gap-2 text-center">
              <Link
                to={'/Onboarding'}
                className=" bg-amber-900 font-eudoxus hover:bg-amber-700 text-white p-2 sm:w-5/6 lg:px-20 2xl:px-30 hover:scale-110 rounded-2xl hover:rounded-xl duration-500"
              >
                Edit Profile Details
              </Link>
              <Link
                to={`/social/${auth.currentUser.uid}`}
                className=" bg-amber-900 font-eudoxus hover:bg-amber-700 text-white p-2 sm:w-5/6 lg:px-20 2xl:px-30 hover:scale-110 rounded-2xl hover:rounded-xl duration-500"
              >
                View Profile
              </Link>
              <button
                onClick={signout}
                className=" bg-amber-900 font-eudoxus hover:bg-amber-700 text-white p-2 sm:w-5/6 lg:px-20 hover:scale-110 rounded-2xl hover:rounded-xl duration-500"
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
        <div className="h-screen flex items-center justify-center ">
          <div className="bg-[#EEEEEE] w-3/5 h-3/5 rounded-2xl shadow-xl ">
            <div className="m-10">
              <h1 className="font-bold text-6xl font-eudoxusbold">Let's finish up a few things.</h1>
              <h1>{auth.currentUser.email}</h1>
              <input
                type="text"
                placeholder="display name"
                onChange={(e) => {
                  setName(e.target.value)
                }}
                className=" px-10 py-2 mt-1 rounded-lg shadow-sm bg-white"
              />
              <div className="flex">
                <button onClick={updateprofile}>Finalize Account</button>
                <button onClick={signout}>Sign Out</button>
              </div>
              {errorMsg != undefined ? (
                <div className="p-10 bg-red-300">
                  <h1>Error: {errorMsg}</h1>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn
