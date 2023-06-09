import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_USER, GET_ME, GET_SINGLE_USERS_POSTS, GET_SINGLE_USERS_SONGS } from '../utils/queries';
import Posts from '../components/Posts';
import SavedSongs from '../components/savedSongs';
import { UPLOAD_PROFILE_PICTURE, FOLLOW_USER } from '../utils/mutations';

const uploadToCloudinary = async (file) => {
    const url = 'https://api.cloudinary.com/v1_1/dk5mamh4v/upload';

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'qe6d0r4x');

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    })
    if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.url;
    } else {
        console.error('Upload Failed');
        return null;
    }
};


const Profile = () => {

    const { username } = useParams();
    const { loading, error, data } = useQuery(GET_SINGLE_USER, {
        variables: { username: username },
    });
    const { loading: loading2, error: error2, data: data2 } = useQuery(GET_ME);

    const { loading: loading3, error: error3, data: data3 } = useQuery(GET_SINGLE_USERS_POSTS, {
        variables: { username: username },
    });
    const { loading: loading4, error: error4, data: data4 } = useQuery(GET_SINGLE_USERS_SONGS, {
        variables: { username: username },
    });
    const [uploadProfilePicture] = useMutation(UPLOAD_PROFILE_PICTURE);
    const [followUser] = useMutation(FOLLOW_USER);
    const urlString = `/profile/${username}/edit`;

    console.log(data4)
    if (error) {
        console.log('error' + error)
    }

    if (loading || loading2 || loading3 || loading4) {
        return <h2>LOADING...</h2>;
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        // const url = await uploadToCloudinary(file);
        console.log(file);
        if (file.type == 'image/jpeg' || file.type == 'image/png') {
            let response = await uploadToCloudinary(file);


            uploadProfilePicture({
                variables: {
                    profileImage: response,
                    username: username,
                },
            });

            window.location.reload();
        } else {
            console.log('not an image');
        }
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-0 lg:px-8">

            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="container mx-auto sm:px-6 lg:px-8">{/* Content goes here */}
                <div className='rounded-lg bg-white shadow mt-10'>
                    <div className=''>
                        <img className='w-full h-60 object-cover object-bottom rounded-t-lg' src="/src/assets/landscape.png" alt="" />
                    </div>
                    <div className=''>
                        <img className='rounded-full w-24 h-24 lg:ml-32 ml-25 m-auto lg:w-40 lg:h-40 lg:-mt-24 -mt-14' src={data.singleUser.profileImage} alt="Placeholder" />
                        <div className='flex pt-5 font-bold text-2xl flex-col lg:flex-row'>
                            <div className='m-auto lg:ml-36'>{data.singleUser.username}</div>
                            <div className='m-auto lg:ml-28'><span className='text-4xl'>{data.singleUser.followers.length}</span>Followers</div>
                            <div className='m-auto lg:ml-28'><span className='text-4xl'>{data.singleUser.following.length}</span>Following</div>
                            <div className='m-auto lg:ml-28'><span className='text-4xl'>{data.singleUser.posts.length}</span>Posts</div>
                        </div>
                        <div className='text-lg pt-10 pl-10'>
                            {data.singleUser.bio}
                        </div>
                        <div className={`justify-between flex-col lg:flex-row`}>
                            <div className='text-lg pt-10 pl-10 pb-10'>
                                Joined on {data.singleUser.creationDate}
                            </div>
                            <div className={`mt-10 flex flex-col lg:flex-row item-center  ${username === data2.me.username ? 'flex' : 'hidden'}`}>
                                {/* NEED TO CHECK CONTEXT TO SEE IF THE PERSON ON THE PAGE IS SAME USER TO VIEW/CLICK BUTTONS */}
                                <label className='m-1 h-8 p-0 flex item-center text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-800'>
                                    <p className='m-auto'>Upload Image</p>
                                    <input hidden type="file" className='' accept=".png, .jpg, .jpeg"
                                        onChange={
                                            (e) => {
                                                uploadImage(e);
                                            }
                                        }
                                    />
                                </label>
                                <button className='https://fullerton.zoom.us/j/9962061673m-1 h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-800'>
                                    <a href={urlString}> Edit Profile</a>
                                </button>
                                
                            </div>
                            <button onClick={followUser} className={`https://fullerton.zoom.us/j/9962061673m-1 h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-800 ${username === data2.me.username ? 'hidden' : 'flex'}`}>
                                    Follow
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg bg-white shadow mt-10 ${data.singleUser.posts ? '' : 'hidden'}`}>
                    <div>
                        <div className='flex justify-center'>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:mt-5">Posts</h2>
                        </div>
                        <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-5 sm:pt-5"></div>
                    </div>
                    <Posts posts={data3.getUsersPosts} />
                </div>

                <div className='rounded-lg bg-white shadow mt-10'>
                    <SavedSongs songs={data4.getUsersSongs}/>
                </div>
            </div>
        </div>
    )
}
export default Profile;