import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';

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

    const stats = [
        { label: 'Followers', value: '44 million' },
        { label: 'Assets under holding', value: '$119 trillion' },
        { label: 'New users annually', value: '46,000' },
    ]


    return (
        <div className="bg-white py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className='flex justify-between'>    
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data?.users[0]?.username}</h2>
                        <img className='rounded-full' src="https://static.wikia.nocookie.net/muppet/images/5/5a/Elmo-elmo-elmo.jpg/revision/latest?cb=20110917000614" alt="" />
                    </div>
                    <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                        <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                            <p className="text-xl leading-8 text-gray-600">
                                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                                eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
                                Eleifend egestas fringilla sapien.
                            </p>
                            <p className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                                vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
                                erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                                semper sed amet vitae sed turpis id.
                            </p>
                        </div>
                        <div className="lg:flex lg:flex-auto lg:justify-center">
                            <dl className="w-64 space-y-8 xl:w-80">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                                        <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                                        <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;