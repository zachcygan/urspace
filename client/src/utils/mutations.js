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

export default CREATE_POST;