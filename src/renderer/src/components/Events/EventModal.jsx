import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DateCalcuation, convertDate } from '../functions'
import { TimeDefer } from '../time'

const EventModal = ({ open, setClose, data }) => {
  const [status, setStatus] = useState(false)

  if (!open || !data) return null

  const time = new Date(data.start.toDate())
  const time2 = new Date(data.end.toDate())

  const date = new DateCalcuation(time)
  const date2 = new DateCalcuation(time2)

  const timeComp = new TimeDefer(time, time2)

  return (
    <div className="flex justify-center items-center bg-black">
      <div className=" w-3/4 h-2/3 fixed flex-col flex justify-between bg-white rounded-3xl shadow-2xl p-10 ">
        <div className=" absolute top-7 right-10 text-gray-400 hover:text-red-800 font-semibold p-2 hover:scale-125 duration-200 cursor-pointer " onClick={() => setClose()}>
          <h1 className='text-4xl'>x</h1>
        </div>
        <section>
          <h1 className=" font-eudoxusbold text-4xl">{data.title}</h1>
          <div className="p-4 flex justify-center gap-3">
            <ul className='w-1/3 p-3 bg-slate-100 flex flex-col items-center justify-center rounded-2xl'>
                <p className="font-eudoxus text-xl">{date.fetchDate()}</p>
            </ul>
            <ul className='w-1/3 p-3 bg-slate-100 flex flex-col items-center justify-center rounded-2xl'>
            <p className="font-eudoxus text-xl">
              {date.fetchTime()}-{date2.fetchTime()}
            </p>
            <p className="font-eudoxus text-xl">({timeComp.differHours() > 0 && timeComp.differHours() + ' hours'} {timeComp.differHours() > 0 && timeComp.differMin() > 0 ? 'and' : null } {timeComp.differMin() > 0 && timeComp.differMin() + ' minutes'})</p>
            </ul>
            <ul className='w-1/3 p-3 bg-slate-100 flex flex-col items-center justify-center rounded-2xl'>
            <p className="font-eudoxus text-xl">{data.location}</p>
            </ul>
          </div>
        </section>
        <section className="flex gap-4 justify-center ">
          {data.tags &&
            data.tags.map((tag) => (
              <div className="bg-slate-100 p-1 px-3 rounded-full">
                <h1 className="font-jet">{tag}</h1>
              </div>
            ))}
        </section>
      </div>
    </div>
  )
}

export default EventModal
