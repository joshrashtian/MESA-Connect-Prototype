import { useState } from 'react'

const QuickWim = () => {
  const [text, setText] = useState()
  
  return (
    <section className='flex flex-col'>
        <h1 className='font-eudoxusbold text-xl mb-2'>Type a Quick Wim...</h1>
        <div className='flex gap-3'>
            <div className='group p-1 px-5 w-[400px] flex justify-between rounded-xl shadow-md font-jet indent-1 bg-gradient-to-br from-white to-slate-100 hover:scale-105 hover:shadow-lg duration-500 '>
                <input className='focus:outline-none bg-inherit' placeholder='Wim...' onChange={(e) => {setText(e.target.value)}}/>
                <div className='bg-blue-600 opacity-0 group-focus:opacity-100 group-hover:opacity-100 hover:bg-blue-700 hover:scale-110 w-20 h-8 cursor-pointer flex rounded-full justify-center items-center duration-200'>
                    <h1 className='text-white font-jet'>Sumbit</h1>
                </div>
            </div>
        </div>
    </section>
  )
}

export default QuickWim