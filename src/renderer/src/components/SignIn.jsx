import React from 'react'
import { useState } from 'react'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <div className="h-screen flex items-center justify-center ">
        <div className="bg-[#EEEEEE] w-3/5 h-3/5 rounded-2xl shadow-xl ">
          <div className="m-10">
            <h1 className="font-bold text-6xl">Let's get you Signed In.</h1>
            <div className="flex flex-col mt-6 mx-20">
              <input
                type="text"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className=" px-10 py-2 mt-2 rounded-lg shadow-sm bg-white"
              />
              <input
                type="text"
                placeholder="password"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className=" px-10 py-2 mt-1 rounded-lg shadow-sm bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
