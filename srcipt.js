let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let laps = [];
let vibrateInterval;

// DOM elements
const timeDisplay = document.getElementById('stopwatch');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');
const lapsSection = document.querySelector('.laps');

// Format time into HH:MM:SS.MMM
function formatTime(ms) {
  const milliseconds = ms % 1000;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

// Pad numbers to ensure double digits or triple for milliseconds
function pad(number, digits = 2) {
  return String(number).padStart(digits, '0');
}

// Update the display
function updateTimeDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

// Start or pause the timer
function startPauseTimer() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateTimeDisplay();
    }, 10);

    vibrateInterval = setInterval(() => {
      vibrate();
    }, 10000); // Trigger vibration every 10 seconds

    startPauseBtn.textContent = 'Pause';
    startPauseBtn.classList.add('pause');
    lapBtn.disabled = false;
    running = true;
  } else {
    clearInterval(timerInterval);
    clearInterval(vibrateInterval);
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.remove('pause');
    running = false;
  }
}

// Reset the timer and laps
function resetTimer() {
  clearInterval(timerInterval);
  clearInterval(vibrateInterval);
  elapsedTime = 0;
  updateTimeDisplay();
  startPauseBtn.textContent = 'Start';
  startPauseBtn.classList.remove('pause');
  lapBtn.disabled = true;
  running = false;
  laps = [];
  lapsList.innerHTML = '';
  lapsSection.style.display = 'none';
}

// Record the current time as a lap
function recordLap() {
  const lapTime = formatTime(elapsedTime);
  laps.push(lapTime);

  // Show laps section when the first lap is recorded
  if (laps.length === 1) {
    lapsSection.style.display = 'block';
  }

  const lapElement = document.createElement('li');
  lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
  lapsList.appendChild(lapElement);
}

// Trigger vibration effect
function vibrate() {
  timeDisplay.classList.add('vibrate');
  setTimeout(() => timeDisplay.classList.remove('vibrate'), 300);
}

// Event listeners
startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
