let timerInterval;
let elapsedSeconds = 0;

function formatTime(seconds) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${secs}`;
}

function updateTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = formatTime(elapsedSeconds);
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      updateTimer();
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}