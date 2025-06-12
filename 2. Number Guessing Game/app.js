// Game variables
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let bestScore = localStorage.getItem("bestScore") || null;
let minRange = 1;
let maxRange = 100;

// DOM elements
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const messageEl = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const bestScoreEl = document.getElementById("best-score");
const rangeEl = document.getElementById("range");

// Initialize best score display
if (bestScore) {
  bestScoreEl.textContent = bestScore;
}

// Event listeners
guessButton.addEventListener("click", checkGuess);
guessInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});

// Main game function
function checkGuess() {
  const userGuess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(userGuess)) {
    showMessage("Please enter a valid number!", "error");
    return;
  }

  if (userGuess < minRange || userGuess > maxRange) {
    showMessage(
      `Please enter a number between ${minRange} and ${maxRange}!`,
      "error"
    );
    return;
  }

  // Increment attempts
  attempts++;
  attemptsEl.textContent = attempts;

  // Check guess
  if (userGuess === secretNumber) {
    showMessage(
      `🎉 Congratulations! You guessed the number in ${attempts} attempts!`,
      "success"
    );
    createConfetti();
    updateBestScore();
    resetGame();
  } else if (userGuess < secretNumber) {
    minRange = userGuess + 1;
    showMessage(
      `Too low! Try a number between ${minRange} and ${maxRange}.`,
      "error"
    );
    updateRange();
  } else {
    maxRange = userGuess - 1;
    showMessage(
      `Too high! Try a number between ${minRange} and ${maxRange}.`,
      "error"
    );
    updateRange();
  }

  // Clear input and focus
  guessInput.value = "";
  guessInput.focus();
}

// Helper functions
function showMessage(msg, type) {
  messageEl.textContent = msg;
  messageEl.className = "message show";

  if (type === "error") {
    messageEl.classList.add("error");
  } else {
    messageEl.classList.remove("error");
  }

  setTimeout(() => {
    messageEl.classList.remove("show");
  }, 3000);
}

function updateBestScore() {
  if (!bestScore || attempts < bestScore) {
    bestScore = attempts;
    bestScoreEl.textContent = bestScore;
    localStorage.setItem("bestScore", bestScore);
  }
}

function updateRange() {
  rangeEl.textContent = `${minRange}-${maxRange}`;
}

function resetGame() {
  setTimeout(() => {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsEl.textContent = attempts;
    minRange = 1;
    maxRange = 100;
    updateRange();
    showMessage("New game started! Guess between 1 and 100.", "success");
  }, 2000);
}

function createConfetti() {
  const colors = ["#ff2d75", "#ff7aa8", "#6c00b3", "#00e676", "#ffffff"];
  const container = document.querySelector(".game-container");

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = -10 + "px";
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.width = Math.random() * 10 + 5 + "px";
    confetti.style.height = Math.random() * 10 + 5 + "px";

    document.body.appendChild(confetti);

    const animationDuration = Math.random() * 3 + 2;

    const animation = confetti.animate(
      [
        { top: "-10px", opacity: 1 },
        { top: "100vh", opacity: 0 },
      ],
      {
        duration: animationDuration * 1000,
        easing: "cubic-bezier(0.1, 0.8, 0.9, 1)",
      }
    );

    animation.onfinish = () => {
      confetti.remove();
    };
  }
}
