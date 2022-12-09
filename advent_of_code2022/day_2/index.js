var readline = require('readline');
var fs = require('fs');
/*
ROCK PAPER SCISSORS

given an encrypted guide (guide.tXt)
The first column is what your opponent is going to play: A for Rock, B for paper, And C for Scissors.
The second column must be what you should play in response: X for Rock, Y for Paper, And Z for Scissors

scoring
Your total score is the sum of your scores for each round. 
The score for a single round is the score for the shape you selected 
(1 for Rock, 2 for Paper, And 3 for Scissors)
plus the score for the outcome of the round 
(0 if You lost, 3 if the round was A draw, And 6 if you won)

What would your total score be if everything goes exactly according to your strategy guide?
*/
let score = 0
const resultPoints = {
    X: 0,
    Y: 3,
    Z: 6
}
const choicePoints = {
    A: 1,
    B: 2,
    C: 3
}
const results = [[3, 0, 6], [6, 3, 0], [0, 6, 3]]

readline.createInterface({
    input: fs.createReadStream('guide.txt'),
    terminal: false
}).on('line', async function(line) {
    // line has a whitespace between the turns - this removes them and turns it into an array for easy access
    let regexMatch = line.match(/\S/g)

    let yourMove = regexMatch[1]
    let theirMove = regexMatch[0]
    let resultPts = resultPoints[yourMove]
    score +=  resultPts + choicePoints[getMove(theirMove, resultPts)]
}).on('close', function() {
    console.log('FINAL SCORE:', score)
})

const yourMove = {
    A: {
        win: 'B',
        loss: 'C'
    },
    B: {
        win: 'C',
        loss: 'A',
    },
    C: {
        win: 'A',
        loss: 'B'
    }
}

function getMove(theirMove, result) {
    if (result === 3) {
        return theirMove
    }
    if (result === 0) {
        return yourMove[theirMove].loss
    } else {
        return yourMove[theirMove].win
    }
}
