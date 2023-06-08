import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { DetailsHeader, RelatedSongs } from '../components';
import {setActiveSong,playPause} from '../redux/features/playerSlice'
import { useGetSongDetailsQuery, useGetSongRelatedQuery} from '../API/ShazamCore';
const MusicPage = () => {
 const {songid,id:artistId} = useParams();
const dispatch = useDispatch();
const{activeSong,isPlaying} = useSelector((state)=>state.player);
const {data:songData,isFetching:isFetchingSongDetails} = useGetSongDetailsQuery({songid});

const {data,isFetching:isFetchingRelatedSongs,error} = useGetSongRelatedQuery({songid});
if(isFetchingSongDetails||isFetchingRelatedSongs) return <div>Loading...</div>
if(error) return <div>Error...</div>


const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

    return(
        <div className='flex flex-col'>
            <DetailsHeader artistId={artistId}songData={songData}/>

            <div className='mb-10'>
                <h2 className='text-white text-3xl font-bold'>
                    Lyrics:
                </h2>

                <div className='mt-5'>
                    <p className=''>
                        {songData?.sections[1].type==='LYRICS'?songData?.sections[1].text.map((line,i)=>(
                            <p className='text-gray-400 text-base my-1'>{line}</p>
                        )):<p className='text-gray-400 text-base my-1'>No Lyrics Found</p>}
                    </p>
                </div>


                

            </div>
            <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} artistId={artistId}handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} />
        </div>
    )
};

export default MusicPage;