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