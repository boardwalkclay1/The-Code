// js/master.js

let currentLevel = null;
let startTime = null;
let timerInterval = null;
let targetWords = 0;

const levelSelect = document.getElementById("levelSelect");
const levelTitle = document.getElementById("levelTitle");
const targetTextEl = document.getElementById("targetText");
const typingArea = document.getElementById("typingArea");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const timeStat = document.getElementById("timeStat");
const wpmStat = document.getElementById("wpmStat");
const accuracyStat = document.getElementById("accuracyStat");
const bestWpmStat = document.getElementById("bestWpmStat");
const progressSummary = document.getElementById("progressSummary");

function loadLevels() {
  TYPING_LEVELS.forEach(level => {
    const opt = document.createElement("option");
    opt.value = level.id;
    opt.textContent = `${level.id} – ${level.title}`;
    levelSelect.appendChild(opt);
  });
  setLevel(TYPING_LEVELS[0].id);
  updateProgressSummary();
}

function setLevel(id) {
  currentLevel = TYPING_LEVELS.find(l => l.id === Number(id));
  levelTitle.textContent = currentLevel.title;
  targetTextEl.textContent = currentLevel.text;
  typingArea.value = "";
  typingArea.disabled = true;
  clearTimer();
  updateStats(0, 0, 100);
  targetWords = currentLevel.text.trim().split(/\s+/).length;
  updateBestWpmDisplay();
}

function startTyping() {
  typingArea.disabled = false;
  typingArea.focus();
  typingArea.value = "";
  startTime = performance.now();
  clearTimer();
  timerInterval = setInterval(updateTimer, 100);
}

function resetTyping() {
  typingArea.value = "";
  typingArea.disabled = true;
  clearTimer();
  updateStats(0, 0, 100);
}

function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timeStat.textContent = "0.0";
}

function updateTimer() {
  if (!startTime) return;
  const elapsedMs = performance.now() - startTime;
  const elapsedSec = elapsedMs / 1000;
  timeStat.textContent = elapsedSec.toFixed(1);

  const textTyped = typingArea.value;
  const wpm = calculateWpm(textTyped, elapsedSec);
  const accuracy = calculateAccuracy(textTyped, currentLevel.text);
  updateStats(elapsedSec, wpm, accuracy);

  if (textTyped.length >= currentLevel.text.length) {
    clearTimer();
    saveBestWpm(currentLevel.id, wpm);
    updateBestWpmDisplay();
    updateProgressSummary();
  }
}

function calculateWpm(text, seconds) {
  if (seconds === 0) return 0;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.round((words / seconds) * 60);
}

function calculateAccuracy(typed, target) {
  const maxLen = Math.max(typed.length, target.length);
  if (maxLen === 0) return 100;
  let correct = 0;
  for (let i = 0; i < maxLen; i++) {
    if (typed[i] === target[i]) correct++;
  }
  return Math.round((correct / maxLen) * 100);
}

function updateStats(seconds, wpm, accuracy) {
  wpmStat.textContent = wpm;
  accuracyStat.textContent = `${accuracy}%`;
}

function saveBestWpm(levelId, wpm) {
  const key = `typing_best_wpm_level_${levelId}`;
  const current = Number(localStorage.getItem(key) || 0);
  if (wpm > current) {
    localStorage.setItem(key, String(wpm));
  }
}

function getBestWpm(levelId) {
  const key = `typing_best_wpm_level_${levelId}`;
  return Number(localStorage.getItem(key) || 0);
}

function updateBestWpmDisplay() {
  if (!currentLevel) return;
  const best = getBestWpm(currentLevel.id);
  bestWpmStat.textContent = best > 0 ? best : "–";
}

function updateProgressSummary() {
  let completed = 0;
  TYPING_LEVELS.forEach(l => {
    if (getBestWpm(l.id) > 0) completed++;
  });
  progressSummary.textContent =
    `Levels completed with recorded WPM: ${completed} / ${TYPING_LEVELS.length}.`;
}

// Event wiring
levelSelect.addEventListener("change", e => setLevel(e.target.value));
startBtn.addEventListener("click", startTyping);
resetBtn.addEventListener("click", resetTyping);
typingArea.addEventListener("input", () => {
  if (!startTime) {
    startTime = performance.now();
    timerInterval = setInterval(updateTimer, 100);
  }
});

// Init
loadLevels();
