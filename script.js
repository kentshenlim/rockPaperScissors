function getComputerChoice() {
// Ask for computer's response: rock(1), paper(2) or scissors(3)
// Input: none
// Output: typeof string, either 'Rock', 'Paper', or 'Scissors'
let response = Math.round(Math.random()*(3 - 1) + 1);
let stringResponse;
(response === 1) ? (stringResponse = 'Rock') : (response === 2) ? (stringResponse = 'Paper') : (stringResponse = 'Scissors');
return stringResponse
}