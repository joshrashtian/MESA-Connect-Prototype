import React from 'react'

export default function refactorName(name) {
  let copy = name.trim().split('')
  copy.map((a, index)=>{
    if(a === ' '){copy[index] = '_'}
  })
  let final = copy.join("")
  return final;
}
