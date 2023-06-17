const {  Schema,model  } = require('mongoose');

const commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
           
        },
        content: {
            type: String,
            default: '',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const Comment = model('Comment', commentSchema);
module.exports = Comment;