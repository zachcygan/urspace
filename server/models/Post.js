const { Schema, model } = require('mongoose');


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
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            
        }
        ],
        images:{
            type: String,
            default: '',
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'User',
        },
        selectedMusic:{
            type: Schema.Types.ObjectId,
            ref:'Music',
        }
    },
);

postSchema.index({title:'text','user.username':'text'});
const Post = model('Post', postSchema);

module.exports = Post;
