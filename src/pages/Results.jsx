import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Results = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1&api_key=c159ee7878e7f8810fe222cc22ca754e`);
                const data = await response.json();
                setResults(data.results);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
            setLoading(false);
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query]);

    return (
        <div className="bg-zinc-800 px-4">
            <p className='text-3xl font-bold text-white pt-20 mb-3'> Results for "{query}"" </p>

            <div className='grid grid-cols-2 gap-2 md:grid-cols-6'>
                {results.map((item, index) => (
                    <div className='flex h-[30vh] md:h-[50vh] justify-center position-relative md:justify-start' key={index}>
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
                                <Link to={`/watch/${item.id}`} className='bg-white px-2 me-2 flex items-center rounded-full'><PlayArrowIcon fontSize='large' /></Link>
                                <button className='bg-white p-3 rounded-full'><BookmarkIcon /></button>
                            </div>

                        </div> {/* Use paragraph for consistent text display */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Results;
