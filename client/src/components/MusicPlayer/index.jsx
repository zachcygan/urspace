import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation,useQuery } from '@apollo/client';
import { SAVE_MUSIC,DELETE_MUSIC } from '../../utils/mutations';
import {findUserMusic} from '../../utils/queries';
import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import { useApolloClient } from '@apollo/client';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import Loader from '../Loader';
import VolumeBar from './VolumeBar';
import { showNotification } from '../../redux/features/notificationSlice';
const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);


  // saveMusic with likes
  const client = useApolloClient();
  const{data:userData,error,loading} = useQuery(findUserMusic);
  const [saveMusic] = useMutation(SAVE_MUSIC);
  const [deleteMusic] = useMutation(DELETE_MUSIC);
  const [isSaved,setIsSaved] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (currentSongs&&currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const isSongSaved = (song) => {
  
    const songIsSaved = userData?.findUserMusic?.musics.some(music => music.key === song.key);
   
    return songIsSaved;
  };
  if(error){
    console.log(error);
  }
  if(loading){
    return <Loader/>;
  }
 


  // const handleSaveMusic=()=>{
  //   // saveMusic({variables:{
  //   //   title:activeSong.title,
  //   //   artist:activeSong.subtitle,
      
  //   //   url:activeSong.url,
  //   //   coverart:activeSong.images.coverart,
    
  //   // }});
    
  // }

  const handleSaveMusic =async() => {
    const userId = userData?.findUserMusic?._id;

    if(!isSaved){
      try{
        await saveMusic({variables:{
          userId,
          key:activeSong.key,
          title:activeSong.title,
          artist:activeSong.subtitle,
          url:activeSong.url,
          coverart:activeSong.images.coverart,
        }});
        setIsSaved(true);
        dispatch(showNotification({
          message: `${activeSong.title} is saved!`,
          type: 'success'
        }));
        localStorage.setItem('notification',JSON.stringify({message: `${activeSong.title} is saved!`,
        type: 'success'}));

      }catch(e){
        console.log(e);
      }
    }else{
      try{
        await deleteMusic({variables:{
          userId,
          title:activeSong.title,
        }});
        setIsSaved(false);
        dispatch(showNotification({
          message: `${activeSong.title} removed from saved!`,
          type: 'success'
        }));
        localStorage.setItem('notification',JSON.stringify({message: `${activeSong.title} removed from saved!`,
        type: 'success'}));
      }catch(e){
        console.log(e);
      }
    }
    await client.refetchQueries({ include: [findUserMusic] });
  };
  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
          handleSaveMusic={handleSaveMusic}
          isSaved={isSaved}
          isSongSaved={isSongSaved}
          activeSong={activeSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;
