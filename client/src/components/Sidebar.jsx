import {useState} from 'react';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

import { NavLink } from 'react-router-dom';

const links = [
    {
        name: 'Home',
        to: '/',
        icons: HiOutlineHome
    },
    {
    name: 'Posts',
    to: '/posts',
    icons: HiOutlineUserGroup
    },
    {
    name: 'Profile',
    to: '/profile',
    icons: HiOutlineMenu
    },
    {
        name: 'Login',
        to: '/login',
        icons: HiOutlineHashtag
    }
];

const NavLinks = ({handleClick})=>(
    <div className='mt-10'>
        {links.map((item)=>(
            <NavLink key={item.name} to={item.to} className='flex flex-row justify-start items-center my-8 text-sm font medium text-gray-400 hover:text-cyan-400' onClick={()=>handleClick&&handleClick()}>
                <item.icons />
                {item.name}
            </NavLink>
        ))}
    </div>
)
const Sidebar = () => {
    
    const [mobileMenu, setMobileMenu] = useState(false);
    // navlinks knows which link is active
    return(
        <div className='md: flex flex-col w-[240px] py-10 px-4 bg-[#191624]'>
            <h1 className=' text-gray-400 font-bold '>Urspace</h1>
            <NavLinks />
        </div>


    )
}

export default Sidebar;