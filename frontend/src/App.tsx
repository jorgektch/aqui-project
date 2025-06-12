import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './layout/layout'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        // add layout component here

        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          {/* Add more routes here as needed */}
          {/* Example: <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
