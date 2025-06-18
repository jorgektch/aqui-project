import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './layout/layout'
import Carta from './pages/Carta'
import About from './pages/About'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        // add layout component here

        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="carta" element={<Carta />} />
          <Route path="nosotros" element={<About />} />
          {/* Add more routes here as needed */}
          {/* Example: <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
