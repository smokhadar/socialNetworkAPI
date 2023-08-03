const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// get all thoughts
async function getThoughts(req, res) {
    try {
        const thoughtData = await Thought.find();
        return res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// get single thought by _id
async function getSingleThought(req, res) {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thoughtData) {
            return res.status(404).json({ message: 'No message with that ID' });
        }

        return res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// post new thought
async function createThought(req, res) {
    try {
        const thoughtData = await Thought.create(req.body);

        // push thought to associated user thoughts array
        const updatedUser = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: {thoughts: thoughtData._id} },
            { runValidators: true, new: true }
        )

        if (!updatedUser) {
            return res.status(400).json({ message: 'No user found with that ID'})
        }

        return res.status(200).json(thoughtData, updatedUser);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// PUT - update thought by id
async function updateThought(req, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        return res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// delete thought by _id
async function deleteThought(req, res) {
    try {
        const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with that ID exists' })
        }

        res.status(200).json({ message: 'Thought successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// POST - create reaction stored in single thoughts reactions array field
async function createReaction(req, res) {
    try {
        console.log('You are adding a reaction.');
        console.log(req.body);

        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought found with that ID' })
        }

        return res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


// DELETE to remove reaction by reactions reactionId value
async function deleteReaction(req, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } }},
            { runValidators: true, new: true }
        )

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with that ID'})
        }

        return res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}