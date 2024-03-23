import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './routes/Home/Home.jsx'
import HistoryList from './routes/History/components/HistoryList.jsx'
import Form from './routes/Form/Form.jsx'

import SoftwareRegistryService from './service/service.js'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

const softwareRegistry = new SoftwareRegistryService()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App SoftwareRegistryService={softwareRegistry} />,
    children: [
      {
        path: '/',
        element: <Home SoftwareRegistryService={softwareRegistry} />
      },
      {
        path: '/history',
        element: <HistoryList SoftwareRegistryService={softwareRegistry} />
      },
      {
        path: '/form',
        element: <Form SoftwareRegistryService={softwareRegistry} />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
