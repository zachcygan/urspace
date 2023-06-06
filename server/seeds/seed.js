const db = require('../config/connection');
const {Post, User} = require('../models');
const postSeeds = require('./PostsSeed.json');

db.once('open', async () => {
    await Post.deleteMany({});

    const newPosts = await Post.insertMany(postSeeds);
    console.log('Posts seeded!');
    process.exit(0);
});