import React from 'react'
import { Outlet } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar/Navbar'

function App({ SoftwareRegistryService }) {
  return (
    <div>
      <Navbar SoftwareRegistryService={SoftwareRegistryService} />
      <Outlet />
    </div>
  )
}

export default App
