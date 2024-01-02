import React from 'react'
import { DateCalcuation, convertDate } from '../functions'
import { TimeDefer } from '../time'

const EventPanel = ({ event }) => {
  const time = new Date(2024, 2, 10, 11, 30, 0)
  const sampleTime = new DateCalcuation(time)
  const date2 = new Date(2024, 2, 10, 18, 10, 0)
  const sampleTime2 = new DateCalcuation(date2)
  const timeComp = new TimeDefer(time, date2)

  //const sampleTime = new DateCalcuation(startTime)
  console.log(timeComp)
  console.log(sampleTime.printInfo())
  let sampleTags = ['Biology', 'Computer Science']

  return (
    <div className="w-[100%] h-[30%] p-5 flex cursor-pointer hover:scale-[1.02] duration-200 bg-white hover:bg-slate-100 rounded-2xl">
      <ul className="w-[100%] flex-col flex">
        <li className=" flex justify-between">
          <h1 className=" font-eudoxusbold text-xl">Bioinformatics</h1>
          <li className="flex gap-3 items-center">
            {sampleTags.map((tag) => (
              <li className="p-0.5 px-1.5 rounded-lg bg-slate-200">
                <h1 className="font-jet">{tag}</h1>
              </li>
            ))}
          </li>
        </li>
        <h1 className="font-eudoxus">{sampleTime.fetchDate('long')}</h1>
        <ul className="p-2 px-4 bg-slate-50 w-full rounded-xl flex justify-between">
          <p className="font-jet text-slate-500">
            Time: {sampleTime.fetchTime()} - {sampleTime2.fetchTime()}
          </p>
          <p className="font-jet text-slate-500">Location: Valencia Campus</p>
        </ul>
      </ul>
    </div>
  )
}

export default EventPanel
