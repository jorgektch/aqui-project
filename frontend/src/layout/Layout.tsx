import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import { Outlet } from 'react-router-dom'

function layout( ) {
  return (
    <>
        <Header />
          <div className="container mx-auto min-h-screen w-full">
            <Outlet />
          </div>
        <Footer />

    </>
  )
}

export default layout