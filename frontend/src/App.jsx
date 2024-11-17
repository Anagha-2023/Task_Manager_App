import React from 'react'
import {BrowserRouter as Router,Route,  Routes} from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/Navbat'

function App() {
  return (
    
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
