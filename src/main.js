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

  // ⏭ Auto switch logic
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


// ⬇️ Motivation Text & Image Setup
const motivationMessages = [
  "I really want a stainless steel fridge",
  "I love you sooooo much! You're doing so good",
  "You don't want to live in a trailer with 6 kids, do you?",
  "You're hot when you work hard lel",
  "Come on, our combined salaries need to reach at least 400k",
  "Work hard so we can go anywhere we want in the future!!!",
  "I luh yew <333333333333 Mwah!!!!"
];

const motivationImages = [
  "./images/airy.png",
  "./images/airy1.png",
  "./images/airy2.png",
  "./images/airy3.png",
  "./images/airy4.png"
];

const motivationText = document.getElementById('motivation-text');
const motivationImage = document.getElementById('motivation-image');
const motivationButton = document.getElementById('motivation-button');

let lastTextIndex = -1;
let lastImageIndex = -1;

motivationButton.addEventListener('click', () => {
  // --- Text ---
  let randomTextIndex;
  do {
    randomTextIndex = Math.floor(Math.random() * motivationMessages.length);
  } while (randomTextIndex === lastTextIndex && motivationMessages.length > 1);
  lastTextIndex = randomTextIndex;
  motivationText.textContent = motivationMessages[randomTextIndex];
  motivationText.classList.remove('bounce');
  void motivationText.offsetWidth;
  motivationText.classList.add('bounce');

  // --- Image ---
  let randomImageIndex;
  do {
    randomImageIndex = Math.floor(Math.random() * motivationImages.length);
  } while (randomImageIndex === lastImageIndex && motivationImages.length > 1);
  lastImageIndex = randomImageIndex;
  motivationImage.src = motivationImages[randomImageIndex];
  motivationImage.style.display = "block";
});
