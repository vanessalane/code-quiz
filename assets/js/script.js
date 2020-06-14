// get relevant DOM elements
var startButton = document.getElementById("startButton");
var timerElement = document.getElementById("timer");
var scoreElement = document.getElementById("currentScore");
var questionElement = document.getElementById("question-text");
var answersContainerElement = document.getElementById("answers-container");
var answerMessageElement = document.getElementById("answer-message");

// define global variables
var timeLeft = 300000;
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
            {text: "var foo = bar() {console.log('something');}", score: 0},
            {text: "var foo = function() {console.log('something');}", score: 5},
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
    // setup the header
    startButton.style.display = "none";
    scoreElement.textContent = "Score: " + score;
    timerElement.textContent = "Time Left: 5:00";
    // start displaying the questions
    displayQuestion();
    answerMessageElement.textContent = "";
    // start the timer
    runTimer();
}

var runTimer = function() {
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
        if (timeLeft === 0 || questionsAnswered === questions.length) {
            // alert the user if the time ran out
            if (questionsAnswered < questions.length) {
                alert("Time's up!");
            }
            // stop the timer
            clearInterval(timer);
            // prominently display the final score and start button
            questionElement.textContent = "Final Score: " + score;
            answersContainerElement.innerHTML = "";
            startButton.style.display = "inline-block";
        }
    }, 1000);
}

var displayQuestion = function() {
    answerMessageElement.textContent = "";
    if (questionsAnswered < questions.length) {
        // add the question to the dom
        questionElement.textContent = questions[questionsAnswered].question;
        // create the answer elements
        if (answersContainerElement.children.length > 0) {
            answersContainerElement.innerHTML = "";
        }
        for (i=0; i < questions[questionsAnswered].answers.length; i++) {
            var answerButton = document.createElement("button");
            answerButton.className = "answer-button";
            answerButton.id = i;
            answerButton.textContent = questions[questionsAnswered].answers[i].text;
            answersContainerElement.appendChild(answerButton);
        }
    }
}

var answerClickHandler = function(event) {
    // figure out the answer and the score
    var answerId = event.target.id;
    var answerScore = questions[questionsAnswered].answers[answerId].score;
    // apply a 10 second penalty for a wrong answer
    if (answerScore === 0) {
        timeLeft -= 10000;
        answerMessageElement.textContent = "Wrong answer!";
        // clear the answer message after a couple of seconds
        setTimeout(function() {
            answerMessageElement.textContent = "";
        }, 2000)
    } 
    // update the total score based on the answerScore
    else {
        score += answerScore;
        scoreElement.textContent = "Current Score: " + score;
        // display the next question
        questionsAnswered++
        displayQuestion()
    }
}

startButton.addEventListener("click", startQuiz);
answersContainerElement.addEventListener("click", answerClickHandler);