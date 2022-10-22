const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const colors = require('colors');

const app = express();
const ticketRoute = require('./routes/ticketroutes');
const userRoute = require('./routes/user_routes');
const middleware = require('./middleware/authorizationMiddleware');
const connectDB = require('./db_setup');

// connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/tickets', middleware, ticketRoute);
app.use('/tickets', middleware, ticketRoute);
app.use('/users', userRoute);

// app.listen(3000, () => {
//     console.log(`Server started on port 3000`);
// });

connectDB().then(() => {
    app.listen(3000, console.log(`Server started on port 3000`.red.underline.bold));

}).catch((e) => {
    console.log(e);
})

