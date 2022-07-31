function getRandomInt(max) {
// Input: typeof number, maximum integer inclusive
// Output: typeof number, any one integer from 1 to max inclusive
const response = Math.round(Math.random()*(max - 1) + 1);
return response;
}




function getComputerChoice() {
// Ask for computer's response: rock(1), paper(2) or scissors(3)
// Input: none
// Output: typeof string, either 'Rock', 'Paper', or 'Scissors'
const response = getRandomInt(3);
let stringResponse;
switch (response) {
    case 1:
        stringResponse = 'Rock';
        pcRock.classList.toggle('active');
        break;
    case 2:
        stringResponse = 'Paper';
        pcPaper.classList.toggle('active');
        break;
    default:
        stringResponse = 'Scissors';
        pcScissors.classList.toggle('active');
}
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
        stopAllThenPlayThis(5);
        break;
    case (playerSelection === 'Rock' && computerSelection === 'Scissors'):
    case (playerSelection === 'Paper' && computerSelection === 'Rock'):
    case (playerSelection === 'Scissors' && computerSelection === 'Paper'):
        result = 1;
        userScore.textContent = +userScore.textContent + 1; // Update score
        setTimeout(() => {userScore.classList.toggle('active')}, 500);
        stopAllThenPlayThis(0);
        break;
    default:
        result = -1;
        computerScore.textContent = +computerScore.textContent + 1; // Update score
        setTimeout(() => {computerScore.classList.toggle('active')}, 500);
        stopAllThenPlayThis(4);
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
return stringResult;
} 




/*
function checkResponse(str) { // This will not be needed in GUI version
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
*/




/*
function game() { // This will not be needed in GUI version
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
*/




function victoryCheck() {
    if (userScore.textContent !== "5" && computerScore.textContent !== "5") return;
    else if (userScore.textContent === "5") {
        popUpDescription.textContent = "You won! What a noob lucky dog!";
        popUpDescription.style.color = "green";
        stopAllThenPlayThis(1);
    } else if (computerScore.textContent === "5") {
        popUpDescription.textContent = "Tough luck! You lost!";
        popUpDescription.style.color = "red";
        stopAllThenPlayThis(2);
    }
    body.append(popUp);
    body.append(overlay);
}




function stopAllAudio(audioList) {
    audioList.forEach(audio => {
        audio.pause();
    })
}




function stopAllThenPlayThis(i) {
// Input: typeof number, integer, the index of sound in soundArray to be played
// Output: none
    stopAllAudio(soundArray);
    soundArray[i].currentTime = 0;
    soundArray[i].play();
}




const body = document.querySelector("body")
, clickableImageList = document.querySelectorAll("img.clickable")
, resultDescription = document.querySelector(".result>.description")
, userScore = document.querySelector(".player.score")
, computerScore = document.querySelector(".computer.score")
, popUp = document.querySelector("div.pop-up")
, overlay = document.querySelector("div#overlay")
, popUpDescription = document.querySelector("div.pop-up-heading")
, popUpBtn = document.querySelector("button.pop-up-button")
, pcRock = document.querySelector("div.computer.A > img:nth-child(1)")
, pcPaper = document.querySelector("div.computer.A > img:nth-child(2)")
, pcScissors = document.querySelector("div.computer.B > img:nth-child(1)")
, soundArray = document.querySelectorAll('audio');


body.removeChild(popUp);
body.removeChild(overlay); // Don't show popup at beginning


popUpBtn.addEventListener("click", () => {
    stopAllThenPlayThis(6);
    resultDescription.textContent = "";
    userScore.textContent = 0;
    computerScore.textContent = 0;
    body.removeChild(popUp);
    body.removeChild(overlay);
})


clickableImageList.forEach(eachImage => {
    eachImage.addEventListener('mouseenter', () => {
        const hoverSound = document.querySelector("audio.hover");
        hoverSound.currentTime = 0;
        hoverSound.play();
    })
})


clickableImageList.forEach(eachImage => {
    eachImage.addEventListener('click', (e) => {
        const userChoice = e.srcElement.alt; // Wrong case, but fine as playRound case-insensitive
        const computerChoice = getComputerChoice();
        const txt = playRound(userChoice, computerChoice);
        resultDescription.textContent = txt;
        victoryCheck();
    })
})


const pcChoices = [pcRock, pcPaper, pcScissors, userScore, computerScore]; // Show which is chosen by computer
pcChoices.forEach(choice => {
    choice.addEventListener('transitionend', removeTransition);
})
function removeTransition() {
    this.classList.toggle('active');
}