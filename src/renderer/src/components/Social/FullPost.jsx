import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../../firebase'
import LoadingScreen from '../LoadingScreen'
import { convertDate } from '../functions'

const FullPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  console.log(id)

  useEffect(() => {
    const getPost = async () => {
      try {
        const postRef = doc(db, 'posts', id)
        const got = await getDoc(postRef)
        setPost(got.data())
        const userRef = doc(db, 'users', got.data().userID)
        const got2 = await getDoc(userRef)
        setUser(got2.data())
        await setLoading(false)
      } catch (e) {
        alert(e)
      }
    }

    getPost()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <motion.div
      className="h-screen flex justify-center items-center "
      initial={{ opacity: '0%' }}
      animate={{ opacity: '100%' }}
    >
      <div className="bg-white flex flex-col gap-8 w-5/6 h-5/6 p-16 rounded-2xl shadow-xl overflow-y-scroll no-scrollbar">
        <section className="flex gap-4">
          <img src={user.photoURL} className="h-16 w-16 rounded-full" />
          <ul>
            <h1 className="font-eudoxusbold text-5xl">{post.header}</h1>
            <h1 className="font-eudoxus">
              by {user.realname} -{' '}
              {user.joined !== undefined || null
                ? `${convertDate(user.joined.toDate(), 'short')}`
                : null}
            </h1>
          </ul>
        </section>
        <section className="">
          {post.contents !== undefined
            ? post.contents.map((content, index) => (
                <div key={index}>
                  {content.text !== undefined ? (
                    <h1 className=" font-eudoxus text-lg text-slate-700">{content.text}</h1>
                  ) : null}
                </div>
              ))
            : null}
        </section>
      </div>
    </motion.div>
  )
}

export default FullPost
