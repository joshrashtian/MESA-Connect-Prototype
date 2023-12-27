import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db, storage } from '../../../../firebase'
import UserIcon from '../assets/icons/UserIcon.png'
import NoPosts from './Social/Profile/NoPosts'
import LoadingScreen from './LoadingScreen'
import Post from './Social/Post'

const ProfileScreen = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState(undefined);
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
        const q = query(collection(db, "posts"), where("userID", "==", id));
        const newData = await getDocs(q)
        console.log(newData)
        const final = newData.docs.map(e => ({
          ...e.data(), id: e.id
        }))
        setPosts(final)
      } catch (e) {
        console.error(e)
      }
    }

    if(auth.currentUser) setAuser (auth.currentUser.uid)
    else setAuser(null)
    getUser()
    getPosts()
  }, [])

  if(loading)return <LoadingScreen />;

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
            {aUser !== null || undefined ? auth.currentUser.uid === id ? 'Your Account' : null : null}
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
          posts.map(post => (<Post post={post} user={id} />)) : <NoPosts user={user.username} />
        }
      </section>
    </div>
  )
}

export default ProfileScreen
