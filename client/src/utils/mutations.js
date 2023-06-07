import { gql } from '@apollo/client';

const CREATE_POST = gql`
mutation CreatePost($title: String!, $description: String!, $images: String!, $profileImage: String!, $user: String!) {
    createPost(title: $title, description: $description, images: $images, profileImage: $profileImage, user: $user) {

        user
        title
        description
        images
        profileImage

    }
}
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
    _id
    username
    email  
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

export default CREATE_POST;
