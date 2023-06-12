import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { DetailsHeader, RelatedSongs } from '../components';
import {setActiveSong,playPause} from '../redux/features/playerSlice'
import {Loader} from '../components';
import { useGetSongDetailsQuery, useGetSongRelatedQuery} from '../API/ShazamCore';
const MusicPage = () => {
 const {songid,id:artistId} = useParams();
const dispatch = useDispatch();
const{activeSong,isPlaying} = useSelector((state)=>state.player);
const {data:songData,isFetching:isFetchingSongDetails} = useGetSongDetailsQuery({songid});

const {data,isFetching:isFetchingRelatedSongs,error} = useGetSongRelatedQuery({songid});
if(isFetchingSongDetails||isFetchingRelatedSongs) return <Loader/>;
if(error) return <div>Error...</div>


const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

    return(
        <div className='flex flex-col w-full mb-10 '>
            <DetailsHeader artistId={artistId}songData={songData}/>
            <div className='flex flex-row justify-between mt-10'>
            

               <div className=' w-full'> 
                <h2 className=' font-extrabold text-3xl '>
                    Lyrics:
                </h2>


                <div className='mt-5'>
                    <p className=''>
                        {songData?.sections[1].type==='LYRICS'?songData?.sections[1].text.map((line,i)=>(
                            <p className='text-black text-base my-1 font-semibold font-inter'>{line}</p>
                        )):<p className='text-black text-base my-1'>No Lyrics Found</p>}
                    </p>
                </div>
                </div>

                
            
            <div className='w-full'>
            <h1 className=' font-extrabold text-3xl'>Recommended Titles:</h1>
            <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} artistId={artistId}handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} />
            </div>                   
        
            </div>
        </div>
    )
};

export default MusicPage;