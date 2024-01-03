import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db, storage } from '../../../../firebase'
import UserIcon from '../assets/icons/UserIcon.png'
import NoPosts from './Social/Profile/NoPosts'
import LoadingScreen from './LoadingScreen'
import Post from './Social/Post'
import Wim from './Social/PostTypes/Wim'
import { convertDate, refactorName } from './functions'
import AboutMe from './Social/Profile/AboutMe'

const ProfileScreen = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState(undefined)
  const [aUser, setAuser] = useState()
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState()

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
    <div className="h-screen flex flex-col gap-16">
      <header className="p-12 pt-20 pb-16 flex rounded-br-[120px] bg-gradient-to-b from-[#c76c12] from-75% to-[#8d4111] shadow-xl">
        <img
          src={user.photoURL !== null || undefined ? user.photoURL : UserIcon}
          className="h-32 w-32 mr-10 rounded-full bg-white"
        />

        <div className='flex flex-col gap-2'>
          <div className="flex items-center">
            <h2 className="font-eudoxusbold bg-gradient-to-tr bg-clip-text text-transparent from-white to-slate-300 text-6xl">
              {user.realname !== undefined || null
                ? user.realname
                : user.username !== undefined || null
                  ? user.username
                  : null}
            </h2>
            
              {aUser !== null || undefined
                ? auth.currentUser.uid === id
                  ? <h2 className="font-eudoxus ml-4 p-2 px-3 bg-white rounded-full text-red-800 text-xl">Your Account</h2>
                  : null
                : null}
            
          </div>
          <div className='flex gap-10 justify-between'>
            <h2 className="font-eudoxus bg-gradient-to-br bg-clip-text text-transparent from-white to-slate-200 text-3xl">
              {user.username !== undefined || null ? refactorName(user.username)  : null}
            </h2>
            <h2 className="font-eudoxus bg-gradient-to-br bg-clip-text text-transparent from-slate-200 to-slate-50 text-3xl">
              {user.major}
            </h2>
          </div>
          <ul className='flex flex-row-reverse justify-between items-center'>
          <h2 className={` w-48 font-eudoxus text-emerald-600 text-xl shadow-inner bg-white rounded-xl text-center`}>
            Joined {user.joined !== undefined || null ? `${convertDate(user.joined.toDate(), 'tiny')}` : null}
          </h2>
          <p className='text-white text-xl'>{user.bio.length != 0 ? user.bio : 'This user has no bio set.'}</p>
          </ul>
        </div>
      </header>
      <section className="flex justify-between gap-2 mx-8">
        <section className="ml-10 w-[66%] flex flex-col gap-10">
          
          <AboutMe data={user.about ? user.about : null} />
          
          <ul>
          <h1 className="font-eudoxusbold text-3xl">Recent Posts</h1>
          <div className="gap-2 flex flex-col mt-5">
            {posts ? posts.length !== 0 ? (
              posts.map((e) => {
              if(!e.type) return <Post post={e} type="profile" user={e.userID} />
              if(e.type == 'wim') return <Wim wim={e} />
            })
            ) : (
              <NoPosts user={user.username} />
            ) : (
              <NoPosts user={user.username} />)
              }
          </div>
          </ul>
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
