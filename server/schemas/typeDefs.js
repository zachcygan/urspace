
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
    profilePic: String
    following: [User]
    followers: [User]
    posts: [Post]
    followerCount: Int
    followingCount: Int
    postCount: Int
  }

  type Post {
    _id: ID!
    userId: User!
    content: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    userId: User!
    content: String!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
  me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createComment(input: CreateCommentInput!): Comment
    createPost(content: String!): Post
   
  }

  input CreateCommentInput {
    postId: ID!
    content: String!
  }
`;

module.exports = typeDefs;

