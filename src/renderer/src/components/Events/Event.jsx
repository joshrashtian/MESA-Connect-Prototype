import React from 'react'
import { DateCalcuation, convertDate } from '../functions'

const EventPanel = () => {


  const time = new Date(2024, 2, 10, 5, 30, 0)
  const sampleTime = new DateCalcuation(time)

  //const sampleTime = new DateCalcuation(startTime)
  console.log(sampleTime.printInfo())
  let sampleTags = ['Chemistry', 'Computer Science', '']

  return (
    <div className='w-[100%] h-[30%] p-5 flex bg-white rounded-2xl'>
        <ul className='w-[50%]'>
            <h1 className=' font-eudoxusbold text-xl'>Bioinformatics</h1>
            <h1 className='font-eudoxus'>{sampleTime.fetchDate('long')}</h1>
            <ul className='p-2 bg-slate-100 w-[100%] rounded-xl'>
                <p className='font-jet text-slate-500'>Time: {sampleTime.fetchTime()} | Location: Valencia</p>
            </ul>
        </ul>
    </div>
  )
}

export default EventPanel