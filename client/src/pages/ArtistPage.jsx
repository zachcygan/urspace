import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import { useGetArtistDetailsQuery } from '../API/ShazamCore';
const ArtistPage = () => {
const {id:artistId} = useParams();
const {activeSong,isPlaying} = useSelector((state)=>state.player);

const{data,isFetching,error} = useGetArtistDetailsQuery(artistId);

if(isFetching) return <div>Loading...</div>
if(error) return <div>Error...</div>

return(
    <div className='flex flex-col'>
        <div className='relative w-full flex flex-col'>
                <div className='w-full bg-slate-200'>
                    <div className='absolute inset-0 flex items-center'>
                        <img src={artistId ? artistData?.attributes?.artwork?.url
            .replace('{w}', '500')
            .replace('{h}', '500')
            : songData?.images?.coverart} className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black '></img>
                    </div>

                </div>
        </div>
        
    </div>
)
};

export default ArtistPage;