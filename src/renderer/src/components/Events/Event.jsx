import React from 'react'
import { DateCalcuation, convertDate } from '../functions'
import { TimeDefer } from '../time'

const EventPanel = () => {


  const time = new Date(2024, 2, 10, 5, 30, 0)
  const sampleTime = new DateCalcuation(time)
  const date2 = new Date(2024, 2, 10, 7, 10, 0)
  const sampleTime2 = new DateCalcuation(date2)
  const timeComp = new TimeDefer(time, date2)

  //const sampleTime = new DateCalcuation(startTime)
  console.log(timeComp)
  console.log(sampleTime.printInfo())
  let sampleTags = ['Chemistry', 'Computer Science', '']

  return (
    <div className='w-[100%] h-[30%] p-5 flex bg-white rounded-2xl'>
        <ul className='w-[50%]'>
            <h1 className=' font-eudoxusbold text-xl'>Bioinformatics</h1>
            <h1 className='font-eudoxus'>{sampleTime.fetchDate('long')}</h1>
            <ul className='p-2 bg-slate-100 w-[100%] rounded-xl'>
                <p className='font-jet text-slate-500'>Time: {sampleTime.fetchTime()} - {sampleTime2.fetchTime()} | Location: Valencia</p>
            </ul>
        </ul>
    </div>
  )
}

export default EventPanel