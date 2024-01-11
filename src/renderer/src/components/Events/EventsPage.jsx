import React, { useState, useEffect } from 'react'
import { getDoc, doc, collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../../../../firebase'
import { EventPanel, EventSmallPanel } from './Event'
import LoadingScreen from '../LoadingScreen'
import EventModal from './EventModal'

const EventsPage = () => {
  const [events, setEvents] = useState([{}])
  const [loading, setLoading] = useState(true)
  const [ modal, setModal ] = useState(false)
  const [ modalData, setModalData] = useState({})

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventRef = query(collection(db, 'events'), orderBy('start'))
        const events = await getDocs(eventRef)
        const eventData = events.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setEvents(eventData)
        await setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }

    getEvents()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
      <h1 className="m-16 font-eudoxusbold text-6xl">What's Going On At MESA</h1>
      <section className="absolute left-[12%] w-[76%] flex flex-col gap-4   ">
        <h2 className="font-eudoxusbold text-4xl bg-gradient-to-tr from-slate-500 to-orange-700 bg-clip-text text-transparent inline-block">Upcoming Events</h2>
        <ul className="flex whitespace-nowrap gap-2 mt-2 overflow-x-auto no-scrollbar">
          {events.map((event) => (
            <div onClick={() => {setModalData(event); setModal(true)}}><EventSmallPanel event={event} /></div>
          ))}
        </ul>
        <h2 className="font-eudoxusbold text-4xl bg-gradient-to-tr from-slate-500 to-orange-700 bg-clip-text text-transparent inline-block">Annoucements</h2>
      </section>
      <EventModal open={modal} data={modalData} setClose={() => {setModal(false)}} />
    </div>
  )
}

export default EventsPage
