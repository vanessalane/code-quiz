// get relevant DOM elements
var startButton = document.getElementById("start-quiz");
var saveScoreButton = document.getElementById("save-score");
var timerElement = document.getElementById("timer");
var finalScoreElement = document.getElementById("final-score");
var quizContentElement = document.getElementById("quiz-content");
var questionElement = document.getElementById("question");
var answersContainerElement = document.getElementById("answers-container");
var answerMessageElement = document.getElementById("answer-message");
var highScoreElement = document.getElementById("high-score-content");

// define global variables
var timeLeft;
var score;
var questionsAnswered;
var questions = [
    {
        question: "Which of the following is NOT a valid way to define a JS variable?",
        answers: [
            {text: "var foo;", score: 0, correct: false},
            {text: "var foo = bar;", score: 0, correct: false},
            {text: "let foo = bar;", score: 0, correct: false},
            {text: "foo = bar;", score: 5, correct: true}
        ]
    },
    {
        question: "Which of the following is a valid way to define a JS function?",
        answers: [
            {text: "function foo;", score: 0, correct: false},
            {text: "var foo = bar() {console.log('something');}", score: 0, correct: false},
            {text: "var foo = function() {console.log('something');}", score: 5, correct: true},
            {text: "function() {console.log('something')}", score: 0, correct: false}
        ]
    },
    {
        question: "What does JSON stand for?",
        answers: [
            {text: "JavaScript Object Notation", score: 5, correct: true},
            {text: "JavaScript Online Notes", score: 0, correct: false},
            {text: "JavaScript Outline Network", score: 0, correct: false},
            {text: "JSON does not stand for anything", score: 0, correct: false}
        ]
    },
    {
        question: "True or False: JavaScript arrays are defined with square brackets ([]).",
        answers: [
            {text: "True", score: 5, correct: true},
            {text: "False", score: 0, correct: false}
        ]
    },
    {
        question: "True or False: JavaScript object values must be strings.",
        answers: [
            {text: "True", score: 0, correct: false},
            {text: "False", score: 5, correct: true}
        ]
    }
]
var highScores = [];

var startQuiz = function() {
    // set default values
    timeLeft = 300000;
    score = 0;
    questionsAnswered = 0;
    // hide the final score from the previous game
    finalScoreElement.textContent = "";
    // hide the start and save score buttons
    startButton.style.display = "none";
    saveScoreButton.style.display = "none";
    // display the timer
    timerElement.textContent = "Time Left: 5:00";
    // display the first question
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
            endQuiz();
        }
    }, 1000);
}

var endQuiz = function() {
    // stop displaying the question and answer
    questionElement.textContent = "";
    answersContainerElement.innerHTML = "";
    answerMessageElement.textContent = "";
    // display the user's score
    finalScoreElement.textContent = "Final Score: " + score;
    // display the start game and save score buttons
    startButton.style.display = "inline-block";
    saveScoreButton.style.display = "inline-block";
}

var displayQuestion = function() {
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
    if (answerId === "answers-container") {
        return false;
    } 
    var answerScore = questions[questionsAnswered].answers[answerId].score;
    var correctAnswer = questions[questionsAnswered].answers[answerId].correct;
    // apply a 10 second penalty for a wrong answer
    if (correctAnswer) {
        answerMessageElement.textContent = "Correct!";
    } else {
        timeLeft -= 10000;
        answerMessageElement.textContent = "Wrong!";
    }
    // update the total score based on the answerScore
    score += answerScore;
    // display the next question
    questionsAnswered++
    displayQuestion()
    // clear the answer message after a couple of seconds
    setTimeout(function() {
        answerMessageElement.textContent = "";
    }, 2000)
}

var saveScoreClickHandler = function(event) {
    // create a container to hold the player name form
    var saveScoreForm = document.createElement("form");
    saveScoreForm.class = "save-score-form";
    // create the label for the input
    var playerNameLabel = document.createElement("label");
    playerNameLabel.setAttribute("for", "player-name")
    playerNameLabel.textContent = "Player:"
    saveScoreForm.append(playerNameLabel);
    // create the input
    var playerNameElement = document.createElement("input");
    playerNameElement.type = "text";
    playerNameElement.name = "player-name";
    playerNameElement.placeholder = "Name or Initials";
    saveScoreForm.append(playerNameElement);
    // create the button
    var playerNameSubmit = document.createElement("button");
    playerNameSubmit.type = "submit";
    playerNameSubmit.textContent = "Save My Score"
    saveScoreForm.append(playerNameSubmit);
    // hide the other button
    saveScoreButton.style.display = "none";
    // add the form to the DOM
    highScoreElement.append(saveScoreForm);
}

var saveScoreFormHandler = function(event) {
    event.preventDefault();
    var playerName = event.target.querySelector("input[name='player-name']").value;
    if (!playerName) {
        playerName = "Anonymous";
    }
    // create the score object
    var scoreObject = {
        player: playerName,
        score: score
    }
    // add it to the highScores array
    highScores.push(scoreObject);
    // add it to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // hide the form
    highScoreElement.innerHTML = '';
}

startButton.addEventListener("click", startQuiz);
answersContainerElement.addEventListener("click", answerClickHandler);
saveScoreButton.addEventListener("click", saveScoreClickHandler);
highScoreElement.addEventListener("submit", saveScoreFormHandler);