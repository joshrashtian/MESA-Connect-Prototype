import React from 'react'
import NextButton from './NextButton'

const PFP = ({current, nextSlide}) => {

  console.log(current)
  if(current === 0) return (
    <>
    <h1 className=' font-eudoxusbold text-3xl'>Profile Picture</h1>
    <p className='font-eudoxus'>Having a profile picture to express yourself is a critical part of any Social Sharing Platform!</p>
    <NextButton style={`mt-5`} onPress={() => {nextSlide()}} />
    </>
  )

  if(current === 1) return (
    <h1 onClick={() => {console.log('Clicked'), nextSlide()}} className=' font-eudoxusbold text-3xl'>PFP!</h1>
  )
}

export default PFP