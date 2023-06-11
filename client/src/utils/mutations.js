import { gql } from '@apollo/client';

export const CREATE_POST = gql`
mutation CreatePost($title: String!, $description: String!, $images: String!, $selectedMusic: ID) {
  createPost(title: $title, description: $description, images: $images, selectedMusic: $selectedMusic) {
    _id  
    title
    description
    likes {
      _id
    }
    comments
    images
    user {
      _id
      username
      profileImage
    }
    selectedMusic {
      title
      _id
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

export const FOLLOW_USER = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      _id
      username
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      _id
      username
    }
  }
`;

// export const SAVE_MUSIC = gql`
//     mutation saveMusic($artist: String!, $coverart: String!, $title: String!, $url:String!) {
//         saveMusic(artist: $artist, coverart: $coverart, title: $title, url: $url) {

//             artist
//             coverart
//             title
//             url
          
//         }
//     }
// `;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation unlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      _id
      likes
    }
  }
`;

export const SAVE_MUSIC = gql`
    mutation saveMusic($userId: ID!, $key: String!, $artist: String!, $coverart: String!, $title: String!, $url:String!) {
        saveMusic(userId: $userId, key: $key, artist: $artist, coverart: $coverart, title: $title, url: $url) {
          
            key
            artist
            coverart
            title
            url
          
        }
    }
`;

// export const DELETE_MUSIC= gql`
//     mutation deleteMusic($title: String!) {
//         deleteMusic(title: $title) 
//     }
// `;

export const DELETE_MUSIC= gql`
    mutation deleteMusic($userId: ID!, $title: String!) {
        deleteMusic(userId: $userId, title: $title) 
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


