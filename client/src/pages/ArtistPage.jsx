import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, RelatedSongs,Loader } from '../components';

import { useGetArtistDetailsQuery } from '../API/ShazamCore';

const ArtistPage = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return <Loader />;

  if (error) return <div>Error...</div>;

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData?.data[0]}
      />

      <RelatedSongs
        data={artistData?.data[0].views['top-songs']?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistPage;
