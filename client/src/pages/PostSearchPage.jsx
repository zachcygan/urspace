import React from "react";
import { useParams } from "react-router-dom";
import {useQuery} from '@apollo/client';
import { Posts } from "../components";
import { SEARCH_POSTS } from "../utils/queries";
import {Loader} from '../components';
const PostSearchPage = () => {

    const {searchTerm} = useParams();
    const {data,loading,error} = useQuery(SEARCH_POSTS,{
        variables:{keyword:searchTerm},
    });
    console.log(data)
    if(loading) return <Loader/>;
    if(error){
        console.error(error)
        return <h2>ERROR</h2>
    }
   
    return(
        <div className="flex flex-col">
       
             
                    <Posts posts={data.searchPosts}/>
             
       
        </div>
    )
};

export default PostSearchPage;