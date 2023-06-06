const { Schema, model } = require('mongoose');
const CommentSchema = require('./Comment');

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
        comments: [CommentSchema],
    },
);

const Post = model('Post', postSchema);

module.exports = Post;
