// script.js

let timer;
let isRunning = false;
let secondsRemaining = 25 * 60; // Start with 25 minutes
let currentMode = 'pomodoro'; 

// Time settings in seconds
const pomodoroTime = 25 * 60;
const shortBreakTime = 5 * 60;
const longBreakTime = 15 * 60;

const updateDisplay = () => {
    const minutes = Math.floor(secondsRemaining / 60).toString().padStart(2, '0');
    const seconds = (secondsRemaining % 60).toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
};

const playButtonClickSound = () => {
    document.getElementById('buttonClickSound').play();
};

const playNotificationSound = () => {
    document.getElementById('notificationSound').play();
};

const startTimer = () => {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (secondsRemaining > 0) {
            secondsRemaining--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            playNotificationSound(); // Play notification sound for session end
            alert(`${currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} session ended!`);
            handleSessionEnd();
        }
    }, 1000);
};

const handleSessionEnd = () => {
    if (currentMode === 'pomodoro') {
        secondsRemaining = shortBreakTime; // Switch to short break
        currentMode = 'shortBreak';
    } else if (currentMode === 'shortBreak') {
        secondsRemaining = pomodoroTime; // Switch to pomodoro
        currentMode = 'pomodoro';
    } else if (currentMode === 'longBreak') {
        secondsRemaining = pomodoroTime; // Switch to pomodoro
        currentMode = 'pomodoro';
    }
    updateDisplay();
};

const pauseTimer = () => {
    clearInterval(timer);
    isRunning = false;
    playButtonClickSound(); // Play button click sound
};

const resetTimer = () => {
    clearInterval(timer);
    isRunning = false;
    secondsRemaining = pomodoroTime; // Reset to initial pomodoro time
    updateDisplay();
    playButtonClickSound(); // Play button click sound
};

const switchToShortBreak = () => {
    clearInterval(timer);
    isRunning = false;
    currentMode = 'shortBreak';
    secondsRemaining = shortBreakTime;
    updateDisplay();
    playButtonClickSound(); // Play button click sound
};

const switchToLongBreak = () => {
    clearInterval(timer);
    isRunning = false;
    currentMode = 'longBreak';
    secondsRemaining = longBreakTime;
    updateDisplay();
    playButtonClickSound(); // Play button click sound
};

// Event listeners for buttons
document.getElementById('startButton').addEventListener('click', () => {
    playButtonClickSound(); // Play button click sound
    playNotificationSound(); // Play notification sound on start
    startTimer();
});
document.getElementById('pauseButton').addEventListener('click', () => {
    playButtonClickSound(); // Play button click sound
    pauseTimer();
});
document.getElementById('resetButton').addEventListener('click', () => {
    playButtonClickSound(); // Play button click sound
    resetTimer();
});
document.getElementById('shortBreakButton').addEventListener('click', () => {
    playButtonClickSound(); // Play button click sound
    switchToShortBreak();
});
document.getElementById('longBreakButton').addEventListener('click', () => {
    playButtonClickSound(); // Play button click sound
    switchToLongBreak();
});

// Initialize display
updateDisplay();


