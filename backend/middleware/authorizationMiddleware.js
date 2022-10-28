const AsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const debug = require('debug')('app:authorizationMiddleware');


const User = require('../models/User_Model');

const useRouter = AsyncHandler(async(req,res, next) => {
    let userToken;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            userToken = req.headers.authorization.split(' ')[1];
            const decodedUserToken = jwt.verify(userToken, secret);
            console.log(`decoded if true ${decodedUserToken}`);
            req.user = await User.findById(decodedUserToken.userId).select(
              '-password'
            );
            next();
          } catch (error) {
            debug(error.message);
            res.status(401);
            console.log(`userToken: ${userToken} // // secret: ${secret}`)
            throw new Error('Not authorized to access');
          }
    }

    if (!userToken) {
        res.status(401);
        console.log(`userToken: ${userToken}`)
        throw new Error('Not authorized to access');
      }


});

module.exports = useRouter;