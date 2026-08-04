let isRunning = false;
let timeLeft = 25*60;
let timer;
let currentMode = "focus";
let focusCount = 0;


function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function switchToFocus() {
  setMode("focus", 50, "Focus Time");
}

function switchToBreak() {
  setMode("break", 10, "Break Time");
}

function switchToLongBreak() {
  focusCount = 0;
  setMode("longbreak", 20, "Long Break");

}

function updateCycleInfo() {
  const cycleInfo = document.getElementById("cycle-info");
  const remaining = 4 - focusCount;
  if (currentMode === "focus") {
    cycleInfo.textContent = `${remaining} more focus ${remaining === 1 ? 'session' : 'sessions'} until long break`;
  } else {
    cycleInfo.textContent = '';
  }
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;

  timer = setInterval(() => {
    updateDisplay();

    if (timeLeft <= 0) {
  clearInterval(timer);
  isRunning = false;

  const sound = document.getElementById("end-sound");
  sound.currentTime = 0;
  sound.play();
  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
  }, 6000)

  const startBtn = document.getElementById("start-button");
  startBtn.src = "images/start.png";

  
  if (currentMode === "focus") {
    focusCount++;
    if (focusCount < 4) {
      switchToBreak(); // auto start
    } else {
      switchToLongBreak(); // auto start
      focusCount = 0; // reset cycle
    }
  } else {
    switchToFocus();
  }
}else {
      timeLeft--;
    }
  }, 1000);
}

function toggleTimer() {
  const sound = document.getElementById("end-sound");
  sound.pause();
  sound.currentTime = 0;

  const startBtn = document.getElementById("start-button");

  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startBtn.src = "images/start.png";
  } else {
    startTimer();
    startBtn.src = "images/pause.png";
  }
}

function setMode(mode, minutes, label, autoStart = false) {
  clearInterval(timer);
  isRunning = false;
  currentMode = mode;
  timeLeft = minutes * 60;
  document.getElementById("status").textContent = label;
  document.getElementById("start-button").src = "images/start.png";
  updateDisplay();
  updateCycleInfo();

  if (autoStart) {
    toggleTimer();
  }
}

setMode("focus", 50, "Focus Time");

