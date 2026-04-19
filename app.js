const QUESTION_TIME = 10;
const QUESTION_BANK_KEY = "montseQuizQuestionBank";
const COMPLETION_COUNT_KEY = "montseQuizCompletionCount";
const QUESTIONS_PATH = "questions.json";
const QUESTIONS_PER_GAME = 10;
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
const ADMIN_PASSWORD = "montse-admin";

const screens = {
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen"),
};

const startForm = document.getElementById("start-form");
const startBtn = startForm.querySelector("button[type='submit']");
const loadStatus = document.getElementById("load-status");
const completionCount = document.getElementById("completion-count");
const adminToggleBtn = document.getElementById("admin-toggle-btn");
const adminStatus = document.getElementById("admin-status");
const assetPanel = document.getElementById("asset-panel");
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
const questionShot = questionImage.closest(".question-shot");
const resultTitle = document.getElementById("result-title");
const resultScore = document.getElementById("result-score");
const restartBtn = document.getElementById("restart-btn");
const resultCompletionCount = document.getElementById("result-completion-count");
const imageForm = document.getElementById("image-form");
const imageQuestionSelect = document.getElementById("image-question-select");
const newQuestionBtn = document.getElementById("new-question-btn");
const exportQuestionsBtn = document.getElementById("export-questions-btn");
const importQuestionsInput = document.getElementById("import-questions-input");
const questionTextInput = document.getElementById("question-text-input");
const optionInputs = [...document.querySelectorAll(".option-input")];
const answerSelect = document.getElementById("answer-select");
const imageCaptionInput = document.getElementById("image-caption-input");
const imageFileInput = document.getElementById("image-file-input");
const clearImageBtn = document.getElementById("clear-image-btn");
const deleteQuestionBtn = document.getElementById("delete-question-btn");
const imageFormStatus = document.getElementById("image-form-status");
const customPreview = document.getElementById("custom-preview");
const customPreviewImage = document.getElementById("custom-preview-image");
const customPreviewCaption = document.getElementById("custom-preview-caption");

let questionBank = [];
let gameQuestions = [];
let score = 0;
let currentQuestion = 0;
let timeLeft = QUESTION_TIME;
let timer = null;
let locked = false;
let audioCtx = null;
let completedGames = 0;
let isAdminMode = false;

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function getQuestionId(index) {
  return `question-${index + 1}`;
}

function hydrateQuestions(data) {
  return data.map((item, index) => ({
    ...item,
    id: getQuestionId(index),
  }));
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

function stripQuestionIds(data) {
  return data.map(({ id, ...question }) => question);
}

function getImageData(item) {
  return {
    src: item.image,
    caption: item.imageCaption || "Imagen de referencia de opusdei.org",
  };
}

function refreshQuestionBankStatus() {
  const isPlayable = questionBank.length >= QUESTIONS_PER_GAME;
  startBtn.disabled = !isPlayable;

  if (questionBank.length === 0) {
    loadStatus.textContent = "No hay preguntas cargadas todavia.";
    loadStatus.style.color = "#ff9c96";
    return;
  }

  if (!isPlayable) {
    loadStatus.textContent = `Hay ${questionBank.length} preguntas. Necesitas al menos ${QUESTIONS_PER_GAME} para jugar.`;
    loadStatus.style.color = "#ff9c96";
    return;
  }

  loadStatus.textContent = `${questionBank.length} preguntas cargadas (${QUESTIONS_PER_GAME} aleatorias por partida).`;
  loadStatus.style.color = "#76f3b8";
}

function renderQuestion() {
  locked = false;
  feedback.textContent = "";
  nextBtn.hidden = true;

  const item = gameQuestions[currentQuestion];
  const percent = ((currentQuestion + 1) / gameQuestions.length) * 100;
  const imageData = getImageData(item);

  questionCount.textContent = `Pregunta ${currentQuestion + 1} / ${gameQuestions.length}`;
  progressBar.style.width = `${percent}%`;
  questionText.textContent = item.text;
  questionImage.src = imageData.src;
  questionImage.alt = `Imagen para la pregunta ${currentQuestion + 1}`;
  questionImageCaption.textContent = imageData.caption;
  questionShot.hidden = !imageData.src;
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

function getStoredQuestionBank() {
  const raw = localStorage.getItem(QUESTION_BANK_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return validateQuestions(parsed, { requirePlayable: false }) ? hydrateQuestions(parsed) : null;
  } catch {
    return null;
  }
}

function saveQuestionBank() {
  localStorage.setItem(QUESTION_BANK_KEY, JSON.stringify(stripQuestionIds(questionBank)));
}

function getCompletedGames() {
  const raw = Number(localStorage.getItem(COMPLETION_COUNT_KEY));
  return Number.isFinite(raw) && raw >= 0 ? raw : 0;
}

function saveCompletedGames() {
  localStorage.setItem(COMPLETION_COUNT_KEY, String(completedGames));
}

function renderCompletedGames() {
  const label = `Cuestionarios completados en este dispositivo: ${completedGames}`;
  completionCount.textContent = label;
  resultCompletionCount.textContent = label;
}

function populateQuestionSelect() {
  imageQuestionSelect.innerHTML = '<option value="">Selecciona una pregunta</option>';

  questionBank.forEach((question, index) => {
    const option = document.createElement("option");
    option.value = question.id;
    option.textContent = `${index + 1}. ${question.text}`;
    imageQuestionSelect.appendChild(option);
  });
}

function updateCustomPreview() {
  const selectedId = imageQuestionSelect.value;
  const question = getQuestionById(selectedId);
  if (!question || !question.image) {
    customPreview.hidden = true;
    customPreviewImage.src = "";
    customPreviewCaption.textContent = "";
    return;
  }

  customPreview.hidden = false;
  customPreviewImage.src = question.image;
  customPreviewCaption.textContent = question.imageCaption || "Imagen de referencia de opusdei.org";
}

function getQuestionById(questionId) {
  return questionBank.find((question) => question.id === questionId) || null;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.readAsDataURL(file);
  });
}

function resetEditorForm() {
  imageQuestionSelect.value = "";
  questionTextInput.value = "";
  optionInputs.forEach((input) => {
    input.value = "";
  });
  answerSelect.value = "";
  imageCaptionInput.value = "";
  imageFileInput.value = "";
  imageFormStatus.textContent = "";
  imageFormStatus.style.color = "#7a5a2b";
  updateCustomPreview();
}

function fillEditorForm(question) {
  if (!question) {
    resetEditorForm();
    return;
  }

  imageQuestionSelect.value = question.id;
  questionTextInput.value = question.text;
  optionInputs.forEach((input, index) => {
    input.value = question.options[index] || "";
  });
  answerSelect.value = String(question.options.findIndex((option) => option === question.answer));
  imageCaptionInput.value = question.imageCaption || "";
  imageFileInput.value = "";
  imageFormStatus.textContent = "Editando una pregunta existente.";
  imageFormStatus.style.color = "#31547b";
  updateCustomPreview();
}

function buildQuestionPayload(existingQuestion = null) {
  const text = questionTextInput.value.trim();
  const options = optionInputs.map((input) => input.value.trim());
  const answerIndex = Number(answerSelect.value);
  const hasEmptyOption = options.some((option) => !option);

  if (!text || hasEmptyOption || !Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length) {
    throw new Error("Completa la pregunta, las cuatro opciones y la respuesta correcta.");
  }

  return {
    id: existingQuestion?.id || getQuestionId(Date.now()),
    text,
    options,
    answer: options[answerIndex],
    image: existingQuestion?.image || "",
    imageCaption: imageCaptionInput.value.trim() || "Imagen de referencia de opusdei.org",
  };
}

function syncQuestion(question) {
  const index = questionBank.findIndex((item) => item.id === question.id);
  if (index >= 0) {
    questionBank[index] = question;
  } else {
    questionBank.push(question);
  }

  saveQuestionBank();
  populateQuestionSelect();
  fillEditorForm(question);
  refreshQuestionBankStatus();
}

function downloadQuestionsJson() {
  const blob = new Blob([JSON.stringify(stripQuestionIds(questionBank), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "questions.json";
  link.click();
  URL.revokeObjectURL(url);
}

function renderAdminState() {
  assetPanel.hidden = !isAdminMode;
  adminStatus.textContent = isAdminMode
    ? "Modo administrador activo."
    : "El editor de preguntas esta oculto.";
}

function finishGame() {
  clearInterval(timer);
  completedGames += 1;
  saveCompletedGames();
  renderCompletedGames();
  const maxScore = gameQuestions.length * scoreFromTime(QUESTION_TIME);
  const ratio = Math.round((score / maxScore) * 100);

  resultTitle.textContent = ratio >= 75 ? "Nivel experto" : ratio >= 45 ? "Buen recorrido" : "Sigue practicando";
  resultScore.textContent = `Has cerrado la partida con ${score} puntos (${ratio}% de rendimiento).`;
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

function validateQuestions(data, { requirePlayable = true } = {}) {
  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }

  if (requirePlayable && data.length < QUESTIONS_PER_GAME) {
    return false;
  }

  return data.every((item) => {
    if (!item || typeof item !== "object") return false;
    if (typeof item.text !== "string" || !item.text.trim()) return false;
    if (!Array.isArray(item.options) || item.options.length < 2) return false;
    if (typeof item.answer !== "string" || !item.answer.trim()) return false;
    if (typeof item.image !== "string") return false;
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

    questionBank = getStoredQuestionBank() || hydrateQuestions(data);
    completedGames = getCompletedGames();
    populateQuestionSelect();
    resetEditorForm();
    renderCompletedGames();
    renderAdminState();
    refreshQuestionBankStatus();
  } catch (error) {
    loadStatus.textContent = "No se pudieron cargar las preguntas. Revisa questions.json.";
    loadStatus.style.color = "#ff9c96";
    console.error("Error cargando preguntas:", error);
  }
}

startForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (questionBank.length < QUESTIONS_PER_GAME) return;

  ensureAudioContext();
  resetGame();
});

adminToggleBtn.addEventListener("click", () => {
  const password = window.prompt("Contrasena de administrador");
  if (password !== ADMIN_PASSWORD) {
    adminStatus.textContent = "Acceso denegado.";
    adminStatus.style.color = "#ff9c96";
    return;
  }

  isAdminMode = !isAdminMode;
  adminStatus.style.color = "#76f3b8";
  renderAdminState();
});

imageQuestionSelect.addEventListener("change", () => {
  const selectedId = imageQuestionSelect.value;
  const question = getQuestionById(selectedId);
  fillEditorForm(question);
});

imageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const selectedId = imageQuestionSelect.value;
  const question = getQuestionById(selectedId);
  const file = imageFileInput.files?.[0];

  if (file && !file.type.startsWith("image/")) {
    imageFormStatus.textContent = "El archivo debe ser una imagen valida.";
    imageFormStatus.style.color = "#ff9c96";
    return;
  }

  if (file && file.size > MAX_IMAGE_SIZE_BYTES) {
    imageFormStatus.textContent = "La imagen supera el limite de 2 MB para guardarse en este navegador.";
    imageFormStatus.style.color = "#ff9c96";
    return;
  }

  try {
    const payload = buildQuestionPayload(question);
    payload.image = question?.image || "";

    if (file) {
      payload.image = await readFileAsDataUrl(file);
    }

    syncQuestion(payload);
    imageFileInput.value = "";
    imageFormStatus.textContent = question ? "Pregunta actualizada correctamente." : "Pregunta creada correctamente.";
    imageFormStatus.style.color = "#76f3b8";
  } catch (error) {
    imageFormStatus.textContent = error.message || "No se pudo guardar la pregunta.";
    imageFormStatus.style.color = "#ff9c96";
    console.error("Error guardando pregunta:", error);
  }
});

clearImageBtn.addEventListener("click", () => {
  const selectedId = imageQuestionSelect.value;
  const question = getQuestionById(selectedId);
  if (!question || !question.image) {
    imageFormStatus.textContent = "No hay ninguna imagen para eliminar en esa pregunta.";
    imageFormStatus.style.color = "#ff9c96";
    return;
  }

  syncQuestion({ ...question, image: "", imageCaption: imageCaptionInput.value.trim() || "Imagen de referencia de opusdei.org" });
  imageFileInput.value = "";
  imageFormStatus.textContent = "Se elimino la imagen de la pregunta.";
  imageFormStatus.style.color = "#76f3b8";
});

newQuestionBtn.addEventListener("click", resetEditorForm);

deleteQuestionBtn.addEventListener("click", () => {
  const selectedId = imageQuestionSelect.value;
  if (!selectedId) {
    imageFormStatus.textContent = "Selecciona una pregunta existente para eliminarla.";
    imageFormStatus.style.color = "#ff9c96";
    return;
  }

  questionBank = questionBank.filter((question) => question.id !== selectedId);
  saveQuestionBank();
  populateQuestionSelect();
  resetEditorForm();
  refreshQuestionBankStatus();
  imageFormStatus.textContent = "Pregunta eliminada del banco local.";
  imageFormStatus.style.color = "#76f3b8";
});

exportQuestionsBtn.addEventListener("click", () => {
  downloadQuestionsJson();
  imageFormStatus.textContent = "Se descargo un nuevo questions.json con tus cambios locales.";
  imageFormStatus.style.color = "#76f3b8";
});

importQuestionsInput.addEventListener("change", async () => {
  const file = importQuestionsInput.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!validateQuestions(data, { requirePlayable: false })) {
      throw new Error("El JSON importado no tiene el formato esperado.");
    }

    questionBank = hydrateQuestions(data);
    saveQuestionBank();
    populateQuestionSelect();
    resetEditorForm();
    refreshQuestionBankStatus();
    imageFormStatus.textContent = "Importacion completada. Ya puedes editar y exportar el nuevo banco.";
    imageFormStatus.style.color = "#76f3b8";
  } catch (error) {
    imageFormStatus.textContent = error.message || "No se pudo importar el archivo JSON.";
    imageFormStatus.style.color = "#ff9c96";
  } finally {
    importQuestionsInput.value = "";
  }
});

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", () => {
  showScreen("start");
  startBtn.focus();
});

loadQuestions();
