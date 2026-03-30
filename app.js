const QUESTION_TIME = 10;
const LEADERBOARD_KEY = "montseQuizLeaderboard";
const QUESTIONS_PATH = "questions.json";
const QUESTIONS_PER_GAME = 10;

const screens = {
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen"),
};

const startForm = document.getElementById("start-form");
const startBtn = startForm.querySelector("button[type='submit']");
const loadStatus = document.getElementById("load-status");
const playerInput = document.getElementById("player-name");
const playerHud = document.getElementById("hud-player");
const scoreHud = document.getElementById("hud-score");
const timerHud = document.getElementById("hud-timer");
const questionCount = document.getElementById("question-count");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const answersWrap = document.getElementById("answers");
const feedback = document.getElementById("round-feedback");
const nextBtn = document.getElementById("next-btn");
const questionImage = document.getElementById("question-image");
const questionImageCaption = document.getElementById("question-image-caption");
const resultTitle = document.getElementById("result-title");
const resultScore = document.getElementById("result-score");
const restartBtn = document.getElementById("restart-btn");
const podiumList = document.getElementById("podium-list");

let questionBank = [];
let gameQuestions = [];
let playerName = "";
let score = 0;
let currentQuestion = 0;
let timeLeft = QUESTION_TIME;
let timer = null;
let locked = false;
let audioCtx = null;

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function shuffle(array) {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function ensureAudioContext() {
  if (!audioCtx) {
    const AudioConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioConstructor) return false;
    audioCtx = new AudioConstructor();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return true;
}

function playTone({ frequency, duration, type = "sine", start = 0, volume = 0.08 }) {
  if (!audioCtx) return;

  const startAt = audioCtx.currentTime + start;
  const endAt = startAt + duration;
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, endAt);

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start(startAt);
  oscillator.stop(endAt);
}

function playCorrectSound() {
  playTone({ frequency: 740, duration: 0.13, type: "triangle", volume: 0.06 });
  playTone({ frequency: 988, duration: 0.18, type: "triangle", start: 0.1, volume: 0.07 });
}

function playErrorSound() {
  playTone({ frequency: 280, duration: 0.18, type: "sawtooth", volume: 0.05 });
  playTone({ frequency: 190, duration: 0.22, type: "sawtooth", start: 0.11, volume: 0.05 });
}

function playFinalSound() {
  playTone({ frequency: 523, duration: 0.16, type: "triangle", volume: 0.06 });
  playTone({ frequency: 659, duration: 0.16, type: "triangle", start: 0.14, volume: 0.06 });
  playTone({ frequency: 784, duration: 0.2, type: "triangle", start: 0.28, volume: 0.07 });
  playTone({ frequency: 1046, duration: 0.34, type: "triangle", start: 0.46, volume: 0.08 });
}

function startTimer() {
  clearInterval(timer);
  timeLeft = QUESTION_TIME;
  timerHud.textContent = String(timeLeft);
  timer = setInterval(() => {
    timeLeft -= 1;
    timerHud.textContent = String(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      evaluateAnswer(null);
    }
  }, 1000);
}

function scoreFromTime(secondsLeft) {
  return Math.max(150, secondsLeft * 50);
}

function renderQuestion() {
  locked = false;
  feedback.textContent = "";
  nextBtn.hidden = true;

  const item = gameQuestions[currentQuestion];
  const percent = ((currentQuestion + 1) / gameQuestions.length) * 100;
  const imageData = {
    src: item.image,
    caption: item.imageCaption || "Imagen de referencia de opusdei.org",
  };

  questionCount.textContent = `Pregunta ${currentQuestion + 1} / ${gameQuestions.length}`;
  progressBar.style.width = `${percent}%`;
  questionText.textContent = item.text;
  questionImage.src = imageData.src;
  questionImage.alt = `Imagen para la pregunta ${currentQuestion + 1}`;
  questionImageCaption.textContent = imageData.caption;
  answersWrap.innerHTML = "";

  const mixed = shuffle(item.options);
  mixed.forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.type = "button";
    button.textContent = option;
    button.dataset.correct = String(option === item.answer);
    button.addEventListener("click", () => {
      ensureAudioContext();
      evaluateAnswer(button);
    });
    answersWrap.appendChild(button);
  });

  startTimer();
}

function evaluateAnswer(selectedButton) {
  if (locked) return;
  locked = true;
  clearInterval(timer);

  const buttons = [...answersWrap.querySelectorAll(".answer-btn")];
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  if (!selectedButton) {
    playErrorSound();
    feedback.textContent = "Sin respuesta. La correcta se marco en verde.";
    feedback.style.color = "#ffd27d";
  } else if (selectedButton.dataset.correct === "true") {
    const gained = scoreFromTime(timeLeft);
    score += gained;
    scoreHud.textContent = String(score);
    selectedButton.classList.add("correct");
    playCorrectSound();
    feedback.textContent = `Correcto +${gained} puntos`;
    feedback.style.color = "#76f3b8";
  } else {
    selectedButton.classList.add("incorrect");
    playErrorSound();
    feedback.textContent = "No era esa. Te recuperas en la siguiente.";
    feedback.style.color = "#ff9c96";
  }

  nextBtn.hidden = false;
}

function getLeaderboard() {
  const raw = localStorage.getItem(LEADERBOARD_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveOnLeaderboard(name, points) {
  const data = getLeaderboard();
  data.push({ name, points, playedAt: Date.now() });
  data.sort((a, b) => b.points - a.points);
  const top5 = data.slice(0, 5);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top5));
  return top5;
}

function renderPodium(data) {
  podiumList.innerHTML = "";
  data.forEach((entry, index) => {
    const li = document.createElement("li");
    const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "⭐";
    li.textContent = `${medal} ${entry.name} - ${entry.points} pts`;
    podiumList.appendChild(li);
  });
}

function finishGame() {
  clearInterval(timer);
  const top = saveOnLeaderboard(playerName, score);
  const maxScore = gameQuestions.length * scoreFromTime(QUESTION_TIME);
  const ratio = Math.round((score / maxScore) * 100);

  resultTitle.textContent = ratio >= 75 ? "Nivel experto" : ratio >= 45 ? "Buen recorrido" : "Sigue practicando";
  resultScore.textContent = `${playerName}, cerraste con ${score} puntos (${ratio}% de rendimiento).`;
  renderPodium(top);
  playFinalSound();
  showScreen("result");
}

function nextQuestion() {
  currentQuestion += 1;
  if (currentQuestion >= gameQuestions.length) {
    finishGame();
    return;
  }
  renderQuestion();
}

function resetGame() {
  score = 0;
  currentQuestion = 0;
  const shuffled = shuffle(questionBank);
  const usedImages = new Set();
  const uniqueImageQuestions = [];

  shuffled.forEach((question) => {
    if (uniqueImageQuestions.length >= QUESTIONS_PER_GAME) return;
    if (usedImages.has(question.image)) return;
    usedImages.add(question.image);
    uniqueImageQuestions.push(question);
  });

  if (uniqueImageQuestions.length < QUESTIONS_PER_GAME) {
    shuffled.forEach((question) => {
      if (uniqueImageQuestions.length >= QUESTIONS_PER_GAME) return;
      if (uniqueImageQuestions.includes(question)) return;
      uniqueImageQuestions.push(question);
    });
  }

  gameQuestions = uniqueImageQuestions;
  scoreHud.textContent = "0";
  showScreen("quiz");
  renderQuestion();
}

function validateQuestions(data) {
  if (!Array.isArray(data) || data.length < QUESTIONS_PER_GAME) {
    return false;
  }

  return data.every((item) => {
    if (!item || typeof item !== "object") return false;
    if (typeof item.text !== "string" || !item.text.trim()) return false;
    if (!Array.isArray(item.options) || item.options.length < 2) return false;
    if (typeof item.answer !== "string" || !item.answer.trim()) return false;
    if (typeof item.image !== "string" || !item.image.trim()) return false;
    return item.options.includes(item.answer);
  });
}

async function loadQuestions() {
  startBtn.disabled = true;
  loadStatus.textContent = "Cargando preguntas...";

  try {
    const response = await fetch(QUESTIONS_PATH, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!validateQuestions(data)) {
      throw new Error("Formato invalido en questions.json");
    }

    questionBank = data;
    loadStatus.textContent = `${questionBank.length} preguntas cargadas (10 aleatorias por partida).`;
    loadStatus.style.color = "#76f3b8";
    startBtn.disabled = false;
  } catch (error) {
    loadStatus.textContent = "No se pudieron cargar las preguntas. Revisa questions.json.";
    loadStatus.style.color = "#ff9c96";
    console.error("Error cargando preguntas:", error);
  }
}

startForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (questionBank.length === 0) return;

  ensureAudioContext();
  playerName = playerInput.value.trim() || "Invitado";
  playerHud.textContent = playerName;
  resetGame();
});

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", () => {
  showScreen("start");
  playerInput.focus();
});

loadQuestions();
