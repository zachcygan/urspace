import React, { useState, useEffect } from 'react';
import { LIKE_POST, UNLIKE_POST } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

export default function Posts({ posts }) {
  const { loading, error, data } = useQuery(GET_ME);
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  // const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    if (data) {
      const me = data.me.likedPosts;
      console.log(me)
      setLikedPosts([...likedPosts, me]);
      console.log(likedPosts)
      
    }
  }, [data]);
  
 

  function LikeButton({ post }) {
    // const user = getAllLikedPosts();
    // let liked = false;
    // post.likes.forEach((like) => {
    //   if (like._id === user._id) {
    //     liked = true;
    //   }
    // });

    const handleLikePost = async (postId) => {
      try {
        const likedPost = await likePost({
          variables: { postId: postId },
        });
        // setLiked(true);
        setLikeCount(likeCount + 1);
        return likedPost;
      } catch (err) {
        console.log(err);
      }
    }

    // const handleUnlikePost = async (postId) => {
    //   try {
    //     const unlikedPost = await unlikePost({
    //       variables: { postId: postId },
    //     });
    //     // setLiked(false);
    //     setLikeCount(likeCount - 1);
    //     return unlikedPost;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    return (
      <button
        onClick={() => handleLikePost(post._id)}
        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
    )
  }

  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post._id} className='shadow rounded-lg'>
              <article className="flex flex-col items-start justify-between p-1">
                <div className="relative w-full">
                  <img
                    src={post.images}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a >
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img src={post.user.profileImage} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href={`/profile/${post.user.username}`}>
                          <span className="absolute inset-0" />
                          {post.user.username}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <div className='rounded-b-lg shadow pt-2'>
                <div className='border-t border-gray-600'>
                  <div className="-mt-px flex divide-x divide-gray-600">
                    <div className="flex w-0 flex-1">
                      <button
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                      </button>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      <LikeButton post={post} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
};
