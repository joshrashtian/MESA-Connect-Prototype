import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { db, auth } from '../../../../../../firebase'

const NewWim = ({ updateText }) => {
  const [text, setText] = useState()

  return (
    <motion.section
      className="flex flex-col mx-3 mt-5"
    >

       
        <textarea
              onChange={(e) => {setText(e.target.value); updateText(e.target.value)}}
              className="h-[50%] font-eudoxus text-lg text-slate-700 focus:outline-none w-full bg-gradient-to-tr from-white to-slate-100 rounded-xl text-left p-3"
              placeholder="Text..." maxLength="65"
            />

        {text && text.length != 0 && (
              <motion.div
                className="bg-[#ddd] flex gap-10 p-3 justify-center"
                initial={{ opacity: '0%', y: -20 }}
                animate={{ opacity: '100%', y: 0 }}
              >
                <h1 className="font-jet text-slate-600">Character Count: {text.length}</h1>
                <h1 className="font-jet text-slate-600">Word Count: {text.split(' ').length}</h1>
              </motion.div> )}
              {text && text.length == 65 && (
                <motion.div
                className=" bg-red-600 flex gap-10 p-3 justify-center"
                initial={{ opacity: '0%', y: -20 }}
                animate={{ opacity: '100%', y: 0 }}
              >
                <h1 className="font-jet text-slate-100">Maximum Length is 65 Characters!</h1>
              </motion.div>
                 )}


    </motion.section>
  )
}

export default NewWim
