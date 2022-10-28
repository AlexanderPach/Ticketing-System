const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const colors = require('colors');

const app = express();
const ticketRoute = require('./routes/ticketroutes');
const userRoute = require('./routes/user_routes');
const middleware = require('./middleware/authorizationMiddleware');
const connectDB = require('./db_setup');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tickets', middleware, ticketRoute);
app.use('/users', userRoute);

connectDB().then(() => {
    app.listen(3000, console.log(`Server started on port 3000`.rainbow.underline.bold));
}).catch((e) => {
    console.log(e);
})

