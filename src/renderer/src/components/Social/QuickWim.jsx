import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { auth, db } from '../../../../../firebase'

const QuickWim = ({ exit }) => {
  const [text, setText] = useState()

  const submitPost = async () => {
    if(!text) return
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
    exit()
  }

  return (
    <motion.section
      initial={{ opacity: '0%', scaleX: '0%' }}
      animate={{ opacity: '100%', scaleX: '100%' }}
      className="flex flex-col mx-3"
    >
      <div className='flex justify-between'>
      <h1 className="font-eudoxusbold text-xl mb-2">Type a Quick Wim...</h1>
      <div className='hover:scale-110 cursor-pointer rounded-lg w-8 h-8 flex justify-center items-center duration-300'>
        <h1 onClick={exit} className='font-jet text-lg text-red-700'>x</h1>
      </div>
      </div>
      
      <div className="flex gap-3">
        <div className="group p-1 px-5 w-[400px] flex justify-between rounded-xl shadow-md font-jet indent-1 bg-gradient-to-br from-white to-slate-200 hover:scale-105 hover:shadow-lg duration-500 ">
          <input
            className="focus:outline-none bg-inherit text-slate-600 focus:text-black"
            placeholder="Wim..."
            onChange={(e) => {
              setText(e.target.value)
            }}
          />
          <div onClick={submitPost} className={`${!text ? 'bg-slate-400' : 'bg-blue-600'} opacity-0 group-focus:opacity-100 group-hover:opacity-100 shadow-md group-hover:shadow-lg ${!text ? 'hover:bg-slate-500' : 'hover:bg-blue-700 hover:scale-110'} px-2 pr-3 h-8 cursor-pointer flex rounded-full justify-center items-center duration-200`}>
            <h1 className="text-white font-jet">Submit</h1>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default QuickWim
