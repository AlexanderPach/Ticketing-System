const router = require('express').Router();

const {
    getAllTickets,
    getTicketById,
    createTicket,
    
}= require('../controller/ticketingController')

router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.post('/',createTicket);


module.exports = router;
