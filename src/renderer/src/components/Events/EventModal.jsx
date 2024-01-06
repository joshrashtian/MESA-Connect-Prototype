import React, { useEffect, useRef, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { DateCalcuation, convertDate } from '../functions'
import { TimeDefer } from '../time'

const EventModal = ({ open, setClose, data }) => {
  if (!open || !data) return null

  const time = new Date(data.start.toDate())
  const time2 = new Date(data.end.toDate())

  const date = new DateCalcuation(time)
  const date2 = new DateCalcuation(time2)

  const timeComp = new TimeDefer(time, time2)

  return (
    <div className="flex justify-center items-center bg-black">
      <motion.div
        initial={{ opacity: '0%' }}
        animate={{ opacity: '100%' }}
        transition={{ duration: 0.2 }}
        className=" w-3/4 h-2/3 top-[15%] fixed flex-col flex justify-between bg-white rounded-3xl shadow-2xl"
      >
        <div
          className=" absolute top-7 right-10 text-gray-400 hover:text-red-800 font-semibold p-2 hover:scale-125 duration-200 cursor-pointer "
          onClick={() => setClose()}
        >
          <h1 className="text-4xl">x</h1>
        </div>
        <section className="h-full p-10">
          <h1 className=" font-eudoxusbold text-4xl">{data.title}</h1>
          <div className="p-4 flex h-1/2 justify-center gap-3">
            <ul className="w-1/3 h-full p-3 bg-gradient-to-tl from-slate-100 to-gray-300 hover:scale-105 shadow-sm hover:shadow-lg duration-500 flex flex-col-reverse items-center justify-between rounded-2xl">
              <p className="font-eudoxus text-xl">{date.fetchDate()}</p>
            </ul>
            <ul className="w-1/3 h-full p-3 bg-gradient-to-bl from-slate-100 to-gray-200 hover:scale-105 shadow-sm hover:shadow-lg duration-500 flex flex-col-reverse items-center justify-between rounded-2xl">
              <ul className="justify-center flex flex-col items-center">
                <p className="font-eudoxus text-xl">
                  {date.fetchTime()}-{date2.fetchTime()}
                </p>
                <p className="font-eudoxus text-xl">
                  ({timeComp.differHours() > 0 && timeComp.differHours() + ' hours'}
                  {timeComp.differHours() > 0 && timeComp.differMin() > 0 ? ' and' : null}
                  {timeComp.differMin() > 0 && timeComp.differMin() + ' minutes'})
                </p>
              </ul>
            </ul>
            <ul className="w-1/3 h-full p-3 bg-gradient-to-tl from-gray-200 to-slate-100 hover:scale-105 shadow-sm hover:shadow-lg duration-500 flex flex-col-reverse items-center justify-between rounded-2xl">
              <p className="font-eudoxus text-xl">{!data.type || data.type === 'reg' ? data.location : <a href={data.location} >Zoom Meeting Link</a>}</p>
            </ul>
          </div>
          <div className="p-4 flex h-4/5 gap-3">
            <ul className="w-2/3 h-1/2 p-10 bg-gradient-to-tl from-blue-200 to-blue-300 hover:scale-105 shadow-sm hover:shadow-lg duration-500 flex flex-col items-center justify-between rounded-2xl">
              <p className="font-eudoxus text-xl text-white">{data.desc}</p>
              <section className="flex gap-4 justify-center ">
                {data.tags &&
                  data.tags.map((tag) => (
                    <div className="bg-white p-1 px-3 rounded-lg">
                      <h1 className="font-jet">{tag}</h1>
                    </div>
                  ))}
              </section>
            </ul>
            <ul className='w-1/3 h-1/2 p-10 bg-gradient-to-tl rounded-2xl from-blue-200 to-blue-300 duration-500 flex flex-col items-center justify-between'>
              <p className="font-eudoxus text-xl text-white">{data.desc}</p>
            </ul>
          </div>
        </section>
      </motion.div>
    </div>
  )
}

export default EventModal
