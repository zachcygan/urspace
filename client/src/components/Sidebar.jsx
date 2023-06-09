
import { useState } from 'react';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { GET_ME } from '../utils/queries';

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
    to: (username) => `/profile/${username}`,
    icons: HiOutlineMenu
  },
  {
    name: 'Login',
    to: '/login',
    icons: HiOutlineHashtag
  }
];

const NavLinks = ({ data, handleClick }) => (
  <div className='mt-10'>
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={typeof item.to === 'function' ? item.to(data.me.username) : item.to}
        className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
        onClick={handleClick}
      >
        <item.icons />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { loading, error, data } = useQuery(GET_ME);

  const handleClick = () => {
    // Define the logic for handling the click event here
    // For example, you can close the mobile menu if it's open
    if (mobileMenu) {
      setMobileMenu(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <div className='md:flex flex-col w-[240px] py-10 px-4 bg-[#191624]'>
      <h1 className='text-gray-400 font-bold'>Urspace</h1>
      {data && <NavLinks data={data} handleClick={handleClick} />}
    </div>
  );
};

export default Sidebar;