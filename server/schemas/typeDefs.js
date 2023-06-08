
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
  }

  type Music{
    _id: ID!
    artist: String
    coverart: String
    title: String
    url: String

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
    likes: Int
    comments: Int
    images: String!
    profileImage: String!
    user: User!
  }

  type Query {
<<<<<<< HEAD
  me: User
  posts: [Post]
  musics: [Music]
  music(_id: ID!): Music
  users: [User]
  profile: User
=======
    me: User
    posts: [Post]
    musics: [Music]
    music(_id: ID!): Music
    users: [User]
    singleUser(username: String!): User
>>>>>>> 73aa443933212c3d9d692189786da65f5b380fc8
  }

  

  type Mutation {
    saveMusic(title: String, artist: String, url: String, coverart: String): Music
    addUser(username: String!, email: String!, password: String!): Auth
    createPost(title: String!, description: String!, images: String!, profileImage: String!): Post
    login(email: String!, password: String!): Auth
    createComment(postId: ID!, content: String!): Post
<<<<<<< HEAD

    logout: User
=======
>>>>>>> 73aa443933212c3d9d692189786da65f5b380fc8
    register(username: String!, email: String!, password: String!, firstName:String!,lastName:String!): Auth
  }  
`;

module.exports = typeDefs;

