import { useDispatch,useSelector } from 'react-redux';
import React,{useState,useEffect} from 'react';
import {genres} from '../assets/constants'
import { MusicCard } from '../components';
import { useGetTopChartsQuery } from '../API/ShazamCore';
const Home = () => {
    const dispatch = useDispatch();
    const {activeSong,isPlaying}= useSelector(state=>state.player);


    const {data,isFetching,error} = useGetTopChartsQuery();
    const genreTitle = "Pop";
    console.log(data);
    if(isFetching) return <div>Loading...</div>
    if(error) return <div>Error...</div>

    return (
    <div className='flex flex-col'>
        <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
            <h1 className='font-extrabold text-[25px]'>Top Music World</h1>
            <select onChange={()=>{}} value='' className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'>{genres.map((genre)=><option key={genre.value} value={genre.value
            }>{genre.title}</option>)}</select>


        </div>

        <div className='flex flex-wrap justify-center'> 
            {data?.map((song,i)=>(<MusicCard song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data} key={i}/>))}
            </div>
    </div>
    )
}
export default Home;