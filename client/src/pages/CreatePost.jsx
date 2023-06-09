import {React , useState} from 'react';
import {useMutation} from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';
import  {GET_POSTS } from '../utils/queries';
const CreatePost = () => {
    // const [user,setUser] = useState('');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const[images,setImages] = useState('');
    const[profileImage,setProfileImage] = useState('');
    // const[createPost] =useMutation(CREATE_POST);
    const [createPost] = useMutation(CREATE_POST, {
        update(cache, { data }) {
          try {
            console.log(data);  // Log the data from the mutation
            const { createPost } = data; 
            const existingPosts = cache.readQuery({ query: GET_POSTS });
            
            // If existingPosts is null, use an empty array instead
            const newPosts = existingPosts ? [createPost, ...existingPosts.posts] : [createPost];
            
            cache.writeQuery({
              query: GET_POSTS,
              data: { posts: newPosts },
            });
          } catch (error) {
            console.error('Error updating cache after createPost:', error);
          }
        },
      });

    const uploadToCloudinary = async (file) => {
        const url = 'https://api.cloudinary.com/v1_1/dk5mamh4v/upload';

        const formData = new FormData();

        formData.append('file',file);
        formData.append('upload_preset','qe6d0r4x');

        const response = await fetch(url,{
            method:'POST',
            body:formData,
        })
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse.url;
        }else{
            console.error('Upload Failed');
            return null;
        }

    };
    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log(title,description,images,profileImage);
        const imagesUrl = await uploadToCloudinary(images);
        const profileImageUrl = await uploadToCloudinary(profileImage);
        console.log(imagesUrl,profileImageUrl);
        try {
            const { data } = await createPost({
              variables: { title, description, images: imagesUrl, profileImage: profileImageUrl }
            });
            console.log(data.createPost);
          } catch (error) {
            console.error('Error while creating post:', error);
          }

        
      

    }
    const handleChange = (e) => {
        const {name,value} = e.target;
        
         if(name === 'title'){
            setTitle(value);
        }
        else if(name === 'description'){
            setDescription(value);
        }
        else if(name === 'image'){
            setImages(value);
        }
        else if(name === 'profileImage'){
            setProfileImage(value);
        }
    }



    return(
        <section className='flex justify-center flex-col mx-auto'>
            <div className='font-extrabold text-center text-[32px]'>Create Post</div>

            <form className='mt-16' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>                        
                        <input type='text' id='title' name='title' placeholder='title' value={title} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg'></input>

                        <textarea value={description} id='description' name='description' onChange={handleChange}></textarea>

                        <input type='file' name='image' onChange={e=>setImages(e.target.files[0])}></input>
                        <input type='file' name ='profileImage' onChange={e=>setProfileImage(e.target.files[0])}></input>
                        <button type='submit'>Submit</button>
                </div>
            </form>
        </section>
    )

}

export default CreatePost;