import React from 'react'

const NextButton = ({ onPress, style }) => {
  return (
    <div onClick={onPress} className={`${style} hover:scale-105 duration-500 p-2 cursor-pointer bg-orange-500 hover:bg-orange-600 rounded-3xl flex justify-center items-center w-1/5`}>
    <p className='text-2xl font-eudoxusbold text-white'>Next Slide</p>
    </div>
  )
}

export default NextButton