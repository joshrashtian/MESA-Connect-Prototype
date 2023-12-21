import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../firebase'

const ProfileScreen = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
        try {
          const userRef = doc(db, 'users', id)
          const got = await getDoc(userRef)
          console.log(got.data())
          setUser(got.data())
        } catch (e) {
          alert(e)
        }
      }
    getUser()
    }, [])

  return (
    <div className='h-screen'>
      <h2 className='absolute m-16 font-eudoxusbold text-6xl'>{user.email}</h2>
    </div>
  )
}

export default ProfileScreen