const quizData = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    correct: 0
  },
  {
    question: "Which language is used for styling web pages?",
    answers: ["HTML", "JQuery", "CSS"],
    correct: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    answers: ["React", "Vue", "Python"],
    correct: 2
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["//", "<!-- -->", "#"],
    correct: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;
// where the question text goes.
const questionElement = document.getElementById("question");
// where the answer buttons go.
const answersElement = document.getElementById("answers");
// the "Next" button.
const nextBtn = document.getElementById("nextBtn");
// the result section (hidden until the end)
const resultElement = document.getElementById("result");
// where the final score is shown.
const scoreElement = document.getElementById("score");

function loadQuestion() {
  // clear old answers
  answersElement.innerHTML = "";

  let currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    let button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");
    button.onclick = () => selectAnswer(index);
    answersElement.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  let currentQuestion = quizData[currentQuestionIndex];

  if (selectedIndex === currentQuestion.correct) {
    score++;
  }

  // disable all buttons after choosing
  Array.from(answersElement.children).forEach((btn, index) => {
    btn.disabled = true;
    if (index === currentQuestion.correct) {
      btn.style.background = "green";
    } else if (index === selectedIndex) {
      btn.style.background = "red";
    }
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
    // Hide the quiz section.
  document.getElementById("quiz").classList.add("hidden");
//   Show the result section.
  resultElement.classList.remove("hidden");
//   Display the score → X / total.
  scoreElement.textContent = `${score} / ${quizData.length}`;
}

function restartQuiz() {
    // Go back to the first question.
  currentQuestionIndex = 0;
//   Reset score to 0.
  score = 0;
//   Hide result page, show quiz again.
  resultElement.classList.add("hidden");
//   Load the first question.
  document.getElementById("quiz").classList.remove("hidden");
//   Load the first question.
  loadQuestion();
}

// Start quiz on page load
loadQuestion();
