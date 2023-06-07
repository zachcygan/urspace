
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import dotenv from 'dotenv';
// dotenv.config();
// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'd70bb1b6e1mshe04c414a121c6dep153cc2jsn32fdffc7620f',
//       '\'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
//     }
//   };
  
//   fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

export const shazamCoreApi = createApi({
  reducerPath:'shazamCoreApi',
  baseQuery:fetchBaseQuery({
    baseUrl:'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders:(headers)=>{
      headers.set('X-RapidAPI-Key','d70bb1b6e1mshe04c414a121c6dep153cc2jsn32fdffc7620f');
      return headers;
      },
  }),
  endpoints:(builder)=>({
    getSongsByGenre:builder.query({query:(genre)=>`/charts/genre-world?genre_code=${genre}`}),
    getTopCharts:builder.query({query:()=>'/charts/world'}),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
  })
});
export const{
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongsBySearchQuery
}=shazamCoreApi;