let target;
const text = document.getElementById("text");
const guess = document.getElementById("guess");
const h2 = document.getElementById("h2");
const attemptsDisplay = document.getElementById("attempts");
const stopwatch = document.getElementById("stopwatch");
const newGameBtn = document.getElementById("newGameBtn");
const execBtn = document.getElementById("execBtn");
let game_over = false;
let currentSettings;
let tries = 0;
let timeLeft;
let timerId;
let selectedDifficulty = null;

// Best scores object
let bestScores = {
    BEGINNER: null,
    NORMAL: null,
    HARD: null,
    NIGHTMARE: null
};

// Load best scores from localStorage
function loadBestScores() {
    const saved = localStorage.getItem('numberGuesserBestScores');
    if (saved) {
        bestScores = JSON.parse(saved);
    }
}

// Save best scores to localStorage
function saveBestScores() {
    localStorage.setItem('numberGuesserBestScores', JSON.stringify(bestScores));
}

// Load on page load
loadBestScores();

const difficulties = Object.freeze({
    BEGINNER: "BEGINNER",
    NORMAL: "NORMAL",
    HARD: "HARD",
    NIGHTMARE: "NIGHTMARE"
});

let BEGINNER = {
    min: 1,
    max: 100,
    tries: 25,
    timeLimit: null
};
let NORMAL = {
    min: 1,
    max: 400,
    tries: 25,
    timeLimit: null
};
let HARD = {
    min: 1,
    max: 100,
    tries: null,
    timeLimit: 30
};
let NIGHTMARE = {
    min: 1,
    max: 30,
    tries: null,
    timeLimit: 8
};

const settings = {
    BEGINNER,
    NORMAL,
    HARD,
    NIGHTMARE
};

function exec(){
    let player_guess = Number(guess.value);
    
    if (currentSettings === undefined) {
        text.textContent = "Please pick a difficulty first!";
        return;
    }

    if (game_over === true) {
        text.textContent = "The game is already over! Pick a difficulty to play again.";
        return;
    }
    
    // Validate input
    if (isNaN(player_guess) || guess.value.trim() === '') {
        text.textContent = `⚠️ Please enter a valid number between ${currentSettings.min} and ${currentSettings.max}`;
        return;
    }
    
    if (player_guess < currentSettings.min || player_guess > currentSettings.max) {
        text.textContent = `⚠️ Enter a number between ${currentSettings.min} and ${currentSettings.max}`;
        return;
    }
    
    tries++;
    attemptsDisplay.textContent = tries;
    const dist = 5;

    if (player_guess === target) {
        // Check if it's a new best score
        let isBestScore = false;
        if (bestScores[selectedDifficulty] === null || tries < bestScores[selectedDifficulty]) {
            bestScores[selectedDifficulty] = tries;
            saveBestScores();
            isBestScore = true;
        }
        
        let message = `🎉 YOU GOT IT! The number was ${target}. Attempts: ${tries}`;
        if (isBestScore && bestScores[selectedDifficulty] === tries) {
            message += ` ⭐ NEW BEST SCORE!`;
        } else if (bestScores[selectedDifficulty] && tries > bestScores[selectedDifficulty]) {
            message += ` (Best: ${bestScores[selectedDifficulty]})`;
        }
        text.textContent = message;
        game_over = true;
        clearInterval(timerId);
        showNewGameButton();
    }

    else if (currentSettings.tries !== null && tries >= currentSettings.tries){
        text.textContent = `❌ GAME OVER! You ran out of tries. The number was ${target}. Attempts: ${tries}`
        game_over = true;
        clearInterval(timerId);
        showNewGameButton();
    }

    else if (Math.abs(player_guess - target) <= dist) {
        if (player_guess < target) {
            text.textContent = `🔥 So close! But a bit low. (Try ${tries})`;
        } else {
            text.textContent = `🔥 So close! But a bit high. (Try ${tries})`;
        }
    }
    else if (player_guess < target) {
        text.textContent = `📈 Too low! Guess higher. (Try ${tries})`;
    }
    else {
        text.textContent = `📉 Too high! Guess lower. (Try ${tries})`;
    }
    
    // Clear input for next guess
    guess.value = '';
}

function startGame(chosenDifficulty) {
    selectedDifficulty = chosenDifficulty;
    currentSettings = settings[chosenDifficulty];
    
    // Update active button
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-difficulty="${chosenDifficulty}"]`).classList.add('active');
    
    h2.textContent = `Guess the number from ${currentSettings.min} to ${currentSettings.max}!`
    guess.max = currentSettings.max;
    guess.min = currentSettings.min;
    guess.value = '';
    
    target = Math.floor(Math.random() * (currentSettings.max - currentSettings.min + 1)) + currentSettings.min;
    tries = 0;
    attemptsDisplay.textContent = '0';
    game_over = false;
    timeLeft = currentSettings.timeLimit;
    text.textContent = '';
    
    // Hide new game button
    newGameBtn.style.display = 'none';
    execBtn.disabled = false;
    guess.disabled = false;

    clearInterval(timerId);

    if (currentSettings.timeLimit !== null) {
        stopwatch.textContent = currentSettings.timeLimit;
        timerId = setInterval(() => {
            timeLeft--;
            stopwatch.textContent = `${timeLeft}`
            if (timeLeft <= 0) {
                text.textContent = `⏱️ You are out of time! The number was ${target}`
                game_over = true;
                clearInterval(timerId);
                showNewGameButton();
            }
        }, 1000);
     } else {
        stopwatch.textContent = '∞';
    }
}

function showNewGameButton() {
    newGameBtn.style.display = 'block';
    execBtn.disabled = true;
    guess.disabled = true;
}

function resetGame() {
    text.textContent = '';
    guess.value = '';
    attemptsDisplay.textContent = '0';
    h2.textContent = 'Select a difficulty to start';
    stopwatch.textContent = '-';
    newGameBtn.style.display = 'none';
    execBtn.disabled = false;
    guess.disabled = false;
    
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    selectedDifficulty = null;
    currentSettings = undefined;
    game_over = false;
    tries = 0;
    clearInterval(timerId);
}

// Allow Enter key to submit guess
guess.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        exec();
    }
});

