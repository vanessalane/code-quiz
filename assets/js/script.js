// get relevant DOM elements
var startButton = document.getElementById("startButton");
var timerElement = document.getElementById("timer");

// define global variables
var score = 0;
var questionsAnswered = 0;

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