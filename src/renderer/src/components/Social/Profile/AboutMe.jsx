import React from 'react'

const AboutMe = ({data}) => {
  if(!data) return null

  return (
    <div className='w-full bg-white p-5 rounded-2xl shadow-inner'>
        <h1 className='font-eudoxusbold text-xl'>About Me</h1>
        <h2 className='font-eudoxus text-gray-500'>{data.opening}</h2>
    </div>
  )
}

export default AboutMe