const asyncHandler = require('express-async-handler')

const User = require('../models/User_Model');
const Ticket = require('../models/Ticket_Model');

const isValidObject = require('../jwt/validIDObject');

exports.getAllTickets = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User Not Found');
    }

    const tickets = await Ticket.find({ user: req.user.id});
    res.status(200).json(tickets);


});


exports.getTicketById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(400);
        throw new Error('Ticket Not Found');
    }
    
    if(!isValidObject(req.params.id)){
        res.status(401);
        throw new Error('Invalid Ticket ID');
    }

    const ticket = await Ticket.findById(req.params.id);
    if(!ticket){
        res.status(400);
        throw new Error('Ticket Not Found');

    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not Authorized');
    }

    res.status(200).json(ticket);

})

exports.createTicket = asyncHandler(async(req,res) => {
    const { teamFrom,teamTo,description , severity} = req.body;
    if(!product || !description){
        res.status(400);
        throw new Error('Wrong Information, Please add appropriate data')
    }

    // const user = await User.findById(req.user.id);
    // if(!user){
    //     res.status(401);
    //     throw new Error('USER NOT FOUND');
    // }

    const ticket = await Ticket.create({
        //user: req.user.id,
        teamFrom,
        teamTo,
        description,
        severity,
        
    })

    res.status(201).json(ticket);
})