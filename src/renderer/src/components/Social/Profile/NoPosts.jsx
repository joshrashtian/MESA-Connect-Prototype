import React from 'react'

const NoPosts = ({ user }) => {
  return (
    <div>
        <h1 className='text-2xl font-eudoxus text-slate-600'>{user} has not made any posts.</h1>
    </div>
  )
}

export default NoPosts