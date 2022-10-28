const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema(
    {
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

// exports.matchPass = async (pass) =>{
//     return await bcrypt.compare(pass, this.password);
// }



module.exports = mongoose.model('User', userSchema);

