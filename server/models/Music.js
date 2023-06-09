const { Schema, model } = require('mongoose');

const musicSchema = new Schema(

    {
        artist:{
            type: String,
            default: '',
        },
        coverart:{
            type: String,
            default: '',
        },
        title:{
            type: String,
        },
        url:{
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    }
    );

    const Music = model('Music', musicSchema);

    module.exports = Music;