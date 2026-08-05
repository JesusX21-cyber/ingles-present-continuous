const quizData = [
  {
    question: "1. She _____ (read) a book right now.",
    options: ["is reading", "are reading", "is read"],
    correct: 0
  },
  {
    question: "2. They _____ (play) football in the park.",
    options: ["is playing", "are playing", "are play"],
    correct: 1
  },
  {
    question: "3. Listen! The baby _____ (cry).",
    options: ["is crying", "are crying", "is cry"],
    correct: 0
  },
  {
    question: "4. Look at the spelling rule: 'run' in continuous form is...",
    options: ["runing", "running", "is run"],
    correct: 1
  },
  {
    question: "5. I _____ (study) English at the moment.",
    options: ["am studying", "is studying", "are studying"],
    correct: 0
  },
  {
    question: "6. What _____ you _____ (do) right now?",
    options: ["are / doing", "is / doing", "am / doing"],
    correct: 0
  },
  {
    question: "7. He _____ (not / watch) TV, he is sleeping.",
    options: ["isn't watching", "aren't watching", "not watching"],
    correct: 0
  },
  {
    question: "8. Look! The sun _____ (shine) brightly.",
    options: ["is shining", "is shineing", "are shining"],
    correct: 0
  },
  {
    question: "9. We _____ (have) dinner together right now.",
    options: ["are having", "are haveing", "is having"],
    correct: 0
  },
  {
    question: "10. _____ it _____ (rain) outside?",
    options: ["Is / raining", "Are / raining", "Am / raining"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("questionText");
const optionsElement = document.getElementById("optionsContainer");
const feedbackElement = document.getElementById("feedbackText");
const scoreElement = document.getElementById("scoreText");
const progressFill = document.getElementById("progressFill");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

function initQuiz() {
  currentQuestion = 0;
  score = 0;
  restartBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  feedbackElement.innerText = "";
  nextBtn.disabled = true; // Deshabilitado hasta responder

  const data = quizData[currentQuestion];
  questionElement.innerText = data.question;
  optionsElement.innerHTML = "";

  const progressPercent = (currentQuestion / quizData.length) * 100;
  progressFill.style.width = `${progressPercent}%`;

  scoreElement.innerText = `Puntaje: ${score} / ${quizData.length}`;

  data.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("btn-option");
    button.onclick = () => selectOption(index, button);
    optionsElement.appendChild(button);
  });
}

function selectOption(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;

  const data = quizData[currentQuestion];
  const buttons = optionsElement.children;

  if (selectedIndex === data.correct) {
    score++;
    selectedButton.classList.add("correct");
    feedbackElement.innerText = "¡Correcto! 🎉";
    feedbackElement.style.color = "var(--correct-color)";
  } else {
    selectedButton.classList.add("wrong");
    buttons[data.correct].classList.add("correct");
    feedbackElement.innerText = "Incorrecto 😅";
    feedbackElement.style.color = "var(--wrong-color)";
  }

  scoreElement.innerText = `Puntaje: ${score} / ${quizData.length}`;
  nextBtn.disabled = false; // Se habilita el botón al responder
}

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  progressFill.style.width = "100%";
  questionElement.innerText = "¡Has completado la práctica!";
  optionsElement.innerHTML = "";
  feedbackElement.innerText = `Resultado final: ${score} de ${quizData.length} correctas.`;
  feedbackElement.style.color = "var(--text-color)";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}

initQuiz();