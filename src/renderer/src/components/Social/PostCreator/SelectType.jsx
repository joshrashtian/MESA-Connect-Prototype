import { useState } from "react"

const SelectType = ({ type, changeLocation }) => {
  const [value, setValue] = useState('placeholder')

  if(type === 'reg') return (
    <div className=' flex flex-col gap-2 mx-3'>
        <ul className=" flex gap-2 flex-nowrap overflow-x-auto">
        {
            locations.map(e => {
                return (
                <div onClick={() => {setValue(e); changeLocation(e) }} key={e} className={` cursor-pointer ${ e === value ? 'bg-slate-300' : 'bg-slate-100' } hover:bg-slate-400 duration-300 rounded-full p-2 w-full flex justify-center`}>
                    <h1 className=" font-eudoxus">{e}</h1>
                </div>
                ) 
            })
        }
        </ul>
        <h1 className='font-eudoxusbold text-xl text-slate-600'>Custom Location:</h1>
        <input placeholder={value} onChange={e => {changeLocation(e.target.value); setValue(e.target.value)}} className='w-full font-eudoxus rounded-full p-2 px-5 focus:outline-blue-500' />
    </div>
  )

  if(type === 'zoom') return (
    <div className=' flex flex-col gap-2 mx-3'>
        <h1 className='font-eudoxusbold text-xl text-slate-600'>Link:</h1>
        <input onChange={e => {changeLocation(e.target.value)}} className='w-full font-eudoxus rounded-full p-2 px-5 focus:outline-blue-500' />
    </div>
  )
}

export default SelectType

const locations = ['Valencia Campus', 'Canyon Country Campus', 'Aliso Hall']