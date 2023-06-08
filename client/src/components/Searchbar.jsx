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
    <form onSubmit={handleSubmit} autoComplete='off' className=' '>
        <label htmlFor='search' className='sr-only'>Search</label>
        <div className='flex flex-row justify-start items-center'>

            <FiSearch className='w-5 h-5 ml-4'size='24px'/>
            <input name='search-field' autoComplete='off' id='search-field' placeholder='Search' type='search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            >

            </input>
        </div>
    </form>

    )
}
export default SearchBar;