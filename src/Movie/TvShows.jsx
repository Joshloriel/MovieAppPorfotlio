import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Upcoming = () => {
    const [movies, setMovies] = useState([]); // Ensure proper initialization
    const [isLoading, setIsLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    const getMovieRequest = async () => {
        const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=c159ee7878e7f8810fe222cc22ca754e';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch movies'); // Error handling
            }
            const responseJson = await response.json();
            setMovies(responseJson.results); // Access 'results' key
        } catch (err) {
            setError(err.message); // Capture error message
        } finally {
            setIsLoading(false); // Loading is complete
        }
    };

    useEffect(() => {
        getMovieRequest(); // Fetch movies on component mount
    }, []); // Only run once on component mount

    if (isLoading) {
        return <div><p className='text-2xl'>Fetching data...</p></div>; // Display a loading message
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }
    console.log(movies)
    return (
        <div className="w-screen bg-zinc-900 pt-3">
            <p className='ms-5 text-3xl text-center text-white pt-1'>Popular Tv Shows</p>
            <Swiper
                className='h-[50vh] w-[90%]'
                effect={'coverflow'}
                navigation={true}
                centeredSlides={false}

                // pagination={{ el: '.swiper-pagination', clickable: true }}
                modules={[EffectCoverflow, Navigation]}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
                    640: { slidesPerView: 3, spaceBetween: 20 }, // Tablets
                    1024: { slidesPerView: 5, spaceBetween: 30 }, // Laptops
                }}
                coverflowEffect={
                    {
                        rotate: 0,
                        stretch: 0,
                        depth: 0,
                        modifier: 2.5
                    }
                }
            >
                {movies.map((item, index) => (
                    <SwiperSlide className=' flex h-[50vh] justify-center position-relative md:justify-start' key={index}>
                        <div>
                            <img
                                title={item.title} xz src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} // Use the correct image path
                                alt={item.title} // Provide an alt attribute
                                className='cursor-pointer hover:scale-105 duration-300 rounded-md w-[100%] h-[100%]' // Define the size of the poster
                            />
                        </div>
                        <div className='opacity-[0] duration-300 hover:opacity-100 bg-[rgba(0,0,0,0.7)] position-absolute flex flex-col justify-center items-center w-[100%] h-[100%] overflow-hidden top-0 start-0 end-0 bottom-0 p-3'>
                            <p className='text-white text-center oswald mb-2 font-medium text-3xl'>{item.title}</p>
                            <div className="flex">
                                <Link to={`watchtv/${item.id}`} className='bg-white p-3 rounded-full'><PlayArrowIcon />play</Link>
                            </div>

                        </div> {/* Use paragraph for consistent text display */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
};

const Series = () => {
    return (
        <></>
    );
}



export default Upcoming;
