import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './search';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"; // Ensure these imports are valid

const Genre = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getGenres = async () => {
        const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTU5ZWU3ODc4ZTdmODgxMGZlMjIyY2MyMmNhNzU0ZSIsInN1YiI6IjY2MTM0NmU5MDQ4NjM4MDE2MzE5OWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CdsBfhYiifQDhRWT0bL-GBfs6eMGgzGgA2Hmb72to7w',
                    accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            setGenres(data.genres);
            setLoading(false);
        } catch (err) {
            setError(`Failed to fetch genres: ${err.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        getGenres();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='w-[70vw] min-h-[20vh] px-4 py-4 bg-zinc-800'>
            <ul className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                {genres.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={`/genre/${item.id}`} // Redirect to genre page with genre ID
                            className='border-b-2 hover:bg-zinc-900 py-1 px-2 border-zinc-900 text-white hover:border-purple-600'
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Header = () => {
    const navList = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "Movies",
            link: "/movies", // Added '/' at the beginning for absolute paths
        },
        {
            title: "Tv Shows",
            link: "/series", // Same as above
        },
    ];

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <header className="text-zinc-100 px-2 w-[100vw] flex h-16 justify-between absolute z-20 py-3 items-center gap-5 bg-[rgba(0,0,0,0.5)] bg-opacity-20">
                <Link to="/" className="text-2xl font-medium tracking-widest">
                    MovieLor
                </Link>

                <NavigationMenu className="md:block hidden">
                    <NavigationMenuList className="flex-row gap-2 hidden md:flex">
                        {navList.map((list, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to={list.link}
                                        className="text-xl py-1 px-2 hover:text-purple-500 hover:border-b-4 border-purple-600"
                                    >
                                        {list.title}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="rounded-none bg-transparent text-xl te py-1 px-2 hover:text-purple-500 hover:border-b-4 border-purple-600">
                                Genre
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="w-[100vw]">
                                <Genre />
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <Search className="hidden md:block" />

                {/* Button to toggle sidebar */}
                <button className="md:hidden text-xl py-1 px-2" onClick={toggleSidebar}>
                    &#9776; {/* Hamburger icon */}
                </button>
            </header>

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 w-full h-[100vh] overflow-y-auto overflow-x-hidden z-20 bg-zinc-800 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button className="text-white p-4" onClick={closeSidebar}>
                    &#9776;
                </button><span className='text-white text-lg'>MovieLor</span>
                <Search />

                <div className="text-zinc-100 py-2">

                    <NavigationMenu className="flex flex-col">
                        <NavigationMenuList className="grid grid-cols-1">
                            {navList.map((list, index) => (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuLink asChild>
                                        <div className="w-[100vw] h-14 flex flex-col justify-start items-start">
                                            <Link
                                                to={list.link}
                                                className="text-xl py-1 w-[100%] px-2 ms-2 mb-5 hover:text-purple-500 hover:border-b-4 border-purple-600"
                                                onClick={closeSidebar}
                                            >
                                                {list.title}
                                            </Link>
                                        </div>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                        <NavigationMenuItem>
                            <div className='w-[100%] ms-1'>
                                <p>Genre</p>
                                <hr />
                                <Genre />
                            </div>

                        </NavigationMenuItem>
                    </NavigationMenu>

                </div>
            </div>
        </>
    );
};

export default Header;
