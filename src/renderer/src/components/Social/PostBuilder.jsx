import React, { useState } from 'react'
import { useScroll, motion } from 'framer-motion'

const PostBuilder = () => {
  const [text, setText] = useState()

  const { scrollYprogress } = useScroll()

  console.log(scrollYprogress)

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-4/5 h-4/5 bg-[#EEE] rounded-2xl shadow-2xl p-12 pb-36">
        <h1 className="font-eudoxusbold text-6xl mb-2">Post Lab</h1>
        <div className="flex flex-row-reverse h-[100%] w-[100%]">
          <div className="overflow-y-scroll no-scrollbar  w-[98%] h-full px-28 align-top">
            <input
              maxLength="65"
              className="w-full cursor-pointer focus:cursor-text font-eudoxusbold text-4xl rounded-xl p-3 mb-5 focus:outline-none bg-gradient-to-r from-amber-600 via-red-500 to-blue-400 inline-block bg-clip-text text-transparent hover:text-current focus:text-current duration-300"
              placeholder="Header..."
            />
            <textarea
              onChange={(e) => setText(e.target.value)}
              className="h-[50%] font-eudoxus focus:outline-none w-full bg-gradient-to-tr from-white to-slate-100 rounded-xl text-left p-3"
              placeholder="Text..."
            />
            {!text ? null : text.length != 0 ? (
              <motion.div
                className="bg-[#ddd] flex gap-10 p-3 justify-center"
                initial={{ opacity: '0%', y: -20 }}
                animate={{ opacity: '100%', y: 0 }}
              >
                <h1 className="font-jet text-slate-600">Character Count: {text.length}</h1>
                <h1 className="font-jet text-slate-600">Word Count: {text.split(' ').length}</h1>
              </motion.div>
            ) : null}
          </div>
        </div>
        { !text ? null : text.length != 0 ? (
        <motion.section initial={{y: 20, opacity: '0%'}} animate={{y: 0, opacity: '100%'}} className='h-16 bg-gradient-to-tr from-orange-600 to-orange-400 flex justify-center gap-5 items-center rounded-full shadow-xl'>
          <ul className='p-2 bg-white hover:bg-orange-500 px-7 rounded-full cursor-pointer hover:scale-110 duration-300 flex justify-center items-center'>
            <h1 className=' font-eudoxusbold text-black'>Submit</h1>
          </ul>
          <ul className='p-2 bg-white px-7 text-black hover:bg-red-500 hover:text-white rounded-full cursor-pointer hover:scale-110 duration-300 flex justify-center items-center'>
            <h1 className=' font-eudoxusbold text-black'>Discard Changes</h1>
          </ul>
        </motion.section>
        ) : null}
      </div>
    </div>
  )
}

export default PostBuilder
