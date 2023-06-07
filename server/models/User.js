const {  Schema, model  } = require('mongoose');
const bcrypt = require('bcrypt');

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
        },
        profileImage: {
            type: String,
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
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

userSchema
    .virtual('followerCount')
    .get(function () {
        if (this.followers) return this.followers.length
    })
userSchema
    .virtual('followingCount')
    .get(function () {
        if (this.following) return this.following.length
    })
userSchema
    .virtual('postCount')
    .get(function () {
        if (this.posts) return this.posts.length
    })

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

const User = model('User', userSchema);

module.exports = User;