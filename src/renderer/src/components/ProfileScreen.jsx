import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc } from 'firebase/firestore'
import { db, storage } from '../../../../firebase'

const ProfileScreen = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [image, setImage] = useState(null)

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
      <header className=" m-16 ml-12 flex">
        
        <img src={user.photoURL !== null || undefined ? user.photoURL : null} className="h-32 w-32 mr-10 rounded-full" />
        
        <div>
          <h2 className="absolute font-eudoxusbold text-6xl">
            {user.realname !== undefined || null
              ? user.realname
              : user.username !== undefined || null
                ? user.username
                : null}
          </h2>
          <h2 className="absolute mt-32 font-eudoxusbold text-3xl">
            {user.username !== undefined || null ? user.username : null}
          </h2>
          <h2 className="absolute mt-48 font-eudoxusbold text-3xl">
            Joined {user.joined !== undefined || null ? user.joined.toDate().toDateString() : null}
          </h2>
        </div>
      </header>
    </div>
  )
}

export default ProfileScreen
