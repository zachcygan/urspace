import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

import {FiSearch} from 'react-icons/fi';
const SearchBar = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPath,setCurrentPath] = useState('');
    const location = useLocation();

    useEffect(()=>{
        setCurrentPath(window.location.pathname);
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(location.pathname.includes('/profile')) { // if the user is on a profile page
            navigate(`/profile/${searchTerm}`); // navigate to a profile with the username
        } else {
            navigate(`/search/${searchTerm}`); // search for the song
        }
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