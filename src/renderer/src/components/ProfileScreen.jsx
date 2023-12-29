import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db, storage } from '../../../../firebase'
import UserIcon from '../assets/icons/UserIcon.png'
import NoPosts from './Social/Profile/NoPosts'
import LoadingScreen from './LoadingScreen'
import Post from './Social/Post'
import Wim from './Social/PostTypes/Wim'

const ProfileScreen = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState(undefined)
  const [aUser, setAuser] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      try {
        const userRef = doc(db, 'users', id)
        const got = await getDoc(userRef)
        setUser(got.data())
        setLoading(false)
      } catch (e) {
        alert(e)
      }
    }

    const getPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), where('userID', '==', id))
        const newData = await getDocs(q)
        console.log(newData)
        const final = newData.docs.map((e) => ({
          ...e.data(),
          id: e.id
        }))
        setPosts(final)
      } catch (e) {
        console.error(e)
      }
    }

    if (auth.currentUser) setAuser(auth.currentUser.uid)
    else setAuser(null)
    getUser()
    getPosts()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="h-screen">
      <header className=" m-16 ml-12 flex">
        <img
          src={user.photoURL !== null || undefined ? user.photoURL : UserIcon}
          className="h-32 w-32 mr-10 rounded-full bg-white"
        />

        <div>
          <div className="flex items-center">
            <h2 className="font-eudoxusbold text-6xl">
              {user.realname !== undefined || null
                ? user.realname
                : user.username !== undefined || null
                  ? user.username
                  : null}
            </h2>
            <h2 className="font-eudoxusbold ml-4 text-red-800 text-3xl">
              {aUser !== null || undefined
                ? auth.currentUser.uid === id
                  ? 'Your Account'
                  : null
                : null}
            </h2>
          </div>
          <h2 className="font-eudoxusbold text-3xl">
            {user.username !== undefined || null ? user.username : null}
          </h2>
          <h2 className={`font-eudoxus text-emerald-700 text-xl bg-gray-200 rounded-xl w-[36%] text-center`}>
            Joined {user.joined !== undefined || null ? user.joined.toDate().toDateString() : null}
          </h2>
        </div>
      </header>
      <section className="flex justify-between gap-2">
        <section className="ml-10 w-[66%]">
          <h1 className="font-eudoxusbold text-3xl">Recent Posts</h1>
          <div className="gap-2 flex flex-col mt-5">
            {posts != undefined ? (
              posts.map((e) => {
              if(!e.type) return <Post post={e} type="profile" user={e.userID} />
              if(e.type == 'wim') return <Wim wim={e} />
            })
            ) : (
              <NoPosts user={user.username} />
            )}
          </div>
        </section>
        <section className="mr-10 w-[33%] text-right">
          <h1 className="font-eudoxusbold text-3xl">Friends</h1>
          {user.friends != undefined ? <div>Friends</div> : <h1>No Friends</h1>}
        </section>
      </section>
    </div>
  )
}

export default ProfileScreen
