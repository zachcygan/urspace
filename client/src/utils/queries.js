import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
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

export const GET_MUSIC = gql`
  query GetMusic {
    musics {
      _id
      artist
      coverart
      title
      url
    }
  }
`;

export const GET_USERS = gql`
  query getUser {
    users {
      _id
      username
      email
      password
      firstName
      lastName
      bio
      profileImage
    } 
  }
`;

export const GET_SINGLE_USER = gql`
  query GetSingleUser($username: String!) {
    singleUser(username: $username) {
      _id
      username
      email
      password
      firstName
      lastName
      followers {
        _id
        username
      }
      following {
        _id
        username
      }
      posts {
        _id
      }
      bio
      profileImage
      creationDate
    } 
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
`


export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      firstName
      lastName
      profileImage
      following {
        _id
        username
      }
      followers {
        _id
        username
      }
      posts {
        _id
      }
      bio
      creationDate
    }
  }
`;

