import React,{useState,useEffect} from 'react';
import cool from '../assets/cool.jpg';
import profile from '../assets/profile.jpg';
import andrew from '../assets/andrew.jpg';
import League from '../assets/League.jpg';

import {AiFillLike} from 'react-icons/ai';
import {BiCommentDetail,BiRepost} from 'react-icons/bi';
import {GrFavorite} from 'react-icons/gr';

const CommunityPost = () => {
    const templatePost =   [
        {
            title:'I like peanuts',
            description:'I really enjoy peanuts byut I am allergic to them butasdasdadqweqwslfjaskld',
            likes:512,
            comments:5,
            user: "John Doe",
            image: cool,
            profile: profile,
            location:'Irvine, CA'
        },
        {
            title:'I hate league of legends',
            description:'Absolute dogshit game wasdhjalsfjsaldfjasdhfalsdf;asdhfashjf',
            likes:912312,
            comments:123123,
            user: "Andrew Tate",
            image: League,
            profile: andrew,
            location:'Austin, Texas'
        },
    ];

    
    return(
        <div className='flex flex-col'>
        {templatePost.map((post)=>{
            return(
        <div className=" bg-gray-100 p-4 ">
        <div className="bg-white border rounded-sm max-w-md">
          <div className="flex items-center px-4 py-3">
            <img className="h-8 w-8 rounded-full" src={post.profile}/>
            <div className="ml-3 ">
              <span className="text-sm font-semibold antialiased block leading-tight">{post.user}</span>
              <span className="text-gray-600 text-xs block">{post.location}</span>
            </div>
          </div>
          <img src={post.image}/>
          <div classNameName="flex items-center justify-between mx-4 mt-3 mb-2">
            <div className="flex gap-5">
            
              <AiFillLike size='24px'/>
              <BiCommentDetail size='24px'/>
            <BiRepost size='24px'/>
            </div>
            <GrFavorite size='24px'/>
          </div>
          <div className="font-semibold text-sm mx-4 mt-2 mb-4">{post.likes+' Likes'}</div>
        </div>
      </div>
            )
            })}
            </div>
    )
}
export default CommunityPost;