import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './layout/Layout.tsx'
import Carta from './pages/Carta'
import About from './pages/About'
import Order from './pages/Order.tsx'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        // add layout component here

        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="carta" element={<Carta />} />
          <Route path="nosotros" element={<About />} />
          <Route path='ordenar-menu' element={<Order />} />
          {/* Add more routes here as needed */}
          {/* Example: <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
