import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import {FiSearch} from 'react-icons/fi';
const SearchBar = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    }

    return (
    <form onSubmit={handleSubmit} autoComplete='off' className=' bg-gray-300 p-2 text-gray-400 focus-within:text-gray-600 rounded-lg'>
        <label htmlFor='search' className='sr-only'>Search</label>
        <div className='flex flex-row justify-start items-center'>

            <FiSearch className='w-5 h-5 ml-4'size='24px'/>
            <input name='search-field' autoComplete='off' id='search-field' placeholder='Search' type='search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='flex-1 bg-transparent  border-none outline-none placeholder-gray-400 text-base text-white p-4'
            >

            </input>
        </div>
    </form>

    )
}
export default SearchBar;