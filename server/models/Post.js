const { Schema, model } = require('mongoose');
const Comment = require('./Comment.js');

const postSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        comments: [Comment]
    },
);

const Post = model('Post', postSchema);

module.exports = Post;
