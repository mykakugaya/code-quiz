var timer = document.querySelector("#timer");
var mainEl = document.querySelector("#main");
var startBtn = document.querySelector("#button");
var userScore = 0;
var q1 = {
    "question":"Commonly used data types DO NOT include:",
    "choices":["strings", "booleans", "alerts", "numbers"],
    "answer": 2
}
var q2 = {
    "question":"The condition in an if/else statement is enclosed within ________.",
    "choices":["quotes", "curly brackets", "parentheses", "square brackets"],
    "answer": 2
}
var q3 = {
    "question":"Arrays in JavaScript can be used to store ________.",
    "choices":["numbers and strings", "other arrays", "booleans", "all of the above"],
    "answer":3
}
var q4 = {
    "question":"String values must be enclosed within ________ when being assigned to variables.",
    "choices":["commas", "curly brackets", "quotes", "parentheses"],
    "answer":2
}
var q5 = {
    "question":"A very useful tool used during development and debugging for printing content to the debugger is:",
    "choices":["JavaScript", "terminal/bash", "for loops", "console log"],
    "answer":3
}

var questions = [q1, q2, q3, q4, q5];
//saved scores in form of initials:score
var scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : []
var current = 0;
var secondsLeft = 60;
var timerInterval;


//Function to end quiz and submit score
function endQuiz() {
    var quiz = document.getElementById('quiz')
    quiz.innerHTML = "<h2>All done!</h2>"
    var p = document.createElement("p");
    p.textContent = "Your final score is " + userScore;
    quiz.appendChild(p)
     clearInterval(timerInterval)
     quiz.appendChild(document.createElement('input'));
     var btn = document.createElement('button');
     btn.textContent = "SUBMIT";
     quiz.appendChild(btn);
     btn.addEventListener('click', function(){
         var initials = this.previousElementSibling.value;
         scores.push(`${userScore} - ${initials}`)
         localStorage.setItem("scores", JSON.stringify(scores));
     })
   
}



//Function to show next question
function show() {
    //when were on the last index
    if(current === questions.length){
        endQuiz()
    }else{
        //remove content
    document.getElementById('content').style = "display:none"

    //create new content
    // var content = document.createElement("div");
    // content.setAttribute("id", "content");
    // mainEl.appendChild(content);
    var quiz = document.getElementById('quiz');
    //append question and answer choices
    quiz.innerHTML = ''
    var num = questions[current]
    var h2 = document.createElement("h2");
    h2.textContent = num.question;
    quiz.appendChild(h2);

    var ol = document.createElement("ol");
   quiz.appendChild(ol);

    for (i=0; i<num.choices.length; i++) {
        var li = document.createElement("li");
        li.textContent = num.choices[i];
        li.setAttribute("data-index", i);
        ol.appendChild(li);
        li.addEventListener('click', function(event){
            compare(this.getAttribute('data-index'))
        })
    } 
    }
   
}

//Function to determine if answer is correct or incorrect
function compare(index) {
    //if answer chosen==q.answer, show() next q with "Correct!"
   if(index == questions[current].answer){
        userScore += 1
   }else{
       //if answer chosen!==q.answer, show() next q with "Wrong!"
    userScore -= 1; 
   }
  current ++;
  console.log(userScore)
  show()
   
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