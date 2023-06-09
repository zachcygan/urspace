import { gql } from '@apollo/client';



export const CREATE_POST = gql`
mutation CreatePost($title: String!, $description: String!, $images: String!) {
  createPost(title: $title, description: $description, images: $images) {
  
    title
    description
    likes
    comments
    images
  
    user {
      _id
      username
      profileImage
    }
  }
}
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;
export const SAVE_MUSIC = gql`
    mutation saveMusic($artist: String!, $coverart: String!, $title: String!, $url:String!) {
        saveMusic(artist: $artist, coverart: $coverart, title: $title, url: $url) {
            artist
            coverart
            title
            url
            
        }
    }
`;
export const DELETE_MUSIC= gql`
    mutation deleteMusic($title: String!) {
        deleteMusic(title: $title) 
    }
`;
export const updateUser = gql`
  mutation updateUser($username: String!, $email: String!, $firstName: String!, $lastName: String!, $bio: String!) {
    updateUser(username: $username, email: $email, firstName: $firstName, lastName: $lastName, bio: $bio) {
      username
      email
      firstName
      lastName
      bio
    }
  }
`

export const UPLOAD_PROFILE_PICTURE = gql`
  mutation uploadProfilePicture($profileImage: String!, $username: String!) {
    uploadProfilePicture(profileImage: $profileImage, username: $username) {
      username
      profileImage
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REGISTER = gql`
mutation Register($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    register(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        username
        email
        firstName
        lastName
      }
    }
  }

`;
