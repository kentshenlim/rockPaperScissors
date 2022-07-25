function getComputerChoice() {
// Ask for computer's response: rock(1), paper(2) or scissors(3)
// Input: none
// Output: typeof string, either 'Rock', 'Paper', or 'Scissors'
let response = Math.round(Math.random()*(3 - 1) + 1);
let stringResponse;
(response === 1) ? (stringResponse = 'Rock') : (response === 2) ? (stringResponse = 'Paper') : (stringResponse = 'Scissors');
return stringResponse
}

function playARound(playerSelection, computerSelection) {
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