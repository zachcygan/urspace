
import {useSelector} from 'react-redux';
import { Link,Route,Routes} from 'react-router-dom';
// import {Footer,Likes,Comments,MusicCard,Navbar,Posts,SearchBar} from './components';
import {Footer,Likes,Comments,MusicCard,Navbar,Posts,Searchbar,Sidebar} from './components';
import MusicPlayer from './components/MusicPlayer';
import { Home, Login, Profile, MusicSearchField,CommunityPost } from './pages';

function App() {
  const {activeSong} = useSelector((state)=>state.player);


  return (
    <div className='relative flex'>
      <Sidebar />
      <header className='w-full flex justify-center items-center bg-white sm:px-8 px-4 py-4 border-b border-b-white'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/posts' element={<CommunityPost />} />
      </Routes>
      </header>
      
      {/* <Link to={'/'}>
        <h1 className='w-30 object-contain'>UrSpace</h1>
      </Link> */}
      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
      </div>
  )
}

export default App
