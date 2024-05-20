import React from 'react';
import { useLoaderData, json } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Loader, Slash } from 'lucide-react';
import VideocamIcon from '@mui/icons-material/Videocam';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Similar from '../Movie/Similar';
import BookmarkIcon from '@mui/icons-material/Bookmark';

// Loader to fetch movie details by ID
export const MovieLoader = async ({ params }) => {
    const { id } = params;
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c159ee7878e7f8810fe222cc22ca754e&language=en-US`); // Fetch movie data

    if (!response.ok) {
        throw new Error("Movie not found"); // Improved error handling
    }

    const data = await response.json(); // Parse the response
    return json(data); // Return the fetched data as JSON
};
// Component to display movie details
const Watch = () => {
    const movie = useLoaderData(); // Get the movie data from the loader

    if (!movie) {
        return <div>No movie data available</div>; // Fallback if no data
    }
    console.log(movie)
    return (
        <div className='flex flex-col items-center text-white bg-zinc-800'>
            {movie ? (
                <div className="w-[100vw] md:w-[90vw] min-h-[100vh] mt-16 bg-zinc-900 px-1 md:px-6">
                    <Breadcrumb className="m-3">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="hover:text-purple-900">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <Slash />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-zinc-400">{movie.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className='md:h-[60vh] flex justify-center w-[100%] text-white'>
                        <img
                            title={movie.title} xz src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} // Use the correct image path
                            alt={movie.title} // Provide an alt attribute
                            className='positon-absolute w-[100%] h-[100%]' // Define the size of the poster
                        />

                    </div>
                    <div className="flex flex-col md:flex-row mt-3 px-3">
                        {/* Poster Image */}
                        <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/default-poster.jpg'}
                            alt={`Poster for ${movie.title}`}
                            className={`w-48 bg-black m-auto hidden md:block`}
                        />

                        {/* Movie Details */}
                        <div className="flex-1 px-4">
                            <div className="mb-4 pt-3">
                                <p className="mb-2 text-5xl font-medium">{movie.title || 'Untitled'}</p>
                                <i className='text-zinc-400'>{movie.tagline ? `"${movie.tagline}"` : ""}</i>
                            </div>
                            <div className="flex mb-3">
                                <button className='py-1 px-2 bg-white rounded-sm me-2 text-zinc-800'> <VideocamIcon /> Trailer</button>
                                <button className='bg-yellow-400 py-1 px-2 rounded-sm text-zinc-800 me-2'><StarOutlinedIcon fontSize='small' /> {movie.vote_average}</button>
                                <button className='py-1 px-2 bg-white rounded-sm me-2 text-zinc-800'> <BookmarkIcon /> Add to Favorites</button>
                            </div>
                            <p className='w-[100%] md:w-[50vw]'>
                                <span className='font-medium'>Description:</span> {movie.overview || 'No description available.'}
                            </p>
                            <br />
                            <div className="grid grid-flow-col gap-4 leading-7">
                                {/* Left Column */}
                                <div>
                                    <p>
                                        <span className="font-medium">Release Date:</span> {movie.release_date ? movie.release_date : 'Unknown'}
                                    </p>
                                    <p>
                                        <span className="font-medium">Genre: </span>
                                        {movie.genres ? (
                                            movie.genres.map((genre, index, arr) => {
                                                const isLast = index === arr.length - 1;
                                                return (
                                                    <span key={index}>
                                                        {genre.name}
                                                        {!isLast && ', '}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            'Unknown'
                                        )}
                                    </p>

                                    {/* <p>
                                              <span className="font-medium">Casts:</span> {movie.casts ? movie.casts.join(', ') : 'Unknown'}
                                          </p> */}
                                </div>

                                {/* Right Column */}
                                <div>
                                    <p>
                                        <span className="font-medium">Duration:</span> {movie.runtime ? `${movie.runtime} minutes` : 'Unknown'}
                                    </p>
                                    <p>
                                        <span className="font-medium">Country: </span>
                                        {movie.production_countries ? (
                                            movie.production_countries.map((country, index, arr) => {
                                                const isLast = index === arr.length - 1;
                                                return (
                                                    <span key={index}>
                                                        {country.name}
                                                        {!isLast && ', '}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            'Unknown'
                                        )}
                                    </p>

                                    <p>
                                        <span className="font-medium capitalize">Language: </span> {movie.spoken_languages ? (
                                            movie.spoken_languages.map((language, index, arr) => {
                                                const isLast = index === arr.length - 1;
                                                return (
                                                    <span key={index}>
                                                        {language.name}
                                                        {!isLast && ', '}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            'Unknown'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Similar id={movie.id} />
                </div>
            ) : <Loader fontSize="large" />}

        </div>
    );
};

export default Watch;
