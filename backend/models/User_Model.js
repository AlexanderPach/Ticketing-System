const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        // id:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        // },
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add a valid email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password']
        },
        team: {
            type: String,
            required: [true, 'Enter what team you belong to']
        },
        

    }
);

module.exports = mongoose.model('User', userSchema);

