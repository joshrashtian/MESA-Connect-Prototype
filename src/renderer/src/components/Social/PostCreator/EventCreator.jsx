import { Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'

const EventCreator = () => {
  const [time1, setTimeOne] = useState()

  const handleDateChange = (date) => {
    console.log(date)
    const test = Timestamp.fromDate(new Date(date))
    console.log(test.toDate().getMonth())
    setTimeOne(date)
  }

  return (
    <div>
        <input type='datetime-local' className='p-2 font-eudoxus text-slate-700 bg-gray-100 rounded-full' onChange={e => handleDateChange(e.target.value)} />
    </div>
  )
}

export default EventCreator