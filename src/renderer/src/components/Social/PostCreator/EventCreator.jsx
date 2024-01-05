import { Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TimeDefer } from '../../time'
import { DateCalcuation } from '../../functions'

const EventCreator = () => {
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [time1, setTimeOne] = useState()
  const [time2, setTimeTwo] = useState()
  const [tags, setTags] = useState([])
  const [a, setA] = useState()

  const [tagInput, setTagInput] = useState()

  const handleDateChange = (date, c) => {
    console.log(date)
    const test = Timestamp.fromDate(new Date(date))
    console.log(test.toDate().getMonth())
    if (c === 'one') setTimeOne(date)
    if (c === 'two') setTimeTwo(date)
  }

  const deleteTag = (e) => {
    console.log(e)
    let copy = [...tags];
    copy.splice(e, 1)
    setTags(copy)
  }

  return (
    <motion.div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 mt-5">
        <input
          onChange={(e) => setTitle(e.target.value)}
          maxLength="65"
          className="w-full cursor-pointer focus:cursor-text font-eudoxusbold text-4xl rounded-xl mb-5 focus:outline-none bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-400 inline-block bg-clip-text text-transparent hover:text-current focus:text-current duration-300"
          placeholder="Name of Event..."
        />
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          maxLength="200"
          className="w-full cursor-pointer focus:cursor-text font-eudoxus bg-slate-300 text-2xl rounded-xl mb-5 focus:outline-none bg-gradient-to-br from-emerald-800 via-gray-500 to-slate-400 inline-block bg-clip-text text-transparent hover:text-current focus:text-current duration-300"
          placeholder="Description..."
        />
        <h1 className=" font-eudoxusbold text-2xl ">Start / End</h1>
        <ul className="flex gap-3">
          <input
            type="datetime-local"
            className="p-2 w-1/2 font-eudoxus text-slate-500 bg-gray-50 shadow-sm rounded-full"
            onChange={(e) => handleDateChange(e.target.value, 'one')}
          />
          <input
            type="datetime-local"
            className="p-2 w-1/2 font-eudoxus text-slate-500 bg-gray-50 shadow-sm rounded-full"
            onChange={(e) => handleDateChange(e.target.value, 'two')}
          />
        </ul>
        <h1 className=" font-eudoxusbold text-2xl ">Tags / Subjects</h1>
        <ul className='flex gap-2 items-center'>
        <input className='p-2 px-10 w-1/2 font-eudoxus text-slate-500 bg-gray-50 shadow-sm rounded-full' onChange={(e) => setTagInput(e.target.value)} />
        <p onClick={() => {setTags([...tags, tagInput])}} className='font-eudoxus cursor-pointer p-2 px-6 bg-orange-500 hover:bg-orange-700 duration-300 text-white rounded-full'>Submit</p>
        </ul>
        <ul className='flex gap-3'>
        {tags && tags.map((e, index) => (
          <div key={index} className='p-2 px-6 rounded-full cursor-pointer bg-slate-400 hover:bg-slate-700 duration-300'>
            <h1 onClick={() => {deleteTag(index)}} className='text-white font-eudoxus'>{e}</h1>
          </div>
        ))}
        </ul>
      </section>
    </motion.div>
  )
}

export default EventCreator
