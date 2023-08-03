const usernames = [
    'cryingcat',
    'moomy',
    'dancingrose',
    'flitterflicks',
    'sashasings',
    'babbleboo',
    'rhinorice',
    'nuraknows',
    'rayred',
    'matilda3',
    'shaytansicko'
];

const thoughts = [
    'All my tears are dry since the movie ended.',
    'Running after deer is my favorite evening activity.',
    'I think cats must be secret agents. How are they so intelligent?',
    'Brown bears are almost as beautiful as polar bears.',
    'My cat is the most gorgeous cat in the world.',
    'Grandma has the best recipe for chicken alfredo and I will swear by that till the day I die.',
    'Disco fries are irresistable.',
    'PETA is a criminal organization.',
    'Reading a good book is the best feeling in the world.',
    'One day I will design a cyborg capable of making the best greek fries.',
    'The new Barbie movie featuring Ryan Gosling and Margot Robbie is my new favorite movie!',
    'My favorite wig is short and purple.',
    'One day I will be the president of the chess team.',
    'I have never met a grumpy dog - do they exist?',
    'Blue is the best color in the world - so peaceful!',
    'Baseball is such a boring sport.',
    'Basketball is the best sport!',
    'Somebody stole my favorite book!',
    'How can anybody be unhappy during a tea party?'
];

const reactions = [
    'I totally agree!',
    'What are you talking about??',
    'You are onto something...',
    'Wonderful',
    'How horrible!',
    ':)',
    '>:(',
    ':D',
    'This makes me so angry.',
    'I am so happy you said this.',
    'You are one of a kind.'
]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getUsername = (int) => {
    return `${usernames[int]}`
}

const getRandomUsername = (int) => {
    return `${getRandomArrItem(usernames)}`
}

const getRandomReactions = (int) => {
    const results = [];
    for (let i=0; i < int; i++) {
        results.push({
            reactionBody: getRandomArrItem(reactions),
            username: getRandomArrItem(usernames),
        });
    }
    return results;
}

// const reaction = getRandomReactions(2);
// console.log(reaction);

const getRandomThoughts = (int) => {
    const thoughtArr = [];
    for (let i=0; i < int; i++) {
        thoughtArr.push({
            thoughtText: thoughts[i],
            username: getRandomArrItem(usernames),
            reactions: getRandomReactions(i),
        });
    }
    return thoughtArr;
}

const thought = getRandomThoughts(3);
console.log(thought);

module.exports = {
    getUsername,
    getRandomUsername,
    getRandomThoughts,
    getRandomReactions
};