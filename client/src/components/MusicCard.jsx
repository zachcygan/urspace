// import React from 'react';
// import {Link} from 'react-router-dom';
// import {useDispatch} from 'react-redux';
// import PlayPause from './PlayPause';
// import {playPause, setActiveSong} from '../redux/features/playerSlice';
// const MusicCard =({song,i,isPlaying,activeSong,data})=>{
// // dispatch = to do something to the state
//    const dispatch = useDispatch();

//     const handlePauseClick=()=>{
//         // to actually make the songs play and pause
//         dispatch(playPause(false));
//     }
//     const handlePlayClick=()=>{
//         dispatch(setActiveSong({song,data,i}));
//         dispatch(playPause(true));
//     }
   
//     return(
//     <div className="flex flex-col w-[200px] px-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg curson-pointer" key={i}>
//         <div className='relative w-full h-56 group'>
//             <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title===song.title ? 'flex bg-black bg-opacity-70':'hidden'}`}>
//                 <PlayPause 
//                 song={song} 
//                 handlePause={handlePauseClick} 
//                 handlePlay={handlePlayClick}
//                 isPlaying={isPlaying}
//                 activeSong={activeSong}

//                 ></PlayPause>
//             </div>
//             <img src={song.images?.coverart} alt="songImage" className='w-full h-full object-cover rounded-lg' />
//         </div>
//         <div className='mt-4 flex flex-col'>
//             <p className='font-semibold text-lg  truncate'>
//                 <Link to={`/songs/${song?.key}`}>{song.title}</Link>
//             </p>
//             <p className='text-sm truncate  mt-1'>
//                 <Link to={song.artists?`/artists/${song?.artists[0].adamid}`:`/top-artists`}>{song.subtitle}</Link>
//             </p>
//         </div>
//     </div>
//     )
// }

    

// export default MusicCard;
import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PlayPause from './PlayPause';
import {playPause, setActiveSong} from '../redux/features/playerSlice';
import { motion } from 'framer-motion';

const MusicCard = ({song, i, isPlaying, activeSong, data}) => {
   const dispatch = useDispatch();

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = () => {
        dispatch(setActiveSong({song, data, i}));
        dispatch(playPause(true));
    }
   
    return (
        <motion.div 
            className="flex flex-col w-[200px] px-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.1, zIndex: 1 }} // Add a z-index to ensure hovered element is above others
        >
            <div className='relative w-full h-56 group'>
                <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
                    <PlayPause 
                        song={song} 
                        handlePause={handlePauseClick} 
                        handlePlay={handlePlayClick}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                    />
                </div>
                <img src={song.images?.coverart} alt="songImage" className='w-full h-full object-cover rounded-lg' />
            </div>
            <div className='mt-4 flex flex-col'>
                <p className='font-semibold text-lg  truncate'>
                    <Link to={`/songs/${song?.key}`}>{song.title}</Link>
                </p>
                <p className='text-sm truncate  mt-1'>
                    <Link to={song.artists ? `/artists/${song?.artists[0].adamid}` : `/top-artists`}>{song.subtitle}</Link>
                </p>
            </div>
        </motion.div>
    )
}

export default MusicCard;