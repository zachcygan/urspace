import { gql } from '@apollo/client';



export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $description: String!, $images: String) {
    createPost(title: $title, description: $description, images: $images) {
      user
      title
      description
      images
    
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

export const SAVE_PROFILE_PICTURE = gql`
  mutation saveProfilePicture($profileImage: String!, $_id: ID!) {
    saveProfilePicture(profileImage: $profileImage, _id: $_id) {
      _id
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

export default CREATE_POST;
