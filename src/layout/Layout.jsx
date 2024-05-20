import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import BG from './../assets/bg.jpg'
import Footer from '../components/Footer'
const Layout = ({ children }) => {
    return (
        <div className='h-screen w-screen overflow-x-hidden'
        // style={{ backgroundImage: `url(${BG})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
        >
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout