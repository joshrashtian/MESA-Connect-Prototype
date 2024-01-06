import { Timestamp, addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Zoom from '../../../assets/icons/Zoom-Logo.png'
import SelectType from './SelectType'
import { db } from '../../../../../../firebase'
import Sumbitting from './Sumbitting'

const EventCreator = () => {
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [time1, setTimeOne] = useState()
  const [time2, setTimeTwo] = useState()
  const [tags, setTags] = useState([])
  const [location, setLocation] = useState()
  const [type, setType] = useState('reg')

  const [rendering, setRendering] = useState(false)

  const [tagInput, setTagInput] = useState()

  const nav = useNavigate()

  const handleDateChange = (date, c) => {
    console.log(date)
    const test = Timestamp.fromDate(new Date(date))
    console.log(test.toDate().getMonth())
    if (c === 'one') setTimeOne(date)
    if (c === 'two') setTimeTwo(date)
  }

  const deleteTag = (e) => {
    console.log(e)
    let copy = [...tags]
    copy.splice(e, 1)
    setTags(copy)
  }

  const submitPost = async () => {
    setRendering(true)
    let startTime = Timestamp.fromDate(new Date(time1))
    let endTime = Timestamp.fromDate(new Date(time2))
    try {
      const postRef = await addDoc(collection(db, 'events'), {
        title: title,
        desc: desc,
        start: startTime,
        end: endTime,
        tags: [...tags],
        location: location,
        type: type
      })
    } catch (e) {
      console.error(e)
    }
    await nav("/social")
  }
  return (
    <motion.div className="flex flex-col gap-4 overflow-y-scroll no-scrollbar h-[90%]">
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
        <h1 className=" font-eudoxusbold text-2xl ">Location</h1>
        <ul className=" flex justify-center gap-2 ">
          <div onClick={() => {setType('reg')}} className={`p-2 w-1/2 rounded-full flex justify-center items-center cursor-pointer ${ type === 'reg' ? 'bg-blue-200' : 'bg-slate-200'} bg-slate-200 hover:bg-slate-300 duration-300`}>
            <h1 className=" font-eudoxusbold bg-gradient-to-tr from-blue-600 to-emerald-700 inline-block bg-clip-text text-transparent">
              In-Person
            </h1>
          </div>
          <div onClick={() => {setType('zoom')}} className={`p-2 w-1/2 rounded-full flex justify-center items-center cursor-pointer ${ type === 'zoom' ? 'bg-blue-200' : 'bg-slate-200'}  hover:bg-slate-300 duration-300`}>
            <img src={Zoom} className="w-14 h-8" />
          </div>
        </ul>
        <SelectType type={type} changeLocation={(e) => {setLocation(e)}} />
        <h1 className=" font-eudoxusbold text-2xl ">Tags / Subjects</h1>
        <ul className="flex gap-2 items-center">
          <input
            className="p-2 px-10 w-1/2 font-eudoxus text-slate-500 bg-gray-50 shadow-sm rounded-full"
            onChange={(e) => setTagInput(e.target.value)}
          />
          <p
            onClick={() => {
              setTags([...tags, tagInput])
            }}
            className="font-eudoxus cursor-pointer p-2 px-6 bg-orange-500 hover:bg-orange-700 duration-300 text-white rounded-full"
          >
            Submit
          </p>
        </ul>
        <ul className="flex gap-3">
          {tags &&
            tags.map((e, index) => (
              <div
                onClick={() => {
                  deleteTag(index)
                }}
                key={index}
                className="p-2 px-6 rounded-full cursor-pointer bg-slate-400 hover:bg-slate-700 duration-300"
              >
                <h1 className="text-white font-eudoxus">{e}</h1>
              </div>
            ))}
        </ul>
      </section>
      { title && desc && tags.length != 0 && time1 && time2 && location && type && (
        <motion.section initial={{y: 20, opacity: '0%'}} animate={{y: 0, opacity: '100%'}} className='h-16 bg-gradient-to-tr from-orange-600 to-orange-400 flex justify-center gap-5 items-center rounded-full shadow-xl absolute bottom-[15%] left-[25%] w-[53%] right-[75%]'>
          { !rendering ?
          <>
          <button onClick={submitPost} className='p-2 bg-white hover:bg-orange-500 px-7 rounded-full cursor-pointer hover:scale-110 duration-300 flex justify-center items-center'>
            <h1 className=' font-eudoxusbold text-black'>Submit</h1>
          </button>
          <ul className='p-2 bg-white px-7 text-black hover:bg-red-500 hover:text-white rounded-full cursor-pointer hover:scale-110 duration-300 flex justify-center items-center'>
            <h1 className=' font-eudoxusbold text-black'>Discard Changes</h1>
          </ul>
          </>
          : <Sumbitting />}
        </motion.section>
        )}
    </motion.div>
  )
}

export default EventCreator

const Locations = ['valencia Campus', 'Zoom', '']
