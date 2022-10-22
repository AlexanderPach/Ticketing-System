const asyncHandler = require('express-async-handler')
const User = require('../models/User_Model');

const isValidObject = require('../jwt/validIDObject');
const Ticket_Model = require('../models/Ticket_Model');

exports.getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({});

    if(!users){
        res.status(400).json({
            success: false,
            message: 'No users had been found',
        });
    }else{
        res.status(200).json({
            users, success: true, message: 'All users have been found'
        })
    }
})

exports.getUsersById = asyncHandler(async(req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if(!user){
        res.status(400).json({
            success: false,
            message: 'User Not Found'
        });
    }else{
        res.status(200).json({
            user,
            success: true,
            message:'User has been found',
        });
    }


})

exports.createUsers = asyncHandler(async (req, res) => {
   const {name, email, password, team} = req.body;
   if(!name || !email || !password || !team){
    res.status(400);
    throw new Error('Wrong Information, Please add appropriate data');
   }

   const ticket = await User.create({
    name,
    email,
    password,
    team,

   })

   res.status(201).json(ticket);
    

})