var scoresList = document.querySelector("#scoreslist");
var blank = document.querySelector("#blank");

//Function to create and show highscore list
function showList() {
    //sorts scores from highest to lowest
    var scores = localStorage.getItem("scores");
    scores = JSON.parse(scores).sort((a,b)=> Number(a.split(' - ')[0]) <  Number(b.split(' - ')[0]) ? 1 :
    Number(a.split(' - ')[0]) >  Number(b.split(' - ')[0]) ? -1 : 0);

    //creates ordered list of initials with corresponding scores
    if (scores.length==0) {
        return;
    }
    else{
        for (i=0; i<scores.length; i++) {
            var li = document.createElement("li");
            li.textContent = (i+1) + ". " + scores[i].split(' - ')[1] + " : " + scores[i].split(' - ')[0];
            li.setAttribute("data-index", i);
            scoresList.appendChild(li);
        }
    }
}

showList();

//Function to clear highscore list
var clearBtn = document.querySelector("#clearbutton");

clearBtn.addEventListener("click", function() {
    if (scores.length!==0) {
        for (i=0; i<scores.length; i++) {
            localStorage.clear("scores");
            showList();
        }
    }
})