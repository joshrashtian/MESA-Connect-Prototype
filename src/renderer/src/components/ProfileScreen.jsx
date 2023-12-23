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
    <div className="h-screen">
      <header className="flex">
        <img src={user.photoURL !== null || undefined ? user.photoURL : null} className="" />
        <div>
          <h2 className="absolute m-16 font-eudoxusbold text-6xl">
            {user.realname !== undefined || null
              ? user.realname
              : user.username !== undefined || null
                ? user.username
                : null}
          </h2>
          <h2 className="absolute m-16 mt-32 font-eudoxusbold text-3xl">
            {user.username !== undefined || null ? user.username : null}
          </h2>
          <h2 className="absolute m-16 mt-48 font-eudoxusbold text-3xl">
            Joined {user.joined !== undefined || null ? user.joined.toDate().toDateString() : null}
          </h2>
        </div>
      </header>
    </div>
  )
}

export default ProfileScreen
