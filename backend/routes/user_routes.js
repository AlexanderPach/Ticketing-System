const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,

} = require ('../controller/userController');

router.get('/allusers', getAllUsers);
router.get('/:id', getUsersById);
router.post('/user',createUsers);

module.exports = router;