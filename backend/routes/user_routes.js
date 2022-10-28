const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    loginUser,
    //create a endpoint the saves currently logged in user
    //the currently logged in user will have the authentication working

} = require ('../controller/userController');

const useRouter = require('../middleware/authorizationMiddleware');

router.get('/allusers', getAllUsers);
router.get('/:id', useRouter, getUsersById);
router.post('/user',createUsers);
router.post('/login', loginUser);

module.exports = router;