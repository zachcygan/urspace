
const { User, Comment, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError(
        "You must be logged in to perform this action"
      )   
    },
    posts: async () => {
      const posts = await Post.find();
      return posts;
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect login/password");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect login/password");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    // createPost: async (parent, { content }, context) => {
    //   if (context.user) {
    //     const post = new Post({
    //       userId: context.user._id,
    //       content,
    //       createdAt: new Date().toISOString(),
    //     });
    //     return post.save();
    //   }
    //   throw new AuthenticationError("You need to be logged in to perform this action")
    // },

    // will change later after login with auth working
    createPost:async(parent,{user,title,description,images,profileImage})=>{
      try {
        const newPost = new Post({
          user,
          title,
          description,
          images,
          profileImage,
        });
        const savedPost = await newPost.save();
        return savedPost;
      } catch (error) {
        console.error(error);
        throw new Error("Error creating post");
      }
    },

    createComment: async (parent, { input }, context) => {
      if (context.user) {
        const { postId, content } = input;
        const comment = new Comment({
          userId: context.user._id,
          content,
          createdAt: new Date().toISOString(),
        });
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: comment } },
          { new: true }
        );
        if (!post) {
          throw new Error("Post not found");
        }
        return comment;
      }
      throw new AuthenticationError("You need to be logged in to perform this action")
    },
  },
};

module.exports = resolvers


