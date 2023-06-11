import React, { useState, useEffect } from 'react';
import { LIKE_POST, UNLIKE_POST } from '../utils/mutations';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

export default function Posts({ posts, handleLike }) {
  const { loading, error, data } = useQuery(GET_ME);
  // const [likePost] = useMutation(LIKE_POST,{
  //   refetchQueries: [{ query: GET_ME }],
  // });
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [{ query: GET_ME }],
    update(cache, { data: { likePost } }) {
      cache.modify({
        id: cache.identify(likePost),
        fields: {
          likes(existingLikes = []) {
            const newLikeRef = cache.writeFragment({
              data: likePost.likes[likePost.likes.length - 1],
              fragment: gql`
                fragment NewLike on User {
                  id
                }
              `
            });
            return [...existingLikes, newLikeRef];
          }
        }
      });
    },
  });
  const [unlikePost] = useMutation(UNLIKE_POST);
  // const [liked, setLiked] = useState(false);

  const [usersLikedPosts, setusersLikedPosts] = useState([]);

  useEffect(() => {
    if (data) {
      const me = data.me.likedPosts;
      console.log(me)
      console.log("liked Posts " + me);
      const likedPostIds = data?.me?.likedPosts?.map(post => post._id);

      // setusersLikedPosts([...usersLikedPosts, me]);
      setusersLikedPosts(likedPostIds)
      console.log(usersLikedPosts)

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
      if (usersLikedPosts.includes(postId)) {
        console.log('User has already liked');
        return;
      }
      try {
        const likedPost = await likePost({
          variables: { postId: postId },
        });
        console.log(likedPost);
        // setLiked(true);
        setusersLikedPosts([...usersLikedPosts, postId]);
        return likedPost;
      } catch (err) {
        console.log(err);
      }
      // handleLike(postId);
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
    <div className="bg-white py-1 sm:py-32">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post._id} className='shadow rounded-lg'>
              <article className="flex flex-col justify-between p-1">
                <div className="relative w-full">
                  {post.images ?
                    <img
                      src={post.images}
                      alt=""
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    /> : null}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl">
                  {post.selectedMusic ?
                    <div className='flex p-1'>
                      <img src={post?.selectedMusic?.coverart} alt="music cover" className='w-20 h-30'></img>
                      <div className='align-middle '>
                        <h2 className='p-1 font-bold'>{post?.selectedMusic?.artist}</h2>
                        <h2 className='p-1 font-bold'>{post?.selectedMusic?.title}</h2>
                      </div>
                    </div> : null}
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a >
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                  </div>
                  <div className='flex flex-row justify-between'>
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
                    <div className='mt-10 flex flex-row'>
                      <div className='likes-comments flex'>
                        <div className='flex'>{post?.likes?.length}<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-suit-heart like mr-4 ml-2" viewBox="0 0 16 16">
                          <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                        </svg></div>
                        <div className='flex'>{post?.comments?.length}<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-chat-dots comment ml-2" viewBox="0 0 16 16">
                          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                        </svg></div>
                      </div>
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
