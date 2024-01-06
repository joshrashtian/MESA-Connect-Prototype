import React, { useEffect, useState } from 'react'
import { globalSettings } from '../Settings'

const Settings = () => {

  const [settings, setSettings] = useState({})

  useEffect(() => {
    setSettings(globalSettings.getData())
  }, [])
  
  return (
    <div className='h-screen'>
      <h1 className='m-16 mb-4 font-eudoxusbold text-6xl'>
        Settings
      </h1>
      <h1>
        {settings.mode}
      </h1>
    </div>
    
  )
}

export default Settings