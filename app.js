const QUESTION_TIME = 10;
const QUESTION_BANK_KEY = "montseQuizQuestionBank";
const COMPLETION_COUNT_KEY = "montseQuizCompletionCount";
const QUESTIONS_PATH = "questions.json";
const QUESTIONS_PER_GAME = 10;
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
const ADMIN_PASSWORD = "montse-admin";

const ui = {
  es: {
    pageTitle: "¿Conoces a Montse Grases?",
    languageLabel: "Idioma",
    heroCaption: 'Imagen del album "Montse Grases, una chica como las demas" (Flickr Opus Dei)',
    leadText: "Repasa la vida de Montserrat Grases con preguntas rapidas y puntos por velocidad.",
    start: "Comenzar",
    adminAccess: "Acceso administrador",
    editorEyebrow: "Personalizacion local",
    editorTitle: "Editor de preguntas",
    exportJson: "Exportar JSON",
    existingQuestion: "Editar pregunta existente",
    newQuestion: "Nueva pregunta",
    editorEsTitle: "Castellano",
    editorCaTitle: "Catalan",
    questionLabel: "Pregunta",
    questionPlaceholderEs: "Escribe el enunciado",
    questionPlaceholderCa: "Escriu l'enunciat",
    optionLabel: "Opcion {number}",
    optionLabelCa: "Opcio {number}",
    captionLabel: "Pie de foto",
    captionLabelCa: "Peu de foto",
    captionPlaceholderEs: "Describe la imagen que quieres mostrar",
    captionPlaceholderCa: "Descriu la imatge que vols mostrar",
    answerLabel: "Respuesta correcta",
    answerPlaceholder: "Selecciona la correcta",
    imageFileLabel: "Archivo de imagen",
    saveQuestion: "Guardar pregunta",
    clearImage: "Quitar imagen",
    deleteQuestion: "Eliminar pregunta",
    sourcePrefix: "Fuente principal:",
    hudScore: "Puntos",
    hudTimer: "Tiempo",
    backToStart: "Volver al inicio",
    next: "Siguiente",
    resultEyebrow: "Fin del juego",
    restart: "Jugar otra vez",
    loadingQuestions: "Cargando preguntas...",
    noQuestions: "No hay preguntas cargadas todavia.",
    needsQuestions: "Hay {count} preguntas. Necesitas al menos {required} para jugar.",
    loadedQuestions: "{count} preguntas cargadas ({required} aleatorias por partida).",
    loadError: "No se pudieron cargar las preguntas. Revisa questions.json.",
    completionCount: "Cuestionarios completados en este dispositivo: {count}",
    questionCount: "Pregunta {current} / {total}",
    imageReference: "Imagen de referencia de opusdei.org",
    imageAlt: "Imagen para la pregunta {number}",
    noAnswer: "Sin respuesta. La correcta se marco en verde.",
    correct: "Correcto +{points} puntos",
    incorrect: "No era esa. Te recuperas en la siguiente.",
    resultExpert: "Nivel experto",
    resultGood: "Buen recorrido",
    resultRetry: "Sigue practicando",
    resultScore: "Has cerrado la partida con {score} puntos ({ratio}% de rendimiento).",
    adminHidden: "El editor de preguntas esta oculto.",
    adminActive: "Modo administrador activo.",
    adminDenied: "Acceso denegado.",
    adminPrompt: "Contrasena de administrador",
    editingExisting: "Editando una pregunta existente.",
    validationError: "Completa ambas versiones de la pregunta, las cuatro opciones y la respuesta correcta.",
    invalidImage: "El archivo debe ser una imagen valida.",
    imageTooLarge: "La imagen supera el limite de 2 MB para guardarse en este navegador.",
    updatedQuestion: "Pregunta actualizada correctamente.",
    createdQuestion: "Pregunta creada correctamente.",
    saveQuestionError: "No se pudo guardar la pregunta.",
    noImageDelete: "No hay ninguna imagen para eliminar en esa pregunta.",
    imageDeleted: "Se elimino la imagen de la pregunta.",
    deleteSelect: "Selecciona una pregunta existente para eliminarla.",
    questionDeleted: "Pregunta eliminada del banco local.",
    exported: "Se descargo un nuevo questions.json con tus cambios locales.",
  },
  ca: {
    pageTitle: "Coneixes la Montse Grases?",
    languageLabel: "Idioma",
    heroCaption: 'Imatge de l\'album "Montse Grases, una noia com les altres" (Flickr Opus Dei)',
    leadText: "Repasa la vida de Montserrat Grases amb preguntes rapides i punts per velocitat.",
    start: "Comencar",
    adminAccess: "Acces administrador",
    editorEyebrow: "Personalitzacio local",
    editorTitle: "Editor de preguntes",
    exportJson: "Exportar JSON",
    existingQuestion: "Editar pregunta existent",
    newQuestion: "Nova pregunta",
    editorEsTitle: "Castella",
    editorCaTitle: "Catala",
    questionLabel: "Pregunta",
    questionPlaceholderEs: "Escriu l'enunciat en castella",
    questionPlaceholderCa: "Escriu l'enunciat",
    optionLabel: "Opcio {number}",
    optionLabelCa: "Opcio {number}",
    captionLabel: "Peu de foto",
    captionLabelCa: "Peu de foto",
    captionPlaceholderEs: "Descriu la imatge en castella",
    captionPlaceholderCa: "Descriu la imatge que vols mostrar",
    answerLabel: "Resposta correcta",
    answerPlaceholder: "Selecciona la correcta",
    imageFileLabel: "Arxiu d'imatge",
    saveQuestion: "Desar pregunta",
    clearImage: "Treure imatge",
    deleteQuestion: "Eliminar pregunta",
    sourcePrefix: "Font principal:",
    hudScore: "Punts",
    hudTimer: "Temps",
    backToStart: "Tornar a l'inici",
    next: "Seguent",
    resultEyebrow: "Final del joc",
    restart: "Tornar a jugar",
    loadingQuestions: "Carregant preguntes...",
    noQuestions: "Encara no hi ha preguntes carregades.",
    needsQuestions: "Hi ha {count} preguntes. En necessites almenys {required} per jugar.",
    loadedQuestions: "{count} preguntes carregades ({required} aleatories per partida).",
    loadError: "No s'han pogut carregar les preguntes. Revisa questions.json.",
    completionCount: "Qestionaris completats en aquest dispositiu: {count}",
    questionCount: "Pregunta {current} / {total}",
    imageReference: "Imatge de referencia d'opusdei.org",
    imageAlt: "Imatge per a la pregunta {number}",
    noAnswer: "Sense resposta. La correcta s'ha marcat en verd.",
    correct: "Correcte +{points} punts",
    incorrect: "No era aquesta. Et refas a la seguent.",
    resultExpert: "Nivell expert",
    resultGood: "Bon recorregut",
    resultRetry: "Continua practicant",
    resultScore: "Has tancat la partida amb {score} punts ({ratio}% de rendiment).",
    adminHidden: "L'editor de preguntes esta ocult.",
    adminActive: "Mode administrador actiu.",
    adminDenied: "Acces denegat.",
    adminPrompt: "Contrasenya d'administrador",
    editingExisting: "Estas editant una pregunta existent.",
    validationError: "Completa les dues versions de la pregunta, les quatre opcions i la resposta correcta.",
    invalidImage: "L'arxiu ha de ser una imatge valida.",
    imageTooLarge: "La imatge supera el limit de 2 MB per desar-se en aquest navegador.",
    updatedQuestion: "Pregunta actualitzada correctament.",
    createdQuestion: "Pregunta creada correctament.",
    saveQuestionError: "No s'ha pogut desar la pregunta.",
    noImageDelete: "No hi ha cap imatge per eliminar en aquesta pregunta.",
    imageDeleted: "S'ha eliminat la imatge de la pregunta.",
    deleteSelect: "Selecciona una pregunta existent per eliminar-la.",
    questionDeleted: "Pregunta eliminada del banc local.",
    exported: "S'ha descarregat un nou questions.json amb els teus canvis locals.",
  },
};

const screens = {
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen"),
};

const languageSelect = document.getElementById("page-language-select");
const languageLabel = document.getElementById("language-label");
const startForm = document.getElementById("start-form");
const startBtn = startForm.querySelector("button[type='submit']");
const appTitle = document.getElementById("app-title");
const heroCaption = document.getElementById("hero-caption");
const leadText = document.getElementById("lead-text");
const loadStatus = document.getElementById("load-status");
const completionCount = document.getElementById("completion-count");
const adminToggleBtn = document.getElementById("admin-toggle-btn");
const adminStatus = document.getElementById("admin-status");
const assetPanel = document.getElementById("asset-panel");
const editorEyebrow = document.getElementById("editor-eyebrow");
const editorTitle = document.getElementById("asset-panel-title");
const existingQuestionLabel = document.getElementById("existing-question-label");
const newQuestionBtn = document.getElementById("new-question-btn");
const exportQuestionsBtn = document.getElementById("export-questions-btn");
const sourcePrefix = document.getElementById("source-prefix");
const scoreHud = document.getElementById("hud-score");
const scoreHudLabel = document.getElementById("hud-score-label");
const timerHud = document.getElementById("hud-timer");
const timerHudLabel = document.getElementById("hud-timer-label");
const questionCount = document.getElementById("question-count");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const answersWrap = document.getElementById("answers");
const feedback = document.getElementById("round-feedback");
const nextBtn = document.getElementById("next-btn");
const backToStartBtn = document.getElementById("back-to-start-btn");
const questionImage = document.getElementById("question-image");
const questionImageCaption = document.getElementById("question-image-caption");
const questionShot = questionImage.closest(".question-shot");
const resultEyebrow = document.getElementById("result-eyebrow");
const resultTitle = document.getElementById("result-title");
const resultScore = document.getElementById("result-score");
const restartBtn = document.getElementById("restart-btn");
const resultCompletionCount = document.getElementById("result-completion-count");
const imageForm = document.getElementById("image-form");
const imageQuestionSelect = document.getElementById("image-question-select");
const answerSelect = document.getElementById("answer-select");
const imageFileInput = document.getElementById("image-file-input");
const clearImageBtn = document.getElementById("clear-image-btn");
const deleteQuestionBtn = document.getElementById("delete-question-btn");
const imageFormStatus = document.getElementById("image-form-status");
const customPreview = document.getElementById("custom-preview");
const customPreviewImage = document.getElementById("custom-preview-image");
const customPreviewCaption = document.getElementById("custom-preview-caption");
const editorEsTitle = document.getElementById("editor-es-title");
const editorCaTitle = document.getElementById("editor-ca-title");
const questionEsLabel = document.getElementById("question-es-label");
const questionCaLabel = document.getElementById("question-ca-label");
const captionEsLabel = document.getElementById("caption-es-label");
const captionCaLabel = document.getElementById("caption-ca-label");
const answerLabel = document.getElementById("answer-label");
const imageFileLabel = document.getElementById("image-file-label");
const saveQuestionBtn = document.getElementById("save-question-btn");

const questionTextInputs = {
  es: document.getElementById("question-text-es"),
  ca: document.getElementById("question-text-ca"),
};

const optionInputs = {
  es: [1, 2, 3, 4].map((index) => document.getElementById(`option-es-${index}`)),
  ca: [1, 2, 3, 4].map((index) => document.getElementById(`option-ca-${index}`)),
};

const optionLabels = {
  es: [1, 2, 3, 4].map((index) => document.getElementById(`option-es-${index}-label`)),
  ca: [1, 2, 3, 4].map((index) => document.getElementById(`option-ca-${index}-label`)),
};

const imageCaptionInputs = {
  es: document.getElementById("image-caption-es"),
  ca: document.getElementById("image-caption-ca"),
};

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
let currentLanguage = "es";
let lastResult = null;

function t(key, vars = {}) {
  let message = ui[currentLanguage][key] || key;
  Object.entries(vars).forEach(([name, value]) => {
    message = message.replace(`{${name}}`, String(value));
  });
  return message;
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function returnToStart() {
  clearInterval(timer);
  locked = false;
  feedback.textContent = "";
  nextBtn.hidden = true;
  showScreen("start");
  startBtn.focus();
}

function getQuestionId(index) {
  return `question-${index + 1}`;
}

function hydrateQuestions(data) {
  return data.map((item, index) => ({
    ...item,
    id: item.id || getQuestionId(index),
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

function getLocalizedValue(value) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  return value[currentLanguage] || value.es || value.ca || "";
}

function getImageData(item) {
  const caption = getLocalizedValue(item.imageCaption);
  return {
    src: item.image,
    caption: caption || (item.image ? t("imageReference") : ""),
  };
}

function refreshQuestionBankStatus() {
  const isPlayable = questionBank.length >= QUESTIONS_PER_GAME;
  startBtn.disabled = !isPlayable;

  if (questionBank.length === 0) {
    loadStatus.textContent = t("noQuestions");
    loadStatus.style.color = "#ff9c96";
    return;
  }

  if (!isPlayable) {
    loadStatus.textContent = t("needsQuestions", { count: questionBank.length, required: QUESTIONS_PER_GAME });
    loadStatus.style.color = "#ff9c96";
    return;
  }

  loadStatus.textContent = t("loadedQuestions", { count: questionBank.length, required: QUESTIONS_PER_GAME });
  loadStatus.style.color = "#76f3b8";
}

function renderQuestion() {
  locked = false;
  feedback.textContent = "";
  nextBtn.hidden = true;

  const item = gameQuestions[currentQuestion];
  const percent = ((currentQuestion + 1) / gameQuestions.length) * 100;
  const imageData = getImageData(item);

  questionCount.textContent = t("questionCount", { current: currentQuestion + 1, total: gameQuestions.length });
  progressBar.style.width = `${percent}%`;
  questionText.textContent = getLocalizedValue(item.text);
  questionImage.src = imageData.src;
  questionImage.alt = t("imageAlt", { number: currentQuestion + 1 });
  questionImageCaption.textContent = imageData.caption;
  questionShot.hidden = !imageData.src;
  answersWrap.innerHTML = "";

  const mixedIndexes = shuffle(item.options.map((_, index) => index));
  mixedIndexes.forEach((optionIndex) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.type = "button";
    button.textContent = getLocalizedValue(item.options[optionIndex]);
    button.dataset.correct = String(optionIndex === item.answer);
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
    feedback.textContent = t("noAnswer");
    feedback.style.color = "#ffd27d";
  } else if (selectedButton.dataset.correct === "true") {
    const gained = scoreFromTime(timeLeft);
    score += gained;
    scoreHud.textContent = String(score);
    selectedButton.classList.add("correct");
    playCorrectSound();
    feedback.textContent = t("correct", { points: gained });
    feedback.style.color = "#76f3b8";
  } else {
    selectedButton.classList.add("incorrect");
    playErrorSound();
    feedback.textContent = t("incorrect");
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
  const label = t("completionCount", { count: completedGames });
  completionCount.textContent = label;
  resultCompletionCount.textContent = label;
}

function populateQuestionSelect() {
  const previousValue = imageQuestionSelect.value;
  imageQuestionSelect.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = t("newQuestion");
  imageQuestionSelect.appendChild(defaultOption);

  questionBank.forEach((question, index) => {
    const option = document.createElement("option");
    option.value = question.id;
    option.textContent = `${index + 1}. ${getLocalizedValue(question.text)}`;
    imageQuestionSelect.appendChild(option);
  });

  imageQuestionSelect.value = previousValue && getQuestionById(previousValue) ? previousValue : "";
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
  customPreviewCaption.textContent = getLocalizedValue(question.imageCaption) || t("imageReference");
}

function getQuestionById(questionId) {
  return questionBank.find((question) => question.id === questionId) || null;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("image-read"));
    reader.readAsDataURL(file);
  });
}

function resetEditorForm() {
  imageQuestionSelect.value = "";
  questionTextInputs.es.value = "";
  questionTextInputs.ca.value = "";
  optionInputs.es.forEach((input) => {
    input.value = "";
  });
  optionInputs.ca.forEach((input) => {
    input.value = "";
  });
  answerSelect.value = "";
  imageCaptionInputs.es.value = "";
  imageCaptionInputs.ca.value = "";
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
  questionTextInputs.es.value = question.text?.es || "";
  questionTextInputs.ca.value = question.text?.ca || "";
  optionInputs.es.forEach((input, index) => {
    input.value = question.options[index]?.es || "";
  });
  optionInputs.ca.forEach((input, index) => {
    input.value = question.options[index]?.ca || "";
  });
  answerSelect.value = String(question.answer);
  imageCaptionInputs.es.value = question.imageCaption?.es || "";
  imageCaptionInputs.ca.value = question.imageCaption?.ca || "";
  imageFileInput.value = "";
  imageFormStatus.textContent = t("editingExisting");
  imageFormStatus.style.color = "#31547b";
  updateCustomPreview();
}

function buildQuestionPayload(existingQuestion = null) {
  const text = {
    es: questionTextInputs.es.value.trim(),
    ca: questionTextInputs.ca.value.trim(),
  };
  const options = optionInputs.es.map((input, index) => ({
    es: input.value.trim(),
    ca: optionInputs.ca[index].value.trim(),
  }));
  const answerIndex = Number(answerSelect.value);
  const hasEmptyOption = options.some((option) => !option.es || !option.ca);

  if (!text.es || !text.ca || hasEmptyOption || !Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length) {
    throw new Error("validation");
  }

  return {
    id: existingQuestion?.id || `question-${Date.now()}`,
    text,
    options,
    answer: answerIndex,
    image: existingQuestion?.image || "",
    imageCaption: {
      es: imageCaptionInputs.es.value.trim(),
      ca: imageCaptionInputs.ca.value.trim(),
    },
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
  adminStatus.textContent = isAdminMode ? t("adminActive") : t("adminHidden");
}

function getResultTitle(ratio) {
  if (ratio >= 75) return t("resultExpert");
  if (ratio >= 45) return t("resultGood");
  return t("resultRetry");
}

function renderResult() {
  if (!lastResult) return;
  resultTitle.textContent = getResultTitle(lastResult.ratio);
  resultScore.textContent = t("resultScore", { score: lastResult.score, ratio: lastResult.ratio });
}

function finishGame() {
  clearInterval(timer);
  completedGames += 1;
  saveCompletedGames();
  renderCompletedGames();
  const maxScore = gameQuestions.length * scoreFromTime(QUESTION_TIME);
  const ratio = Math.round((score / maxScore) * 100);
  lastResult = { score, ratio };
  renderResult();
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
    if (question.image && usedImages.has(question.image)) return;
    if (question.image) usedImages.add(question.image);
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

function validateLocalizedField(value) {
  return value && typeof value === "object" && typeof value.es === "string" && value.es.trim() && typeof value.ca === "string" && value.ca.trim();
}

function validateQuestions(data, { requirePlayable = true } = {}) {
  if (!Array.isArray(data) || data.length === 0) return false;
  if (requirePlayable && data.length < QUESTIONS_PER_GAME) return false;

  return data.every((item) => {
    if (!item || typeof item !== "object") return false;
    if (!validateLocalizedField(item.text)) return false;
    if (!Array.isArray(item.options) || item.options.length !== 4) return false;
    if (!item.options.every((option) => validateLocalizedField(option))) return false;
    if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer >= item.options.length) return false;
    if (typeof item.image !== "string") return false;
    if (!item.imageCaption || typeof item.imageCaption !== "object") return false;
    if (typeof item.imageCaption.es !== "string" || typeof item.imageCaption.ca !== "string") return false;
    return true;
  });
}

function applyLanguage() {
  const selectedAnswer = answerSelect.value;
  document.documentElement.lang = currentLanguage;
  document.title = t("pageTitle");
  languageLabel.textContent = t("languageLabel");
  appTitle.textContent = t("pageTitle");
  heroCaption.textContent = t("heroCaption");
  leadText.textContent = t("leadText");
  startBtn.textContent = t("start");
  adminToggleBtn.textContent = t("adminAccess");
  editorEyebrow.textContent = t("editorEyebrow");
  editorTitle.textContent = t("editorTitle");
  exportQuestionsBtn.textContent = t("exportJson");
  existingQuestionLabel.textContent = t("existingQuestion");
  newQuestionBtn.textContent = t("newQuestion");
  editorEsTitle.textContent = t("editorEsTitle");
  editorCaTitle.textContent = t("editorCaTitle");
  questionEsLabel.textContent = `${t("questionLabel")} (ES)`;
  questionCaLabel.textContent = `${t("questionLabel")} (CA)`;
  questionTextInputs.es.placeholder = t("questionPlaceholderEs");
  questionTextInputs.ca.placeholder = t("questionPlaceholderCa");
  optionLabels.es.forEach((label, index) => {
    label.textContent = `${t("optionLabel", { number: index + 1 })} (ES)`;
  });
  optionLabels.ca.forEach((label, index) => {
    label.textContent = `${t("optionLabelCa", { number: index + 1 })} (CA)`;
  });
  captionEsLabel.textContent = `${t("captionLabel")} (ES)`;
  captionCaLabel.textContent = `${t("captionLabelCa")} (CA)`;
  imageCaptionInputs.es.placeholder = t("captionPlaceholderEs");
  imageCaptionInputs.ca.placeholder = t("captionPlaceholderCa");
  answerLabel.textContent = t("answerLabel");
  imageFileLabel.textContent = t("imageFileLabel");
  saveQuestionBtn.textContent = t("saveQuestion");
  clearImageBtn.textContent = t("clearImage");
  deleteQuestionBtn.textContent = t("deleteQuestion");
  sourcePrefix.textContent = t("sourcePrefix");
  scoreHudLabel.textContent = t("hudScore");
  timerHudLabel.textContent = t("hudTimer");
  backToStartBtn.textContent = t("backToStart");
  nextBtn.textContent = t("next");
  resultEyebrow.textContent = t("resultEyebrow");
  restartBtn.textContent = t("restart");

  answerSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = t("answerPlaceholder");
  answerSelect.appendChild(placeholder);
  for (let index = 0; index < 4; index += 1) {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = t("optionLabel", { number: index + 1 });
    answerSelect.appendChild(option);
  }
  answerSelect.value = selectedAnswer;

  populateQuestionSelect();
  refreshQuestionBankStatus();
  renderCompletedGames();
  renderAdminState();
  updateCustomPreview();
  if (screens.quiz.classList.contains("active") && gameQuestions.length > 0) {
    renderQuestion();
  }
  if (screens.result.classList.contains("active") && lastResult) {
    renderResult();
  }
}

async function loadQuestions() {
  startBtn.disabled = true;
  loadStatus.textContent = t("loadingQuestions");

  try {
    const response = await fetch(QUESTIONS_PATH, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!validateQuestions(data)) {
      throw new Error("invalid-questions");
    }

    questionBank = getStoredQuestionBank() || hydrateQuestions(data);
    completedGames = getCompletedGames();
    populateQuestionSelect();
    resetEditorForm();
    renderCompletedGames();
    renderAdminState();
    refreshQuestionBankStatus();
  } catch (error) {
    loadStatus.textContent = t("loadError");
    loadStatus.style.color = "#ff9c96";
    console.error("Error cargando preguntas:", error);
  }
}

languageSelect.addEventListener("change", () => {
  currentLanguage = languageSelect.value;
  applyLanguage();
});

startForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (questionBank.length < QUESTIONS_PER_GAME) return;
  ensureAudioContext();
  resetGame();
});

adminToggleBtn.addEventListener("click", () => {
  const password = window.prompt(t("adminPrompt"));
  if (password !== ADMIN_PASSWORD) {
    adminStatus.textContent = t("adminDenied");
    adminStatus.style.color = "#ff9c96";
    return;
  }

  isAdminMode = !isAdminMode;
  adminStatus.style.color = "#76f3b8";
  renderAdminState();
});

imageQuestionSelect.addEventListener("change", () => {
  const selectedId = imageQuestionSelect.value;
  fillEditorForm(getQuestionById(selectedId));
});

imageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const selectedId = imageQuestionSelect.value;
  const question = getQuestionById(selectedId);
  const file = imageFileInput.files?.[0];

  if (file && !file.type.startsWith("image/")) {
    imageFormStatus.textContent = t("invalidImage");
    imageFormStatus.style.color = "#ff9c96";
    return;
  }

  if (file && file.size > MAX_IMAGE_SIZE_BYTES) {
    imageFormStatus.textContent = t("imageTooLarge");
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
    imageFormStatus.textContent = question ? t("updatedQuestion") : t("createdQuestion");
    imageFormStatus.style.color = "#76f3b8";
  } catch (error) {
    imageFormStatus.textContent = error.message === "validation" ? t("validationError") : t("saveQuestionError");
    imageFormStatus.style.color = "#ff9c96";
    console.error("Error guardando pregunta:", error);
  }
});

clearImageBtn.addEventListener("click", () => {
  const selectedId = imageQuestionSelect.value;
  const question = getQuestionById(selectedId);
  if (!question || !question.image) {
    imageFormStatus.textContent = t("noImageDelete");
    imageFormStatus.style.color = "#ff9c96";
    return;
  }

  imageCaptionInputs.es.value = "";
  imageCaptionInputs.ca.value = "";
  syncQuestion({ ...question, image: "", imageCaption: { es: "", ca: "" } });
  imageFileInput.value = "";
  imageFormStatus.textContent = t("imageDeleted");
  imageFormStatus.style.color = "#76f3b8";
});

newQuestionBtn.addEventListener("click", resetEditorForm);

deleteQuestionBtn.addEventListener("click", () => {
  const selectedId = imageQuestionSelect.value;
  if (!selectedId) {
    imageFormStatus.textContent = t("deleteSelect");
    imageFormStatus.style.color = "#ff9c96";
    return;
  }

  questionBank = questionBank.filter((question) => question.id !== selectedId);
  saveQuestionBank();
  populateQuestionSelect();
  resetEditorForm();
  refreshQuestionBankStatus();
  imageFormStatus.textContent = t("questionDeleted");
  imageFormStatus.style.color = "#76f3b8";
});

exportQuestionsBtn.addEventListener("click", () => {
  downloadQuestionsJson();
  imageFormStatus.textContent = t("exported");
  imageFormStatus.style.color = "#76f3b8";
});

nextBtn.addEventListener("click", nextQuestion);
backToStartBtn.addEventListener("click", returnToStart);
restartBtn.addEventListener("click", returnToStart);

applyLanguage();
loadQuestions();
