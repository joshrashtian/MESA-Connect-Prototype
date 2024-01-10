import React, { useState, useEffect } from 'react'
import { getDoc, doc, collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../../../../firebase'
import { EventPanel, EventSmallPanel } from './Event'
import LoadingScreen from '../LoadingScreen'

const EventsPage = () => {
  const [events, setEvents] = useState([{}])
  const [loading, setLoading] = useState(true)

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
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }

    getEvents()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
      <h1 className="m-16 font-eudoxusbold text-6xl">Events</h1>
      <section className="absolute left-[12%] w-[76%]   ">
        <h2 className="font-eudoxus text-4xl">Featured</h2>
        <ul className="flex whitespace-nowrap gap-2 mt-2 overflow-x-auto no-scrollbar">
          {events.map((event) => (
            <EventSmallPanel event={event} />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default EventsPage
