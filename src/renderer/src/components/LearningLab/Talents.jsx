import React, { useEffect, useState } from 'react'
import NextButton from './NextButton'
import { allTalents, interests, majors, shuffle } from '../functions'
import { auth, db } from '../../../../../firebase'
import Sumbitting from '../Social/PostCreator/Sumbitting'
import { doc, setDoc } from 'firebase/firestore'

const Talents = ({ nextSlide, current, previousSlide }) => {
    const [talents, setTalents] = useState([])
    const [majOptions, setmajOptions] = useState([])
    const [talentsOptions, setTalentOptions] = useState([])
    const [intOptions, setIntOptions] = useState([])
    const [userInterests, setUserInterests] = useState([])
    const [submitting, setSubmitting] = useState(false)

    const [loading, setLoading] = useState(true)
    useEffect(() => {

        let a = majors
        let b = [...allTalents]

        setmajOptions(a.sort())
        setTalents(b)
        displayInterests()
      
        if(current === 2){

        }
    }, [])

    const displayInterests = () => {
      let i;

      i = shuffle(interests)
    
      i = i.slice(0, 7)

      setIntOptions(i)
    }

    const changeTalentsToUser = async () => {
      setSubmitting(true)
      try{
      const ref = doc(db, 'users', auth.currentUser.uid)
      setDoc(ref, { interests: [...userInterests],talents: [...talentsOptions] }, { merge: true })
      setSubmitting(false)
      nextSlide()
    } catch (err) {
        console.error(err)
        setSubmitting(false)
      }
    }

    const addInterest = async (i) => {
      let interest = i;
      
      setUserInterests([...userInterests, interest])

      let replacement = intOptions
      intOptions.map((e, index) => { if(e === interest) { replacement.splice(index, 1)}  })
      
      await setIntOptions(replacement)
    }

    const removeInterest = async (i) => {
      let interest = i;

      setIntOptions([...intOptions, interest])

      let replacement = userInterests
      userInterests.map((e, index) => { if(e === interest) { replacement.splice(index, 1)}  })
      
      await setUserInterests(replacement)
    }

    const addTalents = async (i) => {
      let interest = i;
      
      console.log(talentsOptions)
      setTalentOptions([...talentsOptions, interest])

      let replacement = talents
      talents.map((e, index) => { if(e === interest) { replacement.splice(index, 1)}  })
      
      await setTalents(replacement)
    }

    const removeTalents = async (i) => {
      let interest = i;

      setTalents([...talents, interest])

      let replacement = talentsOptions
      talentsOptions.map((e, index) => { if(e === interest) { replacement.splice(index, 1)}  })
      
      await setTalentOptions(replacement)
    }

    if (current === 0)
    return (
      <>
        <h1 className=" font-eudoxusbold text-3xl">Talents / Interests</h1>
        <p className="font-eudoxus mt-3">
          Talents and Interests are important in College! Showing off what you are interested in and what you want to explore more of can not only improve performance in College, but make it a more fun and fresh!
        </p>
        <p className="font-eudoxus mt-5">
          Grabbing more 
        </p>
        <NextButton
          style={`mt-5`}
          textStyle={'text-xl'}
          onPress={() => {
            nextSlide()
          }}
        />
      </>
    )

  if (current === 1)
    return (
      <>
        <h1 className=" font-eudoxusbold text-3xl">First off, let's pick your Interests</h1>
        <p className="font-eudoxus mt-3 text-xl mb-3">Before we pick your major, let's see what interests you.</p>
        <section className="flex flex-col gap-5 justify-between">
          <ul className='flex gap-3'>
            {
                intOptions.map(interest => (
                    <div onClick={() => {addInterest(interest)}} className='p-2 bg-slate-100 hover:bg-slate-200 cursor-pointer duration-300 rounded-full'>
                        <h1 className=' font-eudoxus'>{interest.title}</h1>
                    </div>
                ))
            }
            { 
                userInterests.map(interest => {
                  if(!interest.title) return
                  return (

                    <div onClick={() => {removeInterest(interest)}} className='p-2 bg-slate-300 hover:bg-slate-400 cursor-pointer duration-300 rounded-full'>
                        <h1 className=' font-eudoxus'>{interest.title}</h1>
                    </div>
                )})
            }
            </ul>
            { userInterests.length > 1 &&
            <ul className='flex flex-col gap-3'>
            <p className="font-eudoxus text-xl mt-3">then, we can pick some talents that suit you.</p>
            <ul className='flex gap-3'>
            {
              talents &&
                talents.map(talent => (
                    <div onClick={() => {addTalents(talent)}} className='p-2 bg-slate-100 hover:bg-slate-200 cursor-pointer duration-300 rounded-full'>
                        <h1 className=' font-eudoxus'>{talent}</h1>
                    </div>
                ))
            }{ 
              talentsOptions.map(talent => {
                return (
                  <div onClick={() => {removeTalents(talent)}} className='p-2 bg-slate-300 hover:bg-slate-400 cursor-pointer duration-300 rounded-full'>
                      <h1 className=' font-eudoxus'>{talent}</h1>
                  </div>
              )})
            }
            </ul>
            </ul>
            }
            <ul className='flex gap-2 justify-center mt-4 items-center'>
            { !submitting ?
            <>
            <NextButton
              text={''}
              conditionStyle={'bg-gray-300'}
              condition={userInterests.length > 2 && talentsOptions.length > 1}
              textStyle={'text-xl'}
              onPress={() => {
                changeTalentsToUser()
              }}
            />
            <NextButton
              text={'Exit'}
              conditionStyle={'bg-gray-300'}
              textStyle={'text-xl'}
              onPress={() => {
                previousSlide()
              }}
            />
            </>
            : <div><Sumbitting /></div>}
            </ul>
        </section>
      </>
    )
    if (current === 2)
    return (
      <>
        <h1 className=" font-eudoxusbold text-3xl">Interests and Talents Selected!</h1>
        <p className="font-eudoxus mt-3">You now have interests and talents set up on your profile!</p>
        <section className="flex flex-col justify-between">
          
            <ul className='flex gap-2 justify-center mt-4 items-center'>
            <NextButton
              text={'Exit'}
              conditionStyle={'bg-gray-300'}
              textStyle={'text-xl'}
              onPress={() => {
                next()
              }}
            />
            </ul>
        </section>
      </>
    )
}



  
export default Talents