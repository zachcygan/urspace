const { Schema, model } = require('mongoose');
import Comment from './Comment.js';

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
        comments: [comment]
    },
);

const Post = model('Post', postSchema);

module.exports = Post;
