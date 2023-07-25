const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// get all users
async function getUsers(req, res) {
    try {
        const userData = await User.find();
        return res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// get single user by _id, and populated thought and friend data
async function getSingleUser(req, res) {
    try {
        const userData = await User.findOne({ _id: req.params.userId });

        if (!userData) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        return res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// post new user
async function createUser(req, res) {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// put - update user by _id
async function updateUser(req, res) {
    try {
        const userData = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )

        if (!userData) {
            return res.status(404).json({ message: 'No user with that ID'});
        }

        return res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// delete user by _id
async function deleteUser(req, res) {
    try {
        const userData = await User.findOneAndRemove({ _id: req.params.userId });

        if (!userData) {
            res.status(404).json({ message: 'No user with that ID exists '})
        }

        res.status(200).json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// POST: add new friend to user friend list
async function addNewFriend(req, res) {
    try {
        console.log('You are adding a friend.');
        console.log(req.body);

        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        );

        if (!userData) {
            return res.status(404).json({ message: 'No user found with that ID' })
        }
    
        return res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// delete friend from users friend list
async function deleteFriend(req, res) {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )

        if (!userData) {
            return res.status(404).json({ message: 'No user with that ID'});
        }

        return res.status(200).json(userData);

    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}