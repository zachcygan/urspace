import { useDispatch,useSelector } from 'react-redux';
import React,{useState,useEffect} from 'react';
import {useQuery} from '@apollo/client';

import {genres} from '../assets/constants'
import { MusicCard } from '../components';
import { useGetTopChartsQuery } from '../API/ShazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../API/ShazamCore';
const Home = () => {
    const dispatch = useDispatch();
    const {activeSong,isPlaying,genreListId}= useSelector(state=>state.player);


    const {data,isFetching,error} = useGetSongsByGenreQuery(genreListId||'POP');
    const genreTitle = genres.find(({value})=>value===genreListId)?.title;
    console.log(data);
    if(isFetching) return <div>Loading...</div>
    if(error) return <div>Error...</div>

    return (
    <div className='flex flex-col'>
        <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
            <h1 className='font-extrabold text-[25px]'>Top Music World</h1>
            <select onChange={(e)=>dispatch(selectGenreListId(e.target.value))} value={genreListId||'POP'} className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'>{genres.map((genre)=><option key={genre.value} value={genre.value
            }>{genre.title}</option>)}</select>


        </div>

        <div className='flex flex-wrap justify-center'> 
            {data?.map((song,i)=>(
            <MusicCard 
            song={song} 
            i={i}
             isPlaying={isPlaying} 
             activeSong={activeSong}
              data={data} 
              key={i}/>))}
            </div>
    </div>
    )
}
export default Home;