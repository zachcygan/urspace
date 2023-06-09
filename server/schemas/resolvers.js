
const { User, Comment, Post, Music } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile, getFileStream } = require('../utils/s3')

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
    posts: async (parent, args, context) => {

      if (context.user) {
      const posts = await Post.find().populate("user");
      return posts;
      }
      throw new AuthenticationError(
        "You must be logged in to perform this action"
      )
    },
    users: async () => {
      const user = await User.find();
      return user;
    },
    singleUser: async (parent, args, context) => {
      const user = await User.findOne({ username: args.username });
      return user;
    },
    musics: async () => {
      const music = await Music.find();
      return music;
    },
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
    // will change later after login with auth working
    // createPost:async(parent,{user,title,description,images,profileImage})=>{
    //   try {
    //     const newPost = new Post({
    //       user,
    //       title,
    //       description,
    //       images,
    //       profileImage,
    //     });
    //     const savedPost = await newPost.save();
    //     return savedPost;
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error("Error creating post");
    //   }
    // },

    createPost: async (parent, { title, description, images, profileImage }, context) => {

      console.log(context.user);
      if (context.user) {
        try {
          const newPost = new Post({
            user: context.user._id,
            title,
            description,
            images,
            profileImage,
          }).populate("user");
          return newPost
          // const savedPost = await newPost.save();
          // return savedPost;
        } catch (error) {
          console.error(error);
          throw new Error("Error creating post");
        }
      }
      throw new Error('Authentication Error. Please sign in.');
    },

    // uploadImage: async (parent, { file }, context) => {
    //   const result = await uploadFile(file)
    //   await unlinkFile(file.path)
    //   console.log(result)

    //   return {imagePath: `/images/${result.Key}`}
    // },

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
    saveMusic: async (parent, { title, artist, url, coverart }) => {
      console.log(title, artist, url, coverart);
      try {
        const music = new Music({ title, artist, url, coverart });
        return await music.save();
      } catch (error) {
        console.error(error);

        throw new Error('Error creating music');
      }
    },
    register: async (parent, { username, email, password, firstName, lastName }) => {
      const user = await User.create({ username, email, password, firstName, lastName });
      const token = signToken(user);
      return { token, user };
    },

  },
};

module.exports = resolvers


