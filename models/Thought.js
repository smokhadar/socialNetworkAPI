const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // add getter method for date: https://mongoosejs.com/docs/tutorials/getters-setters.html
            get: (date) => {
                if (date) return date.toISOString().split("T")[0];
            },
        },
        // user that created this thought
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return `${this.reactions.length}`;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;