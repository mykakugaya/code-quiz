var timer = document.querySelector("#timer");
var mainEl = document.querySelector("#main");
var startBtn = document.querySelector("#button");
var userScore = 0;
//Questions with choices and correct answer index
var q1 = {
    "question":"Commonly used data types DO NOT include:",
    "choices":["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    "answer":2
}
var q2 = {
    "question":"The condition in an if/else statement is enclosed within ________.",
    "choices":["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    "answer":2
}
var q3 = {
    "question":"Arrays in JavaScript can be used to store ________.",
    "choices":["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    "answer":3
}
var q4 = {
    "question":"String values must be enclosed within ________ when being assigned to variables.",
    "choices":["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    "answer":2
}
var q5 = {
    "question":"A very useful tool used during development and debugging for printing content to the debugger is:",
    "choices":["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console log"],
    "answer":3
}
//Questions array
var questions = [q1, q2, q3, q4, q5];
//Saved scores array in form of score-initials
var scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : []

var current = 0;
var secondsLeft = 60;
var timerInterval;

//Function to end quiz and submit score
function endQuiz() {
    //Stop timer
    secondsLeft = 0;
    clearInterval(timerInterval);
    
    //Show final score
    var quiz = document.getElementById('quiz');
    quiz.innerHTML = "<h4>All done!</h4>";
    var p = document.createElement("p");
    p.textContent = "Your final score is " + userScore + ".";
    quiz.appendChild(p);
    
    //Initials input
    var p2 = document.createElement("p");
    p2.textContent = "Enter initials: ";
    quiz.appendChild(p2);
    quiz.appendChild(document.createElement('input'));
    var btn = document.createElement('button');
    btn.textContent = "Submit";
    quiz.appendChild(btn);

    //Push items to scores array
    btn.addEventListener('click', function() {
        var initials = this.previousElementSibling.value;
        scores.push(`${userScore} - ${initials}`);
        localStorage.setItem("scores", JSON.stringify(scores));
        window.location.href="highscores.html";
     })
}

//Function to show next question
function show() {
    //when past the last index
    if(current === questions.length){
        endQuiz();
    }
    else{
        //remove content section of start page
        document.getElementById('content').style = "display:none";

        var quiz = document.getElementById('quiz');
        //append question and answer choices to quiz section
        quiz.innerHTML = ''
        var num = questions[current]
        var h4 = document.createElement("h4");
        h4.textContent = num.question;
        quiz.appendChild(h4);

        var ul = document.createElement("ul");
        quiz.appendChild(ul);

        for (i=0; i<num.choices.length; i++) {
            var li = document.createElement("li");
            li.textContent = num.choices[i];
            li.setAttribute("data-index", i);
            ul.appendChild(li);
            li.addEventListener('click', function(event){
                compare(this.getAttribute('data-index'))
            })
        }
        
        //if last answer was correct, show "Correct!"
        //if last answer was incorrect, show "Wrong!"
    } 
}

//Function to determine if answer is correct or incorrect
function compare(index) {
    //if answer chosen is correct, score +1
    if(index == questions[current].answer){
        userScore += 1;
    }
    //if answer chosen is incorrect, score -1
    else{
        userScore -= 1; 
    }
    current ++;
    show();
}

//Function to start timer
function setTime(event) {
    event.preventDefault();
    timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0) {
            endQuiz();
        }
    }, 1000);
}

startBtn.addEventListener("click", show);
startBtn.addEventListener("click", setTime);