var timer = document.querySelector("#timer");
var mainEl = document.querySelector("#main");
var startBtn = document.querySelector("#button");

var q1 = {
    "question":"Commonly used data types DO NOT include:",
    "choices":["strings", "booleans", "alerts", "numbers"],
    "answer":"alerts"
}
var q2 = {
    "question":"The condition in an if/else statement is enclosed within ________.",
    "choices":["quotes", "curly brackets", "parentheses", "square brackets"],
    "answer":"parentheses"
}
var q3 = {
    "question":"Arrays in JavaScript can be used to store ________.",
    "choices":["numbers and strings", "other arrays", "booleans", "all of the above"],
    "answer":"all of the above"
}
var q4 = {
    "question":"String values must be enclosed within ________ when being assigned to variables.",
    "choices":["commas", "curly brackets", "quotes", "parentheses"],
    "answer":"quotes"
}
var q5 = {
    "question":"A very useful tool used during development and debugging for printing content to the debugger is:",
    "choices":["JavaScript", "terminal/bash", "for loops", "console log"],
    "answer":"console log"
}

var questions = [q1, q2, q3, q4, q5];
//saved scores in form of initials:score
var scores = {};

//Function to start quiz
function startQuiz(event) {
    event.preventDefault();
    show();
}

//Function to end quiz and submit score
function endQuiz(event) {
    event.preventDefault();
    mainEl.removeChild();

    var content = document.createElement("div");
    content.setAttribute("id", "content");
    mainEl.appendChild(content);

    var h2 = document.createElement("h2");
    h2.textContent = "All done!"
    content.appendChild(h2);
    var p = document.createElement("p");
    p.textContent = "Your final score is " + userScore;

    localStorage.setItem("scores", JSON.stringify(scores));

}

//Function to show next question
function show(event) {
    event.preventDefault();

    //remove content
    mainEl.removeChild();

    //create new content
    var content = document.createElement("div");
    content.setAttribute("id", "content");
    mainEl.appendChild(content);

    //append question and answer choices
    var num = questions[i]
    var h2 = document.createElement("h2");
    h2.textContent = num.question;
    content.appendChild(h2);

    var ol = document.createElement("ol");
    content.appendChild(ol);

    for (i=0; i<choices.length; i++) {
        var li = document.createElement("li");
        li.textContent = num.choices[i];
        li.setAttribute("data-index", i);
        ol.appendChild(li);
    }
}

//Function to determine if answer is correct or incorrect
function compare(event) {
    event.preventDefault();
    //if answer chosen==q.answer, show() next q with "Correct!"
    userScore += 1
    //if answer chosen!==q.answer, show() next q with "Wrong!"
    userScore -= 1;
}

//Function to start timer
function setTime(event) {
    event.preventDefault();
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0) {
        clearInterval(timerInterval);
        endQuiz();
        }
    }, 1000);
}

startBtn.addEventListener("click", startQuiz());
startBtn.addEventListener("click", setTime());
choiceBtn.addEventListener("click", compare());