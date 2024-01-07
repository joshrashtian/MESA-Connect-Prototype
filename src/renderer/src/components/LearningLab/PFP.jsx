import React, { useRef, useState } from 'react'
import NextButton from './NextButton'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db, storage } from '../../../../../firebase'

const PFP = ({ current, nextSlide }) => {
  const [pfp, setPfp] = useState()

  const picRef = useRef()

  const changeImage = async (e) => {
    if (!e.target.files[0]) return
    let pic = e.target.files[0]
    let refName = `profpictures/${auth.currentUser.uid}`
    const storRef = ref(storage, refName)
    try {
      await uploadBytes(storRef, pic).then(() => {
        getDownloadURL(storRef)
          .then((img) => {
            setPfp(img)
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

  if (current === 0)
    return (
      <>
        <h1 className=" font-eudoxusbold text-3xl">Profile Picture</h1>
        <p className="font-eudoxus">
          Having a profile picture to express yourself is a critical part of any Social Sharing
          Platform!
        </p>
        <NextButton
          style={`mt-5`}
          textStyle={'text-xl'}
          onPress={() => {
            nextSlide()
          }}
        />
      </>
    )

  if (current === 1)
    return (
      <>
        <h1 className=" font-eudoxusbold text-3xl">Let's Import a Profile Picture!</h1>
        <input type="file" onChange={changeImage} ref={picRef} style={{ display: 'none' }} />
        <section className="flex flex-col justify-between">
          <div className="justify-center flex w-full ">
            <img src={pfp} className="w-1/5 h-1/5" />
          </div>
          <div className="flex justify-center items-center gap-3">
            <button
              className=" text-xl font-eudoxusbold text-white hover:scale-105 duration-500 p-2 cursor-pointer bg-orange-500 hover:bg-orange-600 rounded-3xl flex justify-center items-center w-2/5"
              onClick={() => {
                picRef.current.click()
              }}
            >
              Choose Image From Local Files
            </button>
            <NextButton
              condition={!pfp ? false : true}
              text={'Exit'}
              conditionStyle={'bg-gray-300'}
              textStyle={'text-xl'}
              onPress={() => {
                nextSlide()
              }}
            />
          </div>
        </section>
      </>
    )
}

export default PFP
