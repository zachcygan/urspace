import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      title
      description
      likes
      comments
      images
      profileImage
      user{
        username
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
        username
      }
      following {
        _id
        username
      }
      posts {
        _id
        title
        description
        likes
        comments
        images
        profileImage
      }
      bio
      profileImage
      creationDate
    } 
  }
`;



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
        title
        description
        likes
        comments
        images
        profileImage
      }
      bio
      creationDate
    }
  }
`;

