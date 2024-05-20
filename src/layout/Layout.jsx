import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import BG from './../assets/bg.jpg'
import Footer from '../components/Footer'
const Layout = ({ children }) => {
    return (
        <div className='h-[100%] w-[100vw]'
        // style={{ backgroundImage: `url(${BG})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
        >
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout