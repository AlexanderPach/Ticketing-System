const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
    {
        // user:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'User',
        // },
        teamFrom: {
            type: String,
            required: [true, 'Please select a Team'],
            enum: ['Marketing', 'SRE', 'Social Media', 'Customer Services'],
        },
        teamTo: {
            type: String,
            required: [true, 'Please select a Team'],
            enum: ['Marketing', 'SRE', 'Social Media', 'Customer Services'],
        },
        description: {
            type: String,
            required: [true, 'Please enter an appropiate description to match your incident'],
        },
        severity: {
            type: String,
            required: [true, 'Please select a Priority Level'],
            enum: ['1 - Low', '2 - Medium', '3 - High'],
        },
    }
);

module.exports = mongoose.model('Ticket', ticketSchema);