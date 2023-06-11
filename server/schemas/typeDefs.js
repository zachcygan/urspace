
const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
    bio: String
    profileImage: String
    following: [Following]
    followers: [Followers]
    posts: [Post]
    creationDate: String
    musics: [Music]
    likedPosts: [Post]
  }

  type Likes {
    _id: ID!
    username: String!
  }

  type Music{
    _id: ID!
    artist: String
    coverart: String
    title: String
    url: String
    user: User
    key: String
  }

  type Following {
    _id: ID!
    username: String!
  }

  type Followers {
    _id: ID!
    username: String!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Post{
    _id: ID!
    title: String!
    description: String!
    likes: [Likes]
    comments: String
    images: String
    profileImage: String!
    user: User
  }

  type Query {
    me: User
    findUserMusic:User
    posts: [Post]
    searchPosts(keyword:String!): [Post]
    searchProfiles(keyword:String!): [User]
    musics: [Music]
    music(_id: ID!): Music
    users: [User]
    profile: User
    singleUser(username: String!): User
    getUsersPosts(username: String!): [Post]
    post:Post
    profiles: [User]
    getUsersSongs(username: String!): [Music]
  }
  
  type Mutation {
    saveMusic(userId:ID, key:String, title: String, artist: String, url: String, coverart: String): Music
    addUser(username: String!, email: String!, password: String!): Auth
    createPost(title: String!, description: String!, images: String!): Post
    login(email: String!, password: String!): Auth
    createComment(postId: ID!, content: String!): Post
    logout: User
    deletePost(postId: ID!): Post
    deleteMusic(userId:ID,title: String!): String
    register(username: String!, email: String!, password: String!, firstName:String!,lastName:String!): Auth
    uploadProfilePicture(profileImage: String!, username: String!): User
    updateUser(username: String!, email: String!, firstName: String!, lastName: String!, bio: String!): User
    followUser(username: String!): User
    unfollowUser(username: String!): User
    likePost(postId: ID!): Post
    unlikePost(postId: ID!): Post
  }  
`;

module.exports = typeDefs;

