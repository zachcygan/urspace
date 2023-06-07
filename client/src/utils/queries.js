import {gql} from '@apollo/client';

const GET_POSTS = gql`
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

export default GET_POSTS;

export const QUERY_GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;