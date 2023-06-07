const { Schema, model } = require('mongoose');

const musicSchema = new Schema(

    {
        artists:{
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
        genre:{
            type: String,
        },
        url:{
            type: String,
        },
        year:{
            type: Number
        }

    }
    );

    const Music = model('Music', musicSchema);

    module.exports = Music;