var scoresList = document.querySelector("#scoreslist");

//Function to create and show highscore list
//how to make them ordered?
function showList() {
    var scores = localStorage.getItem("scores");
    scores = JSON.parse(scores).sort((a,b)=> Number(a.split(' - ')[0]) <  Number(b.split(' - ')[0]) ? 1 :
    Number(a.split(' - ')[0]) >  Number(b.split(' - ')[0]) ? -1 : 0)
    console.log(scores)
    // if (scores!==null) {
    //     var item = scores[i];
    //     for (i=0; i<scores.length; i++) {
    //         var li = document.createElement("li");
    //         li.textContent = item;
    //         li.setAttribute("data-index", i);
    //         scoresList.appendChild(li);
    //     }  
    // }
    // else {
    //     return;
    // }
    //scores.map, scores.forEach  for(let i=0) for(let score of scores){}
}

showList()

//Function to clear highscore list
var clearBtn = document.querySelector("#clearbutton");

clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var blank = document.querySelector("#blank");
    blank.removeChild();
    blank.createElement("ol");
    blank.child[0].setAttribute("id", "scoreslist");
})