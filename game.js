const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

var timeEl = document.querySelector(".hud-timer");
var secondsLeft = 60;

let currentQuestion = {};
let acceptingAnwsers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let secondsLeft = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },

    {
        question: "What is the correct syntax for reffering to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js>",
        choice2: "<script name='xxx.js>",
        choice3: "<script src='xxx.js>",
        choice4: "<script file='xxx.js>",
        answer: 3
    },

    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    },
]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ...questions];
    setTimeout()
    getNewQuestion();
}

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
         return window.location.assign('end.html');
      }
  
    }, 1000);
  }

getNewQuestion = () => {

    acceptingAnwsers = true;

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTONS) {
        localStorage.setItem('mostRecentScore', score)
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;

progressText.innerText = `Question ${questionCounter}/${MAX_QUESTONS}`;

// Update the progress bar

progressBarFull.style.width = `${(questionCounter / MAX_QUESTONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnwsers) return;

        acceptingAnwsers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === 'correct') {
            incrementsScore(CORRECT_BONUS);
        } 

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion(); 

        }, 1000);
        
    });
});

incrementsScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();