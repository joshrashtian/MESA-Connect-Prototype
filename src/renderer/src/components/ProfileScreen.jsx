import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc } from 'firebase/firestore'
import { db, storage } from '../../../../firebase'
import UserIcon from '../assets/icons/UserIcon.png'

const ProfileScreen = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState(undefined);

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
        
        <img src={user.photoURL !== null || undefined ? user.photoURL : UserIcon} className="h-32 w-32 mr-10 rounded-full bg-white" />
        
        <div>
          <div className='flex items-center'>
          <h2 className="font-eudoxusbold text-6xl">
            {user.realname !== undefined || null
              ? user.realname
              : user.username !== undefined || null
                ? user.username
                : null}
          </h2>
          <h2 className="font-eudoxusbold ml-4 text-red-800 text-3xl">
            Your Account
          </h2>
          </div>
          <h2 className="font-eudoxusbold text-3xl">
            {user.username !== undefined || null ? user.username : null}
          </h2>
          <h2 className="font-eudoxusbold text-xl">
            Joined {user.joined !== undefined || null ? user.joined.toDate().toDateString() : null}
          </h2>
        </div>
      </header>
      <section className='ml-16'>
        <h1 className='font-eudoxusbold text-3xl'>Recent Posts</h1>
        {posts != undefined ? 
          <h1>Posts!</h1> : <h1>No Posts :(</h1>
        }
      </section>
    </div>
  )
}

export default ProfileScreen
