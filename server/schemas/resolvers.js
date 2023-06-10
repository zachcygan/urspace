
const { User, Comment, Post, Music } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

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
      try {
        const posts = await Post.find().populate("user").exec();
        return posts;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching posts");
      }
    },

    users: async () => {
      const user = await User.find();
      return user;
    },
    singleUser: async (parent, args, context) => {
      const user = await User.findOne({ username: args.username });
      const posts = await Post.find({ username: args.username }).populate("user");
      return user;
    },
    musics: async () => {
      const music = await Music.findAll({});
      return music;
    },

 
    getUsersPosts: async (parent, args, context) => {
      const user = await User.findOne({ username: args.username });
      const posts = await Post.find({ user: user._id }).populate("user");
      return posts
    },
    getUsersSongs: async (parent, args, context) => {
      const user = await User.findOne({ username: args.username });
      const songs = await Music.find({ user: user._id }).populate("user");
      console.log('songs'+songs)
      return songs;
    },

    searchPosts: async(parent, {keyword}) => {
      try {
          // First find the users with matching usernames
          const users = await User.find({ username: { $regex: keyword, $options: 'i' } });
          // Extract the user IDs
          const userIds = users.map(user => user._id);
          // Search for posts either by title or user id
          const posts = await Post.find(
              { $or: [
                  { title: { $regex: keyword, $options: 'i' } }, 
                  { user: { $in: userIds } }
              ]})
              .populate('user')
              .exec();
          console.log(posts); // Log the posts here
          return posts;
      } catch (error) {
          console.error(error);
          throw new Error("Error fetching posts");
      }
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
    uploadProfilePicture: async (parent, args, context) => {
      console.log(args)
      const user = await User.findOneAndUpdate(
        { username: args.username },
        { profileImage: args.profileImage },
        { new: true }
      )

      return user
    },
    updateUser: async (parent, args, context) => {
      const user = await User.findOneAndUpdate(
        { username: args.username },
        {
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          bio: args.bio
        },
        { new: true }
      )

      return user
    },

    // createPost: async (parent, { content }, context) => {
    //   if (context.user) {
    //     const post = new Post({
    //       userId: context.user._id,
    //       content,
    //       createdAt: new Date().toISOString(),
    //     });
    //     const savedPost = await newPost.save();
    //     return savedPost;
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error("Error creating post");
    //   }
    // },

    createPost: async (parent, { title, description, images }, context) => {
      console.log(context.user);
      if (context.user) {
        try {
          const user = await User.findById(context.user._id);
          const newPost = new Post({
            user: user._id,
            title,
            description,
            images,
          });
          const savedPost = await newPost.save();

          await User.findOneAndUpdate({ _id: user._id }, { $push: { posts: savedPost } }, { new: true });
          const populatedPost = await Post.findById(savedPost._id).populate('user').exec();

          return populatedPost;
        } catch (error) {
          console.error(error);
          throw new Error("Error creating post");
        }
      }
      throw new Error('Authentication Error. Please sign in.');
    },
    followUser: async (parent, args, context) => {
      if (context.user) {
        try {

          const follower = await User.findById(context.user._id);
          const followee = await User.findOneAndUpdate(
            { username: args.username },
            { $push: { followers: follower } },
            { new: true }
          );
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { following: followee } },
            { new: true }
          );
          console.log('success')
          return [follower, followee];
        } catch (err) {
          console.error(err);
          throw new Error("Error following user");
        }
      };
      throw new Error('Authentication Error. Please sign in.');
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
    saveMusic: async (parent, { title, artist, url, coverart }, context) => {
      if (context.user) {
        try {
          const user = await User.findById(context.user._id);
          let music = await Music.findOne({ title });
          if (music) {

            await Music.findOneAndDelete({ title });
          } else {

            music = new Music({ title, artist, url, coverart, user: user._id });
            await music.save();
          }

          const savedUser = await User.findById(context.user._id);
          savedUser.musics.push(music);
          await savedUser.save();
        } catch (error) {
          console.error(error);
          throw new Error('Error in saveMusic mutation');
        }
      }
    },

    deleteMusic: async (parent, { title }) => {
      try {
        const music = await Music.findOne({ title });
        if (!music) {
          return "No music to delete";
        }
        await Music.findOneAndDelete({ title });
        return "Music deleted successfully!";
      } catch (error) {
        console.error(error);
        throw new Error('Error deleting music');
      }
    },

    register: async (parent, { username, email, password, firstName, lastName }) => {
      const user = await User.create({ username, email, password, firstName, lastName });
      const token = signToken(user);
      return { token, user };
    },

  },
}
  ;

module.exports = resolvers
