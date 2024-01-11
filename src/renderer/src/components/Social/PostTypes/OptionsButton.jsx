import { useState } from 'react'
import { motion } from 'framer-motion'
import { deletePost } from '../../functions'


const OptionsButton = ({ post, isOwner, update }) => {
  const [owner, setOwner] = useState(isOwner)
  const [mode, setMode] = useState(0)
  //0 is select, 1 is  confirmation

  const menuOptions = [
    {
      title: 'Delete Post',
      owner: true,
      confirmationRequired: true,
      func() {
        deletePost(post)
        update()
      }
    }
  ]
  return ( 
    <motion.div className={`absolute ${ mode == 1 ? 'w-64 h-40 p-3 pl-8 ml-[-125px]' : 'ml-[-50px]' } mt-8  bg-white rounded-lg p-2 shadow-xl duration-700`}>
      { mode == 0 ?
      <motion.div
      initial={{ scale: 0.7, opacity: '0%' }}
      animate={{ scale: 1, opacity: '100%' }}
      transition={{ duration: 0.1, type: 'spring' }}
      className={`w-40 h-auto py-2 flex ${mode == 0 ? 'justify-center items-center' : null}  bg-white hover:bg-slate-200 duration-500 rounded-lg`}
      onClick={() => {setMode(1)}}
        >
        <h1 className="font-jet text-slate-500">Delete Post</h1>
      </motion.div>
      : <motion.div
      initial={{ scale: 0.7, opacity: '0%' }}
      animate={{ scale: 1, opacity: '100%' }}
      transition={{ duration: 0.1, type: 'spring' }}
      className={`w-40 h-auto py-2 flex ${mode == 0 ? 'justify-center items-center' : null}  bg-white hover:bg-slate-200 duration-500 rounded-lg`}
      onClick={() => {deletePost(post); update()}}
        >
        <h1 className="font-jet text-slate-500">Are You Sure You Want To Delete This Post?</h1>
      </motion.div> }
    </motion.div>
  )
}
    


export default OptionsButton
