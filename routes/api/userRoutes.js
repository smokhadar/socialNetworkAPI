const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addNewFriend,
    deleteFriend
} = require('../../controllers/userControls');

// api/users
router.route('/').get(getUsers).post(createUser);

//api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

//api/users/:userId/friends
router.route('/:userId/friends').post(addNewFriend);

//api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;