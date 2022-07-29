function getComputerChoice() {
// Ask for computer's response: rock(1), paper(2) or scissors(3)
// Input: none
// Output: typeof string, either 'Rock', 'Paper', or 'Scissors'
let response = Math.round(Math.random()*(3 - 1) + 1);
let stringResponse;
(response === 1) ? (stringResponse = 'Rock') : (response === 2) ? (stringResponse = 'Paper') : (stringResponse = 'Scissors');
return stringResponse
}


function playRound(playerSelection, computerSelection) {
// Play a round of rock paper scissors
// Input: both typeof string, player choice, then computer choice, case insensitive
// Output: typeof string declaring winner/loser

// Remove case sensitivity for playerSelection
let firstLetter = playerSelection.substr(0,1);
let remainingLetter = playerSelection.substr(1,playerSelection.length+1);
firstLetter = firstLetter.toUpperCase();
remainingLetter = remainingLetter.toLowerCase();
playerSelection = firstLetter + remainingLetter;

// Deciding winner, draw(0), player(1), computer(-1)
let result;
switch (true) {
    case (playerSelection === computerSelection):
        result = 0;
        break;
    case (playerSelection === 'Rock' && computerSelection === 'Scissors'):
    case (playerSelection === 'Paper' && computerSelection === 'Rock'):
    case (playerSelection === 'Scissors' && computerSelection === 'Paper'):
        result = 1;
        break;
    default:
        result = -1;
}

// Return a string of result
let stringResult;
if (result === 0) {
    stringResult = `A tie! A ${playerSelection} can\'t beat a ${playerSelection}!`;
} else if (result === 1) {
    stringResult = `You win! ${playerSelection} beats ${computerSelection}`;
} else {
    stringResult = `You lose! ${computerSelection} beats ${playerSelection}`;
}
return stringResult
} 


function checkResponse(str) {
// Check if valid string input by user when prompted
// Input: typeof string, user response, either rock or paper or scissors
// Output: Boolean, true if among 3, case-insensitive
response = false;
str = str.toLowerCase();
if (str === 'rock' || str === 'paper' || str === 'scissors') {
    response = true;
}
return response;
}


function game() {
// Play 5 rounds, keep scores, return winner
// Input: none
// Output: typeof string, describing winner after five rounds
let playerScore = 0
, computerScore = 0;
let userInput;
let checkerString;
let finalResult;
for (let i = 0; i < 5; i++) {
    userInput = prompt('Choose either rock, paper or scissors');
    while (!(checkResponse(userInput))) {
        userInput = prompt('Check your spelling!\nChoose either rock, paper or scissors');
    }
    checkerString = playRound(userInput, getComputerChoice());
    alert(checkerString);
    checkerString = (checkerString).substring(0,5);
    if (checkerString === 'You w') {
        playerScore++;
    } else if (checkerString === 'You l') {
        computerScore++;
    }
}
(playerScore > computerScore) ? finalResult = 'You win!' : (playerScore == computerScore) ? finalResult = 'A tie!' : finalResult = 'You lose!';
finalResult = finalResult + '\n' + `${playerScore}:${computerScore}`;
return finalResult;
}


// alert(game());