import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_USER, GET_ME, GET_SINGLE_USERS_POSTS, GET_SINGLE_USERS_SONGS } from '../utils/queries';
import Posts from '../components/Posts';
import SavedSongs from '../components/savedSongs';
import { UPLOAD_PROFILE_PICTURE, FOLLOW_USER, UNFOLLOW_USER } from '../utils/mutations';

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
    const [unfollowUser] = useMutation(UNFOLLOW_USER);
    const [followUser] = useMutation(FOLLOW_USER);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [followButton, setFollowButton] = useState('Follow');
    const [isFollowing, setIsFollowing] = useState(false);
    const urlString = `/profile/${username}/edit`;

    useEffect(() => {
        if (data) {
            setFollowers(data.singleUser.followers.length);
            setFollowing(data.singleUser.following.length);
        }
    }, [data]);
    console.log(data2)
    useEffect(() => {
        if (data2) {
            console.log('following',data2.me.following)
            console.log('followers',data2.me.followers)
            checkFollow();
        }
    }, [data2]);
        
    const checkFollow = () => {
        if (data && data2) {
            let following = false;
            data2.me.following.forEach(followee => {
                console.log(followee._id)
                if (followee._id == data.singleUser._id) {
                    following = true;
                } 
            });
            console.log(following)
            return following
        }
    }
    
    function FollowButton() {
        const followingUser = checkFollow();

        const handleFollowUser = async (e) => {
            try {
                e.preventDefault();
                const followedUser = await followUser({
                    variables: { username: username },
                });
                setFollowers(followers + 1);
                setFollowButton('Unfollow');
                setIsFollowing(true);
                return followedUser;
            } catch (err) {
                console.log(err);
            }
        }

        const handleUnfollowUser = async (e) => {
            try {
                e.preventDefault();
                const unfollowedUser = await unfollowUser({
                    variables: { username: username },
                });
                setFollowers(followers - 1);
                setFollowButton('Follow');
                setIsFollowing(false);
                return unfollowedUser;
            } catch (err) {
                console.log(err);
            }
        }

        
        return  (
            <button 
            onClick={isFollowing ? handleUnfollowUser : handleFollowUser} 
            className={`h-8 px-4 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-800 ${username === data2?.me?.username ? 'hidden' : 'flex'}`}
            >
                <p value={followButton}>{followButton}</p>
            </button>
        )
    } 

    console.log(username)
    if (error || error2 || error3 || error4) {
        console.log(error)
    }

    if (loading || loading2 || loading3 || loading4) {
        return <h2>LOADING...</h2>;
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
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
        <div className="mx-auto max-w-7xl sm:px-0 lg:px-8">

            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="container mx-auto sm:px-6 lg:px-8">
                <div className='rounded-lg bg-white shadow mt-10'>
                    <div className=''>
                        <img className='w-full h-60 object-cover object-bottom rounded-t-lg' src="/src/assets/landscape.png" alt="" />
                    </div>
                    <div className=''>
                        <img className='rounded-full w-24 h-24 lg:ml-32 ml-25 m-auto lg:w-40 lg:h-40 lg:-mt-24 -mt-14' src={data.singleUser.profileImage} alt="Placeholder" />
                        <div className='flex pt-5 font-bold text-2xl flex-col lg:flex-row lg:pr-5'>
                            <div className='m-auto lg:ml-36'>{data.singleUser.username}</div>
                            <div value={followers} className='m-auto lg:ml-28'><span className='text-4xl'>{followers}</span>Followers</div>
                            <div value={following} className='m-auto lg:ml-28'><span className='text-4xl'>{following}</span>Following</div>
                            <div className='m-auto lg:ml-28'><span className='text-4xl'>{data.singleUser.posts.length}</span>Posts</div>
                        </div>
                        <div className='text-lg pt-10 pl-10'>
                            {data.singleUser.bio}
                        </div>
                        <div className={`flex flex-col lg:flex-row lg:justify-between`}>
                            <div className='text-lg pt-10 pl-10 pb-10'>
                                Joined on {data.singleUser.creationDate}
                            </div>
                            <div className={`mt-10 flex-col lg:flex-row item-center pr-4 ${username === data2?.me?.username ? 'flex' : 'hidden'}`}>
                                {/* NEED TO CHECK CONTEXT TO SEE IF THE PERSON ON THE PAGE IS SAME USER TO VIEW/CLICK BUTTONS */}
                                <label className='px-1 mx-1 mb-2 h-8 p-0 flex item-center text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg cursor-pointer focus:shadow-outline hover:bg-indigo-800'>
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
                            <FollowButton />
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg bg-white shadow -mx-5 w-fit mt-10 ${data.singleUser.posts ? '' : 'hidden'}`}>
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