// get relevant DOM elements
var startButton = document.getElementById("startButton");
var timerElement = document.getElementById("timer");

// define global variables
var score = 0;
var questionsAnswered = 0;
var questions = [
    {
        question: "Which of the following is NOT a valid way to define a JS variable?",
        answers: [
            {answer: "var foo;", score: 0},
            {answer: "var foo = bar;", score: 0},
            {answer: "let foo = bar;", score: 0},
            {answer: "foo = bar;", score: 5},
        ]
    },
    {
        question: "Which of the following is a valid way to define a JS function?",
        answers: [
            {answer: "function foo;", score: 5},
            {answer: "var foo = bar() {console.log('something');}", score: 5},
            {answer: "var foo = function() {console.log('something');}", score: 0},
            {answer: "function() {console.log('something')}", score: 0},
        ]
    },
    {
        question: "What does JSON stand for?",
        answers: [
            {answer: "JavaScript Object Notation", score: 5},
            {answer: "JavaScript Online Notes", score: 0},
            {answer: "JavaScript Outline Network", score: 0},
            {answer: "JSON does not stand for anything", score: 0},
        ]
    },
    {
        question: "True or False: JavaScript arrays are defined with square brackets ([]).",
        answers: [
            {answer: "True", score: 5},
            {answer: "False", score: 0}
        ]
    },
    {
        question: "True or False: JavaScript object values must be strings.",
        answers: [
            {answer: "True", score: 0},
            {answer: "False", score: 5}
        ]
    }
]

var startQuiz = function() {
    var timeLeft = 300000;
    var timer = setInterval(function () {
        // parse the time so that it's easier for the user to read
        timeLeft = timeLeft - 1000;
        let minutesLeft = Math.floor(timeLeft/60000);
        let secondsLeft = (timeLeft % 60000)/1000;
        if (secondsLeft < 10) {
            secondsLeft = "0" + secondsLeft;
        }
        timerElement.textContent = "Time Left: " + minutesLeft + ":" + secondsLeft;
        console.log(timeLeft);
        // stop the timer once it runs out
        if (timeLeft == 0) {
            timerElement.textContent = "Time Left: 0:00";
            clearInterval(timer);
            alert("Time's Up!");
        }
    }, 1000);
}

startButton.addEventListener("click", startQuiz);