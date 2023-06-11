import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
      title
      description
      likes {
        _id
      }
      images
      user {
        _id
        username
        profileImage
      }
    }
  }
`;
export const SEARCH_POSTS =gql`
query SearchPosts($keyword: String!) {
  searchPosts(keyword: $keyword) {
    _id
    title
    description
    likes
    comments
    images 
    user{
      username
      profileImage
    }
  }
}`;
export const SEARCH_PROFILES =gql`
query SearchProfiles($keyword: String!) {
  searchProfiles(keyword: $keyword) {
    _id
    username
    profileImage
    followers{
      _id
    }
    following{
      _id
    }
    firstName
    lastName
  }

  }
    `;

export const GET_SINGLE_USERS_SONGS = gql`
  query GetUsersSongs($username: String!) {
    getUsersSongs(username: $username) {
      _id
      artist
      coverart
      title
      url
      user {
        username
        profileImage
        _id
      }
    }
  }
`;


export const GET_SINGLE_USERS_POSTS = gql`
  query GetUsersPosts($username: String!) {
    getUsersPosts(username: $username) {
      _id
      comments
      description
      images
      likes {
        _id
      }
      title
      user {
        username
        profileImage
        _id
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
export const findUserMusic = gql`
  query findUserMusic {
    findUserMusic {
      _id
      musics{
        _id
        artist
        coverart
        title
        key
        url
      }
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
      }
      following {
        _id
      }
      posts {
        _id
      }
      bio
      profileImage
      creationDate
      musics {
        _id
      }
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
      }
      followers {
        _id
      }
      posts {
        _id
      }
      bio
      creationDate
      musics{
        _id
      }
      likedPosts {
        _id
      }
    }
  }
`;

