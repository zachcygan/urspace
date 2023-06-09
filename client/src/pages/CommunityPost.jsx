import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../utils/queries'

import {AiFillLike} from 'react-icons/ai';
import {BiCommentDetail,BiRepost} from 'react-icons/bi';
import {GrFavorite} from 'react-icons/gr';
import { GET_USERS } from '../utils/queries';
const CommunityPost = () => {

  
        

  const { loading, error,data } = useQuery(GET_POSTS);
   

  if(loading) return (<p>loading</p>)
 if(error){
    console.log(error)
    return<p>error</p>
 } 
 if(!data||!data.posts) return (<p>no post found</p>)
  // console.log(postData);
  const postData = data.posts;
  console.log(postData);
  return (
    <div className=' flex flex-col'>
      <div className='w-full flex justify-between items-center bg-white'>
        <h1 className='font-extrabold text-[32px]'>Community</h1>
        <Link to='/createpost' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create Post</Link>
      </div>


      {postData.map((post) => {
        return (
          <div key={post._id} className=" bg-gray-100 p-4">
            <div className="bg-white border rounded-sm max-w-md">
              <div className="flex items-center px-4 py-3">
                <img className="h-8 w-8 rounded-full" src={post.user.profileImage} />
                <div className="ml-3 ">
                  <span className="text-sm font-semibold antialiased block leading-tight">{post.user.username}</span>

                </div>
              </div>
              <div className="text-md px-4 py-3">
                <p className="font-bold ">{post.title}</p>
              </div>
              <img src={post.images} />
              <div className="text-sm px-4 py-3">
                <p className="text-gray-900 leading-none">{post.description}</p>
              </div>
              <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                <div className="flex gap-5">

                  <AiFillLike size='24px' />
                  <BiCommentDetail size='24px' />
                  <BiRepost size='24px' />
                </div>
                <GrFavorite size='24px' />
              </div>
              <div className="font-semibold text-sm mx-4 mt-2 mb-4">{post.likes + ' Likes'}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default CommunityPost;