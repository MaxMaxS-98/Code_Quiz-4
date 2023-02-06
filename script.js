// setting var to global scope 
var startEl = document.querySelector("#begin");
var choisesEl = document.querySelector("#choises");
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var submitEl = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// quiz questions
var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings",
       "booleans", 
       "alerts",
        "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: [
        "quotes",
        "curly brackets",
        "parentheses",
        "square brackets"
      ],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title: "String values must be enclosed within ____ when being assigned to variables.",
      choices: [
        "commas",
        "curly brackets",
        "quotes",
        "parentheses"
      ],
      answer: "quotes"
    },
    {
      title: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: [
        "JavaScript",
        "terminal / bash",
        "for loops",
        "console.log"
      ],
      answer: "console.log"
    }
  ];

//this is the main variables for the quiz
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timer;
// this is the function to start the quiz
function startQuiz() {
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timer = setInterval(clock, 1000);
  timerEl.textContent = time;

  getQuestion();
}
// this is the function to get the questions
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choisesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceVar = document.createElement("button");
    choiceVar.setAttribute("class", "choice");
    choiceVar.setAttribute("value", choice);
    choiceVar.textContent = i + 1 + ". " + choice;
    choiceVar.onclick = questionClick;
    choisesEl.appendChild(choiceVar);
  });
}
// this is the function to check the answers
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Try Again!";
    feedbackEl.style.color = "orange";
  } else {
    feedbackEl.textContent = "Nice!";
    feedbackEl.style.color = "purple";
  }
// this is the feedback for the answers
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  currentQuestionIndex++;

  // if all questions are answered end the quiz
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}
// this is the function to end the quiz
function endQuiz() {
  clearInterval(timer);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}
// this is the timer function if the time runs out the quiz ends
function clock() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}
// this is the function to save the highscore
function saveHighscore() {
  var initials = initialsEl.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };
// this will save the new score
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "score.html";
  }
}
// this is the function to check if the user pressed enter
function checkEnter(event) {  
  if (event.key === "Enter") {
    saveHighscore();
  }
}

submitEl.onclick = saveHighscore;
startEl.onclick = startQuiz;
initialsEl.onkeyup = checkEnter;