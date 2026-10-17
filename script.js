// ==========================
// ELEMENTOS
// ==========================

const timerElement = document.getElementById("timer");
const progressCircle = document.getElementById("progress-ring");

const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");

const themeButton = document.getElementById("theme-toggle");
const colorButton = document.getElementById("color-toggle");

const modeButtons = document.querySelectorAll(".mode-button");

// ==========================
// ESTADO
// ==========================

let timerInterval = null;

let duration = 25 * 60;
let timeLeft = duration;

// ==========================
// SVG
// ==========================

const radius = 120;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = 0;

// ==========================
// COLORES
// ==========================

const ringColors = [
    "#1f1f1f",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6"
];

let currentColor = 0;

// ==========================
// UTILIDADES
// ==========================

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
}

// ==========================
// UI
// ==========================

function updateTimerDisplay() {

    timerElement.textContent =
        formatTime(timeLeft);
}

function updateProgressRing() {

    const progress =
        (duration - timeLeft) / duration;

    const offset =
        circumference * (1 - progress);

    progressCircle.style.strokeDashoffset =
        offset;
}

// ==========================
// TEMPORIZADOR
// ==========================

function startTimer() {

    if (timerInterval) return;

    timerInterval = setInterval(() => {

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timerInterval = null;

            alert("Tiempo finalizado");

            return;
        }

        timeLeft--;

        updateTimerDisplay();
        updateProgressRing();

    }, 1000);
}

function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;
}

function resetTimer() {

    pauseTimer();

    timeLeft = duration;

    updateTimerDisplay();
    updateProgressRing();
}

// ==========================
// MODOS
// ==========================

function setMode(minutes, button) {

    modeButtons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    duration = minutes * 60;

    resetTimer();
}

modeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const minutes =
            Number(button.dataset.minutes);

        setMode(minutes, button);

    });

});

// ==========================
// TEMA OSCURO
// ==========================

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeButton.textContent = "☀";
    }
}

function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    themeButton.textContent =
        isDark ? "☀" : "☾";

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );
}

// ==========================
// COLOR DEL RING
// ==========================

function changeRingColor() {

    currentColor++;

    if (currentColor >= ringColors.length) {
        currentColor = 0;
    }

    document.documentElement.style.setProperty(
        "--ring-color",
        ringColors[currentColor]
    );
}

// ==========================
// EVENTOS
// ==========================

startButton.addEventListener(
    "click",
    startTimer
);

pauseButton.addEventListener(
    "click",
    pauseTimer
);

resetButton.addEventListener(
    "click",
    resetTimer
);

themeButton.addEventListener(
    "click",
    toggleTheme
);

colorButton.addEventListener(
    "click",
    changeRingColor
);

// ==========================
// INICIO
// ==========================

loadTheme();

updateTimerDisplay();

updateProgressRing();