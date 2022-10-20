const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());


app.get('/', (req, res) =>{

});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
