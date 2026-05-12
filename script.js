let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;
let lapCount = 0;
let isRunning = false;

const display = document.querySelector(".StopWatch h1");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("Lap");

const lapList = document.getElementById("lapList");
const lapCounter = document.getElementById("lapCounter");
const themeToggle = document.getElementById("themeToggle");

// ========== THEME TOGGLE (Light Mode Default) ==========
// Set initial theme to LIGHT (default)
document.body.classList.add("light");
themeToggle.innerHTML = "🌙 Dark Mode";

themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("light")) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        themeToggle.innerHTML = "☀️ Light Mode";
    } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        themeToggle.innerHTML = "🌙 Dark Mode";
    }
});

// ========== FORMAT TIME FUNCTION (00:00:00 format) ==========
function formatTime() {
    let formattedHours = hours < 10 ? "0" + hours : hours;
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// ========== UPDATE DISPLAY ==========
function updateDisplay() {
    display.innerHTML = formatTime();
}

// ========== UPDATE TIME FUNCTION ==========
function updateTime() {
    seconds++;
    
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }
    
    updateDisplay();
}

// ========== START BUTTON ==========
startBtn.addEventListener("click", () => {
    if (timer !== null) {
        return; // Already running
    }
    
    isRunning = true;
    timer = setInterval(updateTime, 1000); // 1 second interval
});

// ========== STOP/PAUSE BUTTON ==========
stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    isRunning = false;
});

// ========== RESET BUTTON ==========
resetBtn.addEventListener("click", () => {
    // Stop the timer
    clearInterval(timer);
    timer = null;
    isRunning = false;
    
    // Reset all time variables
    seconds = 0;
    minutes = 0;
    hours = 0;
    
    // Reset lap counter
    lapCount = 0;
    
    // Update display
    updateDisplay();
    
    // Clear lap list
    lapList.innerHTML = "";
    
    // Reset lap counter display
    lapCounter.innerHTML = "0";
});

// ========== LAP BUTTON ==========
lapBtn.addEventListener("click", () => {
    lapCount++;
    
    // Update lap counter display
    lapCounter.innerHTML = lapCount;
    
    // Create new lap item
    const li = document.createElement("li");
    
    // Get current time
    const currentTime = formatTime();
    
    li.innerHTML = `
        <span>Lap ${lapCount}</span>
        <span>${currentTime}</span>
    `;
    
    // Add to top of list (latest lap first)
    lapList.prepend(li);
});

// ========== INITIAL DISPLAY ==========
updateDisplay();