const asyncHandler = require('express-async-handler')
const User = require('../models/User_Model');
// const jwtgen = require('../jwt/jwtGenerate');
const jwtstuff = require('../jwt/jwtGeneration');
const bcrypt = require('bcryptjs');


exports.getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({}); //mongoose uses empty brackets to search for all 

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
    throw new Error('Missing Information, Please add appropriate data');
   }

   const ifUserExist = await User.findOne({email});

   if(ifUserExist){
    res.status(400);
    throw new Error('Account Already Exists')
   }

   const salter = await bcrypt.genSalt(12); 
   const hashedPass = await bcrypt.hash(password, salter);
 

   const newUser = await User.create({
    name,
    email,
    password: hashedPass,
    team,

   })

   res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    team: newUser.team,
    password: newUser.password,
    token: jwtstuff.generateToken(newUser._id)

});

})


exports.loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const userLogging = await User.findOne({email});

    if(!userLogging || !(await bcrypt.compare(password, userLogging.password))){
        res.status(400);
        console.log(password, userLogging.password);
        throw new Error(`Invalid username/password : Password -> ${userLogging.password}`);
    }else{
        res.status(200).json({
            _id: userLogging._id,
            name: userLogging.name,
            email: userLogging.email,
            token: jwtstuff.generateToken(userLogging._id),
        });
    }
})

exports.currentUser = asyncHandler(async(req, res) => {
    const currentUser = {
        name: req.user.name,
        email: req.user.email,
        team: req.user.team,
    };
    res.json(currentUser);
})

exports.deleteUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const userDeleting = await User.findOne({email});
    const deletedUser = await userDeleting.delete();

    try{
    if(!deletedUser){
        res.status(400).json({
            success: false,
            message: `User not found`,
        });
    } else{
        res.status(200).json({
            deletedUser,
            success: true,
            message:`User ${userDeleting._id} has been succesfully deleted`,
        });
    }}catch(error){
        res.status(400).json({
            success: false,
            message: `Problem when retrieving deleted user information`,
        });
    }

    
})