// DOM elements
var headingElement = document.getElementById("quiz-heading");
var leaderboardButton = document.getElementById("leaderboard-button");
var startQuizButton = document.getElementById("start-quiz-button");
var homeButton = document.getElementById("home-button");
var questionContainer = document.getElementById("question-container");
var answersContainer = document.getElementById("answers-container");
var highScoreFormSection = document.getElementById("high-score-form");
var finalScoreContainer = document.getElementById("final-score-container");
var leaderboardSection = document.getElementById("leaderboard");
var timerElement = document.getElementById("timer");

// other global variables
var score;
var timeLeft;
var timerInterval;
var highScore = 0;
var highScores = [];
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

var startQuiz = function() {
    resetQuiz();
    // hide the start and leaderboard buttons
    startQuizButton.style.display = "none";
    leaderboardButton.style.display = "none";
    // show the exit quiz button
    homeButton.style.display = "inline-block";
    // display the timer
    timerElement.innerHTML = "<h3>Time Remaining: 5:00</h3>";
    // display the first question
    displayQuestion();
    // start the timer
    runTimer();
}

var runTimer = function() {
    timerInterval = setInterval(function () {
        timeLeft = timeLeft - 1000;
        // parse the time so that it's easier for the user to read
        let minutesLeft = Math.floor(timeLeft/60000);
        let secondsLeft = (timeLeft % 60000)/1000;
        if (secondsLeft < 10) {
            secondsLeft = "0" + secondsLeft;
        }
        timerElement.innerHTML = "<h3>Time Remaining: " + minutesLeft + ":" + secondsLeft + "</h3>";
        // stop the timer once it runs out
        if (timeLeft === 0 || questionsAnswered === questions.length) {
            // alert the user if the time ran out
            if (questionsAnswered < questions.length) {
                alert("Time's up!");
            }
            // stop the timer
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

var displayQuestion = function() {
    if (questionsAnswered < questions.length) {
        // add the question to the dom
        questionContainer.innerHTML = "<h2>" + questions[questionsAnswered].question + "</h2>";
        // create the answer elements
        answersContainer.className = "buttons-container";
        if (answersContainer.children.length > 0) {
            answersContainer.innerHTML = "";
        }
        for (let i=0; i < questions[questionsAnswered].answers.length; i++) {
            var answerButton = document.createElement("button");
            answerButton.className = "answer-button";
            answerButton.id = i;
            answerButton.textContent = questions[questionsAnswered].answers[i].text;
            answersContainer.appendChild(answerButton);
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
    // apply a 10 second penalty for a wrong answer and display a message
    if (!correctAnswer) {
        timeLeft -= 10000;
    }
    // update the total score based on the answerScore
    score += answerScore;
    // display the next question
    questionsAnswered++;
    displayQuestion();
}

var endQuiz = function() {
    // stop displaying the question and answer
    questionContainer.innerHTML = "";
    answersContainer.innerHTML = "";
    answersContainer.className = "";
    // display the user's score
    finalScoreContainer.innerHTML = "<h3>Final Score: " + score + " points</h3>";
    // give the user the option to retake the quiz
    startQuizButton.style.display = "inline-block";
    startQuizButton.textContent = "Retake Quiz"
    // handle high scores
    if (score >= highScore) {
        highScore = score;
    }
    displayHighScoreForm();
}

var displayHighScoreForm = function() {
    // add the title to the form
    highScoreFormSection.innerHTML = "<h2>Add your score to the leaderboard!</h2>";

    // create a container to hold the player name form
    var highScoreForm = document.createElement("form");
    highScoreForm.class = "save-score-form";
    
    // create a container for the form elements
    var highScoreFormElements = document.createElement("div");
    highScoreFormElements.className = "form-elements-container";

    // create the label for the input
    var playerNameLabel = document.createElement("label");
    playerNameLabel.setAttribute("for", "player-name")
    playerNameLabel.textContent = "Player:"
    highScoreFormElements.append(playerNameLabel);

    // create the input
    var playerNameElement = document.createElement("input");
    playerNameElement.type = "text";
    playerNameElement.name = "player-name";
    playerNameElement.placeholder = "Name or Initials";
    highScoreFormElements.append(playerNameElement);

    // create the button
    var playerNameSubmit = document.createElement("button");
    playerNameSubmit.type = "submit";
    playerNameSubmit.className = "form-button";
    playerNameSubmit.textContent = "Save";
    highScoreFormElements.append(playerNameSubmit);

    // add the form to the DOM
    highScoreForm.append(highScoreFormElements);
    highScoreFormSection.append(highScoreForm);
}

var highScoreSubmitHandler = function(event) {
    event.preventDefault();
    // create the score object
    var playerName = event.target.querySelector("input[name='player-name']").value;
    if (!playerName) {
        playerName = "Anonymous";
    }
    // get the time the score was recorded
    var timestamp = new Date();
    var date = (timestamp.getMonth() + 1) + "/" + timestamp.getDate() + '/' + timestamp.getFullYear();
    var scoreObject = {
        player: playerName,
        score: score,
        date: date
    }
    // add it to the highScores array
    if (score > highScore) {
        highScore = score;
    }
    highScores.push(scoreObject);
    // get other scores from localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // hide the form
    highScoreFormSection.innerHTML = '';
    // display the leaderboard instead
    displayLeaderboard();
}

var displayLeaderboard = function() {
    // reset the buttons and title
    resetQuiz();

    // hide the leaderboard since we're already on it
    headingElement.textContent = "Leaderboard";
    leaderboardButton.style.display = "none";

    // update the startQuizButton and homeButton elements
    startQuizButton.textContent="Retake the Quiz";
    homeButton.style.display="inline-block";

    // get all of the scores from localStorage
    var loadedScores = JSON.parse(localStorage.getItem("highScores"));

    if (!loadedScores) {
        leaderboardSection.innerHTML = "<p>No scores saved!</p>";
    } else {
        // sort the score objects based on score
        loadedScores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        // create the list element
        var scoresList = document.createElement("ol");
        scoresList.className = "scores-list";
        for (let i = 0; i < loadedScores.length; i++) {
            // create the container and high score information
            var scoreListItem = document.createElement("li");
            scoreListItem.class="score";
            scoreListItem.innerHTML = "<p class='high-score-player'>" + loadedScores[i].player + " - " + loadedScores[i].score + " points - " + loadedScores[i].date + "</p>";
            // append the container to the high scores
            scoresList.append(scoreListItem);
        }
        // append the list to the leaderboard section
        leaderboardSection.appendChild(scoresList);

        // create clear high scores button and append to the end of the leaderboard
        var clearLeaderboardButton = document.createElement("button");
        clearLeaderboardButton.className = "leaderboard-button";
        clearLeaderboardButton.textContent = "Clear High Scores";
        clearLeaderboardButton.onclick = clearLeaderboard;
        leaderboardSection.appendChild(clearLeaderboardButton);
    } 
}

var clearLeaderboard = function() {
    localStorage.clear();
    resetQuiz();
}

var resetQuiz = function() {
    // stop the timer
    clearInterval(timerInterval);
    timerElement.innerHTML = "";

    // reset the title
    headingElement.textContent = "JavaScript Quiz";

    // reset the navigation buttons
    leaderboardButton.style.display = "inline-block";
    startQuizButton.style.display = "inline-block";
    startQuizButton.textContent = "Start Quiz";
    homeButton.style.display = "none";

    // clear out the quiz container
    questionContainer.innerHTML = "";
    answersContainer.innerHTML = "";
    finalScoreContainer.innerHTML = "";

    // clear the high score form container
    highScoreFormSection.innerHTML = "";

    // clear the leaderboard container
    leaderboardSection.innerHTML = "";

    // set default values
    timeLeft = 300000;
    score = 0;
    questionsAnswered = 0;
}

homeButton.addEventListener("click", resetQuiz);
startQuizButton.addEventListener("click", startQuiz);
leaderboardButton.addEventListener("click", displayLeaderboard);
answersContainer.addEventListener("click", answerClickHandler);
highScoreFormSection.addEventListener("submit", highScoreSubmitHandler);
