const router = require('express').Router();
const jwtstuff = require('../jwt/jwtGeneration')
const middleware = require('../middleware/authorizationMiddleware');


const {
    getAllTickets,
    getTicketById,
    createTicket,
    
}= require('../controller/ticketingController')

router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.post('/',middleware,createTicket);


module.exports = router;
