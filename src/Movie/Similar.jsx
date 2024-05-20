import Loader from '../components/Loader';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Similar = ({ id }) => {
    const [similar, setSimilar] = useState([]); // State for similar movies
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    const getSimilarMovies = async () => {
        const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTU5ZWU3ODc4ZTdmODgxMGZlMjIyY2MyMmNhNzU0ZSIsInN1YiI6IjY2MTM0NmU5MDQ4NjM4MDE2MzE5OWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CdsBfhYiifQDhRWT0bL-GBfs6eMGgzGgA2Hmb72to7w',
                    accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`); // Throw an error for bad responses
            }

            const data = await response.json(); // Parse the JSON response
            setSimilar(data.results.slice(0, 12)); // Store only the first 12 similar movies
            setLoading(false); // Mark loading as complete
        } catch (err) {
            setError(err.message); // Capture and store error messages
            setLoading(false); // Mark loading as complete even on error
        }
    };

    useEffect(() => {
        getSimilarMovies(); // Fetch similar movies on component mount
    }, [id]); // Re-run if 'id' changes

    if (loading) {
        return <div>Loading...</div>; // Display loading message
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }
    return (
        <div className='my-5 mx-3 md:mx-5'>
            <p className='text-3xl mb-3 font-medum'>You may also like</p>
            <ul className="grid grid-cols-2 md:grid-cols-6  gap-2">

                {similar.map((movie) => (
                    <li key={movie.id} className="text-center">

                        <Link to={`/watch/${movie.id}`} className="position-relative h-[31vh] md:h-[37vh] flex flex-row">
                            {/* It's important to use key on the outermost element in map */}
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                className='position-absolute w-[100%] h-[100%]'
                                alt={`${movie.title} Poster`} // Improved alt text for accessibility
                            />
                            <div className='opacity-[0] duration-300 hover:opacity-100 bg-[rgba(0,0,0,0.8)] position-absolute w-[100%] h-[100%] overflow-hidden top-0 start-0 end-0 bottom-0'>
                                <span>{movie.title}</span>
                            </div> {/* Use paragraph for consistent text display */}
                        </Link>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default Similar;
