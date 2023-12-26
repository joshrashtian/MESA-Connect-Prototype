import React from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <div>
        <motion.div className='h-screen flex items-center justify-center' initial={{opacity: '0%'}} animate={{opacity: '100%'}}>
            <div className=' border-4 px-32 py-2 border-amber-950 rounded-full'>
                <motion.div className='p-4 bg-amber-800 rounded-full' animate={{x: [-100, -200, 0, 100]}} transition={{ duration: 0.4, delay: 0.2, times: [0, 0.5, 1, 2], repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.2, type: "spring", stiffness: 400, damping: 24 }} />
            </div>
        </motion.div>
    </div>
  )
}

export default LoadingScreen