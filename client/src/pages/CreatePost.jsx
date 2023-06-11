import { React, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../utils/mutations';
import { GET_POSTS } from '../utils/queries';
import {useQuery} from '@apollo/client';
import { findUserMusic } from '../utils/queries';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
// import { set } from '../../../server/models/Comment';

const CreatePost = () => {
  // const [user,setUser] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [selectedMusic, setSelectedMusic] = useState(null);

  const { loading, error, data:musicData } = useQuery(findUserMusic);

  const handleMusicChange = (e) => {
    setSelectedMusic(e.target.value);
  
  };
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(title, description, images);
    const imagesUrl = await uploadToCloudinary(images);
    console.log(imagesUrl);
    try {
      const { data } = await createPost({
        variables: { title, description, images: imagesUrl, selectedMusic: selectedMusic }
      });
      window.location.assign(`/posts`);
      return data;
    } catch (error) {
      console.error('Error while creating post:', error);
    }




  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    }
    else if (name === 'description') {
      setDescription(value);
    }
    else if (name === 'image') {
      setImages(value);
    }
  }



  return (
    <section className='flex justify-center flex-col mx-auto'>
      <div className='font-extrabold text-center text-[32px]'>Create Post</div>

      <form className='mt-16' onSubmit={handleSubmit}>
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    value={ title }
                    onChange={handleChange}
                    type="text"
                    name="title"
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Post Title"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Descritpion
              </label>
              <div className="mt-2">
                <textarea
                  value={ description }
                  onChange={handleChange}
                  id="about"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few words about your post.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="image" onChange={e => setImages(e.target.files[0])} type="file" className="sr-only" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <select name="music" onChange={handleMusicChange}>
  {loading ? (
    <option>Loading...</option>
  ) : error ? (
    <option>Error :</option>
  ) : (
    musicData.findUserMusic.musics.map((music) => (
      <option key={music._id} value={music._id}>{music.title}</option>
    ))
  )}
</select>

            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>
    </section>
  )

}

export default CreatePost;