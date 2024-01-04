import React, { useState } from 'react'

const PostTypeArray = ({ category }) => {

const types = ['Post', 'Wim', 'Event']

const [active, setActive] = useState('Post')

const changeType = (e) => {
    setActive(e)
    category(e)
}

  return (
    <div className='flex justify-center gap-4 p-3 bg-gray-200 rounded-full'>
    {
        types.map(e => (
            <div onClick={() => {changeType(e)}} className={`p-2 px-6 cursor-pointer ${ e === active ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white hover:bg-slate-300 hover:shadow-md shadow-lg' }   group duration-300 rounded-2xl`}>
                <h1 className={`font-jet font-bold ${ e === active ? 'text-white' : 'text-slate-400 group-hover:text-black'}  duration-300 text-xl`}>{e}</h1>
            </div>
        ))
    }
    </div>
  ) 
}


export default PostTypeArray