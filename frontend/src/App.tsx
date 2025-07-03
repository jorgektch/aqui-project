import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './layout/Layout.tsx'
import Carta from './pages/Carta'
import About from './pages/About'
import Order from './pages/Order.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import ProtectedRoute from './pages/ProtectedRoute.tsx'
import Perfil from './pages/Perfil.tsx'

import { AuthProvider } from './auth/AuthContext.tsx'
function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Navigate to='/home' />} />
              <Route path='home' element={<Home />} />
              <Route path="carta" element={<Carta />} />
              <Route path="nosotros" element={<About />} />
              
              <Route path='perfil' element={<Perfil />} />

              {/* Add more routes here as needed */}
              {/* Example: <Route path="about" element={<About />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
