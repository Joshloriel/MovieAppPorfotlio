import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ className }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        if (query) {
            navigate(`/results?query=${query}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={`${className}`}>
            <div className="flex flex-row ">
                <input
                    className="py-2 w-full md:w-[80%] rounded-s-lg px-2 text-zinc-800"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <button className='rounded-e-lg text-white bg-slate-800 hover:text-purple-600 hover:bg-slate-900 py-2 px-2' onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default Search;
