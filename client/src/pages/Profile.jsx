import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { GET_USERS, GET_SINGLE_USER } from '../utils/queries';

import Posts from '../components/Posts';
import SavedSongs from '../components/savedSongs';
import { UPLOAD_PROFILE_PICTURE } from '../utils/mutations';

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
//   const [uploadProfilePicture] = useMutation(UPLOAD_PROFILE_PICTURE);
  const urlString = `/profile/${username}/edit`;


   
    console.log(data)
    if (error) {
        console.log('error'+error)
    }

    if (loading) {
        return <h2>LOADING...</h2>;
    } else {
        
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
                        <img className='rounded-full w-24 h-24 ml-32 lg:w-40 lg:h-40 lg:-mt-24 -mt-14' src={data.singleUser.profileImage} alt="Placeholder" />
                        <div className='flex pt-5 font-bold text-2xl'>
                            <div className='ml-36'>{data.singleUser.username}</div>
                            <div className='ml-28'><span className='text-4xl'>{data.singleUser.followers.length}</span>Followers</div>
                            <div className='ml-28'><span className='text-4xl'>{data.singleUser.following.length}</span>Following</div>
                            <div className='ml-28'><span className='text-4xl'>{data.singleUser.posts.length}</span>Posts</div>
                        </div>
                        <div className='text-lg pt-10 pl-10'>
                            {data.singleUser.bio}
                        </div>
                        <div className='flex justify-between'>
                            <div className='text-lg pt-10 pl-10 pb-10'>
                                Joined on {data.singleUser.creationDate}
                            </div>
                            <div className='mt-10 flex '>
                                {/* NEED TO CHECK CONTEXT TO SEE IF THE PERSON ON THE PAGE IS SAME USER TO VIEW/CLICK BUTTONS */}
                                <label className='block h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-800'>
                                    <input hidden type="file" className='absolute' accept=".png, .jpg, .jpeg"
                                        onChange={
                                            (e) => {
                                                uploadImage(e);
                                            }
                                        }
                                    />
                                    Upload Image
                                </label>
                                <button className='m-1 h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-800'>
                                    <a href={urlString}> Edit Profile</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='rounded-lg bg-white shadow mt-10'>
                    <Posts />
                </div>
                
                <div className='rounded-lg bg-white shadow mt-10'>
                    <SavedSongs />
                </div>
            </div>
        </div>
    )
}
export default Profile;