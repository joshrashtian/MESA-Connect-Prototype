import React, { useEffect, useState } from 'react'
import NextButton from './NextButton'
import { interests, majors, shuffle } from '../functions'

const Talents = ({ nextSlide, current, previousSlide }) => {
    const [talents, setTalents] = useState([{}])
    const [majOptions, setmajOptions] = useState([])
    const [intOptions, setIntOptions] = useState([{}])
    const [userInterests, setUserInterests] = useState([{}])

    useEffect(() => {
        let a = majors
        setmajOptions(a.sort())
        displayInterests()
    }, [])

    const displayInterests = () => {
      let i;

      i = shuffle(interests)
    
      i = i.slice(0, 3)

      setIntOptions(i)
    }

    const addInterest = async (i) => {
      let interest = i;
      
      setUserInterests([...userInterests, interest])

      let replacement = intOptions
      intOptions.map((e, index) => { if(e === interest) { replacement.splice(index, 1)}  })
      console.log(replacement)
      await setIntOptions(replacement)
    }

    const removeInterest = async (i) => {
      let interest = i;

      setIntOptions([...intOptions, interest])

      let replacement = userInterests
      userInterests.map((e, index) => { if(e === interest) { replacement.splice(index, 1)}  })
      console.log(replacement)
      await setUserInterests(replacement)
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
        <p className="font-eudoxus mt-3">Before we pick your major, let's see what interests you.</p>
        <section className="flex flex-col justify-between">
          <ul className='flex gap-3'>
            {
                intOptions.map(interest => (
                    <div onClick={() => {addInterest(interest)}} className='p-2 bg-slate-100 rounded-full'>
                        <h1 className=' font-eudoxus'>{interest.title}</h1>
                    </div>
                ))
            }
            { 
                userInterests.map(interest => {
                  if(!interest.title) return
                  return (

                    <div onClick={() => {removeInterest(interest)}} className='p-2 bg-slate-300 rounded-full'>
                        <h1 className=' font-eudoxus'>{interest.title}</h1>
                    </div>
                )})
            }
            </ul>
            <NextButton
              text={'Exit'}
              conditionStyle={'bg-gray-300'}
              textStyle={'text-xl'}
              onPress={() => {
                previousSlide()
              }}
            />
        </section>
      </>
    )
}



  
export default Talents