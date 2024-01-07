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
  const [current, setcurrent] = useState(0)

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
      length: 4
    },
    {
      title: 'Set Up Talents and Interests',
      prereq: function () {
        return data?.talents?.length > 0
      },
      comp: function ({ change, selected }) {
        return (
          <PFP
            nextSlide={() => {
              change()
            }}
            current={selected}
          />
        )
      },
      length: 1
    },
    {
      title: 'Set Up Profile Picture',
      prereq: function () {
        return data?.photoURL?.length > 0
      },
      comp: function ({ change, selected }) {
        return (
          <PFP
            nextSlide={() => {
              change()
            }}
            current={selected}
          />
        )
      },
      length: 2
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
      <motion.ul
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="flex justify-between items-center absolute w-5/6 top-16 "
      >
        <motion.h1 className="text-white  font-eudoxusbold text-6xl">
          Learning Lab
        </motion.h1>
        <div>
          <motion.img
            src={auth.currentUser?.photoURL ? auth.currentUser.photoURL : Education}
            className="w-16 h-16 rounded-full"
          />
        </div>
      </motion.ul>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="h-2/3 rounded-3xl gap-2 flex flex-col bg-orange-500 "
      >
        {!selected && (
          <h1 className="text-white m-5 mb-2 font-jet text-xl capitalize">
            LET'S LEARN ABOUT YOU ---------{' '}
          </h1>
        )}
        {options.map((e, i) => {
          if (selected) {
            if (e.title === selected) {
              let length = e.length

              if (current === length) {
                setSelected()
                setcurrent(0)
                fetchInformation()
              }

              return (
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white h-full flex flex-col justify-between rounded-3xl p-10"
                >
                  <div>
                    <e.comp
                      selected={current}
                      change={() => {
                        setcurrent(current + 1)
                      }}
                    />
                  </div>
                  <div className="flex justify-center gap-2">
                    {Array.from(Array(length)).map((e, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full duration-300 ${
                          index === current ? 'bg-orange-500' : 'bg-gray-600'
                        } `}
                      />
                    ))}
                  </div>
                </motion.section>
              )
            } else return null
          }

          if (e.prereq() === false)
            return (
              <motion.ul
                key={e.title}
                onClick={() => {
                  setSelected(e.title)
                }}
                initial={{ x: -10 * (i % 2), opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i + 2.5, duration: 0.5 }}
                className="ml-5 p-1 bg-white hover:bg-slate-100 w-[40%] h-16 rounded-xl gap-5 cursor-pointer hover:scale-110 duration-300 flex items-center justify-center"
              >
                {e.icon && <img src={e.icon} className="w-12" />}
                <h1 className="text-black text-2xl font-eudoxus">{e.title}</h1>
              </motion.ul>
            )
        })}
      </motion.section>
    </motion.div>
  )
}

export default Onboarding
