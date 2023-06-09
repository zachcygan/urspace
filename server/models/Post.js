const { Schema, model } = require('mongoose');
const CommentSchema = require('./Comment');

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
            default: 0,
        },
        images:{
            type: String,
            default: '',
        },
       
        // user:{
        //     type: Schema.Types.ObjectId,
        //     ref:'User',
        // }
    },
);

const Post = model('Post', postSchema);

module.exports = Post;
