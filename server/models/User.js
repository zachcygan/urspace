const {  Schema, model  } = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Invalid email",
            ],
        },
        password: {
            type: String,
            required: true,
            minLength: 8,   
        },
        firstName: {
            type: String,
            // required: true,
        },
        lastName: {
            type: String,
            // required: true,
        },
        bio: {
            type: String,
            default: 'Edit your profile to add a bio',
        },
        profileImage: {
            type: String,
            default: 'http://res.cloudinary.com/dk5mamh4v/image/upload/v1686246906/cggvneiqdp90z81yhy49.jpg'
        },
        creationDate: {
                type: String,
                default: moment().format('DD-MM-YYYY'),
        },
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        musics:[
            {
                type: Schema.Types.ObjectId,
                ref: "Music",
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

userSchema.virtual('followerCount').get(function () {
        if (this.followers) return this.followers.length
    })
userSchema.virtual('followingCount').get(function () {
        if (this.following) return this.following.length
    })
userSchema.virtual('postCount').get(function () {
        if (this.posts) return this.posts.length
    })

userSchema.virtual('formattedAccountCreation').get(function () {
    const day = this.creationDate.getDate();
    const month = this.creationDate.getMonth() + 1; // Month is zero-based, so we add 1
    const year = this.creationDate.getFullYear();

    console.log('date virtual')
      
    return `${day}-${month}-${year}`;
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;