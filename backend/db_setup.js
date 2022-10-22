
const mongoose = require('mongoose');
const debug = require('debug')('app:database');
const colors = require('colors');

const connectDB = async () => {
    mongoose.connect(
        'mongodb+srv://user:userpassword@cluster1.seurqd3.mongodb.net/?retryWrites=true&w=majority',
    ).then(() => console.log('Connected to Cluster 1 - Tickets')).catch(e => console.log(e));

  };
  
  module.exports = connectDB;