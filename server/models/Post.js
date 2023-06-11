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
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        comments: [{
            type: Number,
            default: 0,
        }],
        images:{
            type: String,
            default: '',
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'User',
        }
    },
);

postSchema.index({title:'text','user.username':'text'});
const Post = model('Post', postSchema);

module.exports = Post;
