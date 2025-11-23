import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Journal from './pages/Journal.jsx'
import Login from './pages/Login.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/journal' element={<Journal/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
