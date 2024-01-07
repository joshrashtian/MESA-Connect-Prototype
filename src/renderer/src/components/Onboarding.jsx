import { useState, useEffect } from 'react'
import { auth, db } from '../../../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import Education from '../assets/icons/EducationIcon.png'
import PFP from './LearningLab/PFP'
import LoadingScreen from './LoadingScreen'

const Onboarding = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState()

  const [info, setInfo] = useState([{}])
  const [classes, setClasses] = useState()
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [bio, setbio] = useState('')
  const [major, setmajor] = useState('')
  const [ current, setcurrent] = useState(0)

  const options = [
    {
      title: 'Set Up Classes',
      icon: Education,
      prereq: function () {
        return data?.classes?.length > 0
      },
      comp: function () {
        return <h1>Hello!</h1>
      },
      length: 1,
    },
    {
      title: 'Set Up Talents and Interests',
      prereq: function () {
        return data?.talents?.length > 0
      },
      comp: function ({ change, selected }) {
        return <PFP nextSlide={() => {change()}} current={selected} />
      },
      length: 1,
    },
    {
      title: 'Set Up Profile Picture',
      prereq: function () {
        return data?.photoURL?.length > 0
      },
      comp: function ({ change, selected }) {
        return (
          <PFP nextSlide={() => {change()}} current={selected} />
        )
      },
      length: 2,
    }
  ]

  useEffect(() => {
    const getUser = async () => {
      if (auth.currentUser.uid != null) {
        try {
          const ref = await doc(db, 'users', auth.currentUser.uid)
          const got = await getDoc(ref)
          setData(got.data())
          await fetchInformation()
        } catch (e) {
          alert(e)
        }
      }
    }
    getUser()
  }, [])

  const fetchInformation = async () => {
    let dataMap = {
      hasMajor: false,
      hasClasses: false,
      hasTalents: false,
      hasPfP: false,
      hasAboutMe: false
    }

    if (!data) return
    if (data.major != 'TBA' && data.major) {
      dataMap.hasMajor = true
    }
    if (data.talents) dataMap.hasTalents = true
    if (data.photoURL) dataMap.hasPfP = true
    if (data.classes) dataMap.hasClasses = true
    await console.log(dataMap)
    await setInfo(dataMap)
    await setLoading(false)
  }

  if (loading) return <LoadingScreen />

  return (
    <motion.div
      initial={{ backgroundColor: '#DDD' }}
      animate={{ backgroundColor: '#ff9933' }}
      transition={{ delay: 0.2, duration: 1 }}
      className="h-screen flex flex-col justify-center p-14 duration-300 overflow-y-scroll no-scrollbar"
    >
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="text-white absolute top-16 font-eudoxusbold text-6xl"
      >
        Learning Lab
      </motion.h1>
      <motion.section className="h-2/3 rounded-3xl gap-4 flex flex-col ">
        {options.map((e) => {
          if (selected) {
            if (e.title === selected) {
              let length = e.length
              
              if(current === length) {
                setSelected()
                setcurrent(0)
              }

              return (
                <section className="bg-white h-full flex flex-col justify-between rounded-3xl p-10">
                  <div>
                  <e.comp selected={current} change={() => {setcurrent(current + 1)}} />
                  </div>
                  <div className='flex justify-center gap-2'>
                  {
                    Array.from(Array(length)).map((e, index) =>  (
                      <div className={`w-3 h-3 rounded-full ${index === current ? 'bg-orange-500' : "bg-gray-600" } `} />
                    ))
                  }
                  </div>
                </section>
              )
            }

            else return null
          }

          if (e.prereq() === false)
            return (
              <ul
                onClick={() => {
                  setSelected(e.title)
                }}
                className="p-3 bg-white w-2/3 h-1/6 rounded-full gap-5 cursor-pointer hover:scale-105 duration-300 flex items-center justify-center"
              >
                {e.icon && <img src={e.icon} className="w-14" />}
                <h1 className="text-black text-3xl font-eudoxus">{e.title}</h1>
              </ul>
            )
        })}
      </motion.section>
    </motion.div>
  )
}

export default Onboarding
