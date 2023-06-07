import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import Posts from '../components/Posts';

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
    const { loading, error, data } = useQuery(GET_USERS);
    if (error) {
        console.log(error)
    }
    console.log(data)

    if (loading) {
        return <h2>LOADING...</h2>;
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
                        <img className='rounded-full w-24 h-24 ml-32 lg:w-40 lg:h-40 lg:-mt-24 -mt-14' src="/src/assets/coco.jpg" alt="" />
                        <div className='flex pt-5 font-bold text-2xl'>
                            <div className='ml-36'>zachcygan</div>
                            <div className='ml-28'><span className='text-4xl'>22</span>Followers</div>
                            <div className='ml-28'><span className='text-4xl'>623</span>Following</div>
                            <div className='ml-28'><span className='text-4xl'>54</span>Posts</div>
                        </div>
                        <div className='text-lg pt-10 pl-10'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id molestie purus, id consequat tel
                        </div>
                        <div className='text-lg pt-10 pl-10 pb-10'>
                            ACCOUNT CREATION DATE
                        </div>
                    </div>
                </div>
                
                <div className='rounded-lg bg-white shadow mt-10'>
                    <Posts />
                </div>
                
                <div className='rounded-lg bg-white shadow mt-10'>
                    
                </div>
            </div>
        </div>
    )
}
export default Profile;