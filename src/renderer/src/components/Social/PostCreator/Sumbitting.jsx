import React from 'react'
import { motion } from 'framer-motion'
const Sumbitting = () => {
  return (
    <motion.div initial={{scaleX: 0}} animate={{scaleX: 1}} className='flex justify-center items-center gap-5'>
        <h1 className='font-eudoxus text-white text-xl'>Submitting</h1>
        <motion.div className='p-0.5 py-1 rounded-full bg-white w-1/4 h-1/4' animate={{x: [0, -5, 0, 5, 0], y: [5, 0, -5, 0, 5], rotate: [0, 90, 180, 270, 360]}} transition={{ ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', duration: 1}} />
    </motion.div>
  )
}

export default Sumbitting