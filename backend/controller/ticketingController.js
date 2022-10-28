const asyncHandler = require('express-async-handler')

const Ticket = require('../models/Ticket_Model');

const isValidObject = require('../jwt/validIDObject');

exports.getAllTickets = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id);


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
    if(!teamFrom || !description || !teamTo || !severity){
        res.status(400);
        throw new Error('Wrong Information, Please add appropriate data')
    }

    const ticket = await Ticket.create({
        teamFrom,
        teamTo,
        description,
        severity,
        
    })

    res.status(201).json({
        teamFrom: ticket.teamFrom,
        teamTo: ticket.teamTo,
        description: ticket.description,
        severity: ticket.severity
    });
})