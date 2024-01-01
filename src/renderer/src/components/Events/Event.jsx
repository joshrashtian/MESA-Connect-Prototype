import React from 'react'
import { DateCalcuation, convertDate } from '../functions'

const EventPanel = () => {

  const sampleDate = new Date(56849720347)
  const startTime = new Date(2024, 2, 10, 5, 30, 0)
  const endTime = new Date(2024, 2, 10, 6, 30, 0)

  const sampleTime = new DateCalcuation(startTime)

  let sampleTags = ['Chemistry', 'Computer Science', '']

  return (
    <div className='w-[100%] h-[30%] p-5 flex bg-white rounded-2xl'>
        <ul className='w-[50%]'>
            <h1 className=' font-eudoxusbold text-xl'>Bioinformatics</h1>
            <h1 className='font-eudoxus'>{convertDate(sampleDate, 'long')}</h1>
            <ul className='p-2 bg-slate-100 w-[100%] rounded-xl'>
                <p className='font-jet text-slate-500'>Time: {sampleTime.fetchTime()} | Location: Valencia</p>
            </ul>
        </ul>
    </div>
  )
}

export default EventPanel