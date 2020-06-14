// get relevant DOM elements
var startButton = document.getElementById("startButton");
var timerElement = document.getElementById("timer");
var scoreElement = document.getElementById("score");
var questionElement = document.getElementById("question-text");
var answersContainerElement = document.getElementById("answers-container");

// define global variables
var score = 0;
var questionsAnswered = 0;
var questions = [
    {
        question: "Which of the following is NOT a valid way to define a JS variable?",
        answers: [
            {text: "var foo;", score: 0},
            {text: "var foo = bar;", score: 0},
            {text: "let foo = bar;", score: 0},
            {text: "foo = bar;", score: 5},
        ]
    },
    {
        question: "Which of the following is a valid way to define a JS function?",
        answers: [
            {text: "function foo;", score: 5},
            {text: "var foo = bar() {console.log('something');}", score: 5},
            {text: "var foo = function() {console.log('something');}", score: 0},
            {text: "function() {console.log('something')}", score: 0},
        ]
    },
    {
        question: "What does JSON stand for?",
        answers: [
            {text: "JavaScript Object Notation", score: 5},
            {text: "JavaScript Online Notes", score: 0},
            {text: "JavaScript Outline Network", score: 0},
            {text: "JSON does not stand for anything", score: 0},
        ]
    },
    {
        question: "True or False: JavaScript arrays are defined with square brackets ([]).",
        answers: [
            {text: "True", score: 5},
            {text: "False", score: 0}
        ]
    },
    {
        question: "True or False: JavaScript object values must be strings.",
        answers: [
            {text: "True", score: 0},
            {text: "False", score: 5}
        ]
    }
]

var startQuiz = function() {
    startButton.style.display = "none";
    timerElement.textContent = "Time Left: 5:00";
    displayQuestion();
    var timeLeft = 300000;
    var timer = setInterval(function () {
        timeLeft = timeLeft - 1000;
        // parse the time so that it's easier for the user to read
        let minutesLeft = Math.floor(timeLeft/60000);
        let secondsLeft = (timeLeft % 60000)/1000;
        if (secondsLeft < 10) {
            secondsLeft = "0" + secondsLeft;
        }
        timerElement.textContent = "Time Left: " + minutesLeft + ":" + secondsLeft;
        // stop the timer once it runs out
        if (timeLeft == 0) {
            timerElement.textContent = "Time Left: 0:00";
            clearInterval(timer);
            alert("Time's Up!");
            startButton.style.display = "inline-block";
        }
    }, 1000);
}

var displayQuestion = function() {
    // add the question to the dom
    questionElement.textContent = questions[0].question;
    // create the answer elements
    for (i=0; i < questions[0].answers.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.class = "answer-button";
        answerButton.id = i;
        answerButton.textContent = questions[0].answers[i].text;
        console.log(answerButton);
        answersContainerElement.appendChild(answerButton);
    }
}

startButton.addEventListener("click", startQuiz);