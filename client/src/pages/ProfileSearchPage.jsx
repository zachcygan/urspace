import React from 'react';
import { useParams } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import { SEARCH_PROFILES } from '../utils/queries';

const ProfileSearchPage = () => {
const {searchTerm} = useParams();
const {data,loading,error} = useQuery(SEARCH_PROFILES,{
    variables:{keyword:searchTerm},
});
console.log(data);
if(loading) return <h2>LOADING...</h2>;
if(error){
    console.error(error)
    return <h2>ERROR</h2>

}
return(
    <div className='flex flex-col'>

        <h1>Profiles</h1>
    </div>
)
};


export default ProfileSearchPage;