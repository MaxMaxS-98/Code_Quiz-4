// this is the javascript for the high score page

// this is the function to print the high scores
function printScores() {
    var highScore = JSON.parse(window.localStorage.getItem("highscores"));
    highScore.forEach(function(score) {
      var li = document.createElement("li");
      li.textContent = score.initials + " - " + score.score;
      var ulEl = document.getElementById("highscores");
      ulEl.appendChild(li);
    });
  }
  // this is the function to clear the high scores
  function clearScores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
    document.getElementById("clear").onclick = clearScores;
  }
  
printScores();