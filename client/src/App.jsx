import { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link,Route,Routes} from 'react-router-dom';
// import {Footer,Likes,Comments,MusicCard,Navbar,Posts,SearchBar} from './components';
import {Footer,Likes,Comments,MusicCard,Navbar,Posts,Searchbar} from './components';
import { Home, Login, Profile, MusicSearchField } from './pages';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='relative flex'>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-white'></header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/music' element={<MusicSearchField />} />
      </Routes>
      <Link to={'/'}>
        <h1 className='w-30 object-contain'>UrSpace</h1>
      </Link>
      </div>
  )
}

export default App
