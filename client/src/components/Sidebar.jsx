
import { useState } from 'react';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup, HiOutlineCash } from 'react-icons/hi';
import Loader from './Loader';
import { useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import auth from '../utils/auth';
import { useSelector,useDispatch } from 'react-redux';
import {showNotification} from '../redux/features/notificationSlice';
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
    name: 'Subscribe',
    to: '/donate',
    icons: HiOutlineCash
  },
  {
    name: auth.loggedIn() ? 'Logout' : 'Login',
    to: '/login',
    icons: HiOutlineHashtag
  },
];

const NavLinks = ({ data, handleClick }) => (
  <div className='mt-10'>
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={typeof item.to === 'function' ? item.to(data?.me?.username||'') : item.to}
        className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
        onClick={(e) => handleClick(e)}
      >
        <item.icons />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {

  const dispatch = useDispatch();
  const [mobileMenu, setMobileMenu] = useState(false);
  const { loading, error, data } = useQuery(GET_ME);
  // console.log(data);
  const handleClick = (e) => {
    // Define the logic for handling the click event here
    // For example, you can close the mobile menu if it's open
    if (mobileMenu) {
      setMobileMenu(false);
    }

    // If the user is clicking on the login/logout link, then we need to logout the user
    if (e.target.innerText === 'Logout') {
        auth.logout();

        dispatch(showNotification({
          message: 'Logout successful!',
          type: 'success'
        }));
        localStorage.setItem('notification',JSON.stringify({message: 'Logout successful!',
        type: 'success'}));
    }

    window.reload();
  };

  if (loading) {
    return <Loader />;
  } 

  const smallScreen = window.innerWidth <= 1020 

//   if (error) {
//     console.log(error);
//     return <div>Error occurred while fetching data</div>;
//   }

  return (
    <div className={`md:flex min-h-screen flex-col w-1/6 py-10 px-4 bg-[#191624] ${smallScreen ? 'hidden' : ''}`}>
      <h1 className='text-gray-400 font-bold'>Urspace</h1>
      {/* {data && } */}
      <NavLinks data={data} handleClick={handleClick} />
    </div>
  );
};

export default Sidebar;