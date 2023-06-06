const { Schema, model } = require('mongoose');
const Comment = require('./Comment.js');

const postSchema = new Schema(
    {
        
        title:{
            type: String,

        },
        description: {
            type: String,
            default: '',
        },
        likes:{
            type: Number,
            default: 0,
        },
        comments: {
            type: Number,

        },
        user:{
            type: String,
            required: true,
        }
    },
);

const Post = model('Post', postSchema);

module.exports = Post;
