import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_USER } from '../utils/queries';
import { updateUser } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { React, useState, useEffect } from 'react';


const ProfileEdit = () => {
    const [email, setEmail] = useState('email');
    const [firstName, setFirstName] = useState('firstName');
    const [lastName, setLastName] = useState('lastName');
    const [bio, setBio] = useState('bio');

    const { username } = useParams();
    const { loading, error, data } = useQuery(GET_SINGLE_USER, {
        variables: { username: username },
    });
    const [profileUpdate] = useMutation(updateUser);

    useEffect(() => {
        if (data && data.singleUser) {
            setEmail(data.singleUser.email);
            setFirstName(data.singleUser.firstName);
            setLastName(data.singleUser.lastName);
            setBio(data.singleUser.bio);
          }
    }, [data])

    console.log(username)
    console.log(data)

    if (error) {
        console.log('error'+error)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get('email');
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const bio = formData.get('bio');
        try {
            const{ userData } = await profileUpdate({variables:{username, email,firstName,lastName, bio}});
            
            window.location.assign(`/profile/${username}`);
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return <h2>LOADING...</h2>;
    }



    return (
        <div>
            <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-5'>
                <p>email</p>
                <input name="email" type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                <p>first name</p>
                <input name="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} required />
                <p>last name</p>
                <input name="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => { setLastName(e.target.value) }} required />
                <p>bio</p>
                <input name="bio" type="text" placeholder='bio' value={bio? bio : 'Enter bio here'} onChange={(e) => { setBio(e.target.value) }} required/>
                <button className=' bg-cyan-600'type="submit">Update</button>
            </form>
        </div>
    )
}

export default ProfileEdit;