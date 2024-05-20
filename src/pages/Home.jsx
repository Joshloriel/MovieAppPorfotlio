import React, { useEffect } from 'react'
import Layout from '../layout/Layout'
import { Outlet } from 'react-router-dom'
import MovieList from './../Movie/MovieList'
import GXKbg from './../assets/gxkBG.jpeg'
import GxkLogo from './../assets/gxk.png'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Upcoming from '../Movie/Upcoming'
import TvShows from './../Movie/TvShows'

const Home = () => {



    return (
        <>
            <div className='Banner h-[85vh]'
            // style={{ backgroundImage: `url(${GXKbg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
            >
                <div className="movie">
                    <img src={GXKbg} alt="Banner" className='bgImg active' />
                </div>
                <div className="absolute md:w-[50%] z-10 h-[100%] px-4 top-0 left-0 flex flex-col justify-center items-center">
                    <div className=' px-10'>
                        <img src={GxkLogo} alt="" className='w-[30rem]' />
                        <div className="text-white text-lg mt-4">
                            <p>Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.
                            </p>
                            <div className="">
                                <button className='flex items-center justify-center m-2 px-3 rounded-md text-zinc-800 py-1 fw-medium hover:bg-slate-300 bg-slate-200' type='button'><PlayArrowIcon color="disable" fontSize='large' /> See Trailer</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
            <MovieList />
            <Upcoming />
            <TvShows />
        </>
    )
}

export default Home