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
      user
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

export const QUERY_GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
