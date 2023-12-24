import { useState, useEffect } from 'react'
import { auth, db } from '../../../../firebase'
import { doc, getDoc } from 'firebase/firestore'

const Onboarding = () => {
  const [data, setData] = useState({})

  const [classes, setClasses] = useState([{}])
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [bio, setbio] = useState('')
  const [major, setmajor] = useState('')

  useEffect(() => {
    const getUser = async () => {
      if (auth.currentUser.uid != null) {
        try {
          const ref = await doc(db, 'users', auth.currentUser.uid)
          const got = await getDoc(ref)
          console.log(got.data())
          setData(got.data())
        } catch (e) {
          alert(e)
        }
      }
    }
    getUser()
  }, [])

  return (
    <div className="h-screen flex items-center justify-center">
      <div className='w-4/5 h-4/5 bg-white rounded-2xl shadow-xl'>
        <div className='m-10'>
        <h1 className='text-6xl font-eudoxusbold'>Edit Details</h1>
        <div className='gap-2 mt-10'>
            <div className='p-2 bg-gray-200 rounded-xl shadow-sm'>
              <h2 className='font-eudoxus'>Real Name: {data.realname != undefined || null || '' ? data.realname : null}</h2>
              <input type='text' placeholder={firstname} onChange={(e) => {setfirstname(e)}} className='p-2 bg-gray-100 rounded-lg' />
              <input type='text' placeholder={lastname} onChange={(e) => {setlastname(e)}} className='p-2 ml-2 bg-gray-100 rounded-lg' />
            </div>
            <div className='p-2 mt-3 bg-gray-200 rounded-xl shadow-sm'>
              <h2 className='font-eudoxus'>Bio: {data.bio != undefined || null || '' ? data.bio : 'Add One.'}</h2>
              <input type='text' placeholder={bio} onChange={(e) => {setbio(e)}} className='p-2 bg-gray-100 rounded-lg' />
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
