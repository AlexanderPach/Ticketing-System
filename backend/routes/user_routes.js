const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    loginUser,
    currentUser,
    deleteUser

} = require ('../controller/userController');

const useRouter = require('../middleware/authorizationMiddleware');

router.get('/allusers', getAllUsers);
router.get('/:id', useRouter, getUsersById);
router.get('/current', currentUser)
router.post('/user',createUsers);
router.post('/login', loginUser);
router.delete('/delete', deleteUser);

module.exports = router;