require('dotenv').config();
const mongoose = require('mongoose');
//|| 'mongodb://127.0.0.1:27017/project3'
mongoose.connect(process.env.MONGODB_URI );

module.exports = mongoose.connection;
