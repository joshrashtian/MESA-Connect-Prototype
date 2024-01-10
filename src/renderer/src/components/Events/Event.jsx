import React, { useState } from 'react'
import { DateCalcuation, convertDate } from '../functions'
import { TimeDefer } from '../time'
import EventModal from './EventModal'

const EventPanel = ({ event }) => {

  const time = new Date(event.start.toDate())
  const time2 = new Date(event.end.toDate())

  const date = new DateCalcuation(time)
  const date2 = new DateCalcuation(time2)

  const timeComp = new TimeDefer(date, date2)

  //const sampleTime = new DateCalcuation(startTime)

  return (
    <div className="w-[100%] h-[30%] p-5 flex cursor-pointer hover:scale-[1.02] duration-200 bg-white hover:bg-slate-100 rounded-2xl">
      <ul className="w-[100%] flex-col flex">
        <li className=" flex justify-between">
          <h1 className=" font-eudoxusbold text-xl">{event.title}</h1>
          <li className="flex gap-3 items-center">
            {event.tags && event.tags.map((tag) => (
              <li className="p-0.5 px-1.5 rounded-lg bg-slate-200">
                <h1 className="font-jet">{tag}</h1>
              </li>
            ))}
          </li>
        </li>
        <h1 className="font-eudoxus">{date.fetchDate('long')}</h1>
        <ul className="p-2 px-4 bg-slate-50 w-full rounded-xl flex justify-between">
          <p className="font-jet text-slate-500">
            Time: {date.fetchTime()} - {date2.fetchTime()}
          </p>
          <p className="font-jet text-slate-500">{ !event.type || event.type === 'reg' ? `Location: ${event.location}` : `Remote`}</p>
        </ul>
      </ul>
    </div>
  )
}

const EventSmallPanel = ({ event }) => {

  const time = new Date(event.start.toDate())
  const time2 = new Date(event.end.toDate())

  const date = new DateCalcuation(time)
  const date2 = new DateCalcuation(time2)

  const timeComp = new TimeDefer(date, date2)

  //const sampleTime = new DateCalcuation(startTime)

  return (
    <div className=" h-30 p-5 cursor-pointer hover:scale-[1.02] duration-200 bg-white hover:bg-slate-100 rounded-2xl">
      <ul className="w-[100%] flex-col flex ">
        <li className=" flex justify-between ">
          <h1 className=" font-eudoxusbold text-xl">{event.title}</h1>
        </li>
        <h1 className="font-eudoxus"></h1>
        <ul className="p-2 px-4 bg-slate-50 w-full rounded-xl flex gap-12 justify-between">
          <p className="font-jet text-slate-500"> { !event.type || event.type === 'reg' ? `${event.location}` : `Remote`}</p>
          <p className="font-jet text-slate-500">{date.fetchDate('short')} </p>
        </ul>
      </ul>
    </div>
  )
}

export { EventPanel, EventSmallPanel }
