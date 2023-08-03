const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThoughts, getUsername, getRandomUsername } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    //Drop existing users
    await User.deleteMany({});

    //Drop existing thoughts
    await Thought.deleteMany({});

    //create empty array to hold users
    const users = [];
    for (let i=0; i < 11; i++) {
        const username = getUsername(i);
        const email = `${username}@gmail.com`;
        // how to exclude username of user ?
        // const friends = getRandomUsername();

        users.push({
            username,
            email,
        });
    }

    await User.collection.insertMany(users);

    // const thoughts = [];
    // thoughts.push(getRandomThoughts(6));

    // await Thought.collection.insertMany(thoughts);
    
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});