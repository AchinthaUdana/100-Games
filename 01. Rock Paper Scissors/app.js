document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const playerChoiceDisplay = document.getElementById("playerChoice");
  const computerChoiceDisplay = document.getElementById("computerChoice");
  const resultDisplay = document.getElementById("resultDisplay");
  const scoreDisplay = document.getElementById("score");
  const winsDisplay = document.getElementById("wins");
  const lossesDisplay = document.getElementById("losses");
  const drawsDisplay = document.getElementById("draws");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const selectionScreen = document.querySelector(".selection-screen");
  const battleScreen = document.querySelector(".battle-screen");
  const particlesContainer = document.getElementById("particles");

  // Game state
  let score = 0;
  let wins = 0;
  let losses = 0;
  let draws = 0;

  // Initialize particles
  createParticles();

  // Event listeners
  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const playerChoice = button.getAttribute("data-choice");
      playRound(playerChoice);
    });
  });

  playAgainBtn.addEventListener("click", resetGame);

  // Game functions
  function playRound(playerChoice) {
    // Show battle screen
    selectionScreen.classList.add("hidden");
    battleScreen.classList.remove("hidden");

    // Display player choice
    displayChoice(playerChoiceDisplay, playerChoice);

    // Computer makes random choice
    const computerChoice = getComputerChoice();

    // Add delay before showing computer choice
    setTimeout(() => {
      displayChoice(computerChoiceDisplay, computerChoice);

      // Determine winner
      const result = determineWinner(playerChoice, computerChoice);
      displayResult(result);

      // Update score and stats
      updateStats(result);
    }, 800);
  }

  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function displayChoice(element, choice) {
    const iconMap = {
      rock: "hand-rock",
      paper: "hand-paper",
      scissors: "hand-scissors",
    };

    element.innerHTML = `<div class="choice-icon"><i class="fas fa-${iconMap[choice]}"></i></div>`;

    // Add animation class based on choice
    element.classList.remove("pulse", "shake", "float");
    if (choice === "rock") element.classList.add("shake");
    if (choice === "paper") element.classList.add("pulse");
    if (choice === "scissors") element.classList.add("float");
  }

  function determineWinner(player, computer) {
    if (player === computer) return "draw";

    const winConditions = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };

    return winConditions[player] === computer ? "win" : "lose";
  }

  function displayResult(result) {
    setTimeout(() => {
      resultDisplay.className = "result-display " + result;

      switch (result) {
        case "win":
          resultDisplay.textContent = "YOU WIN!";
          createConfetti();
          break;
        case "lose":
          resultDisplay.textContent = "YOU LOSE!";
          break;
        case "draw":
          resultDisplay.textContent = "DRAW!";
          break;
      }
    }, 1000);
  }

  function updateStats(result) {
    switch (result) {
      case "win":
        score++;
        wins++;
        break;
      case "lose":
        score = Math.max(0, score - 1);
        losses++;
        break;
      case "draw":
        draws++;
        break;
    }

    scoreDisplay.textContent = score;
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = losses;
    drawsDisplay.textContent = draws;
  }

  function resetGame() {
    battleScreen.classList.add("hidden");
    selectionScreen.classList.remove("hidden");

    // Reset displays
    playerChoiceDisplay.innerHTML =
      '<div class="choice-icon"><i class="fas fa-question"></i></div>';
    computerChoiceDisplay.innerHTML =
      '<div class="choice-icon"><i class="fas fa-question"></i></div>';
    resultDisplay.textContent = "";
    resultDisplay.className = "result-display";
  }

  function createParticles() {
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random position
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;

      // Random animation
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.1;

      particlesContainer.appendChild(particle);
    }
  }

  function createConfetti() {
    const confettiCount = 50;
    const colors = ["#6c5ce7", "#00cec9", "#55efc4", "#fdcb6e", "#ff7675"];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("particle");

      // Random size between 5px and 10px
      const size = Math.random() * 5 + 5;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.backgroundColor = color;

      // Random position at top
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = `-10px`;

      // Random animation
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 0.5;
      const rotation = Math.random() * 360;
      confetti.style.transform = `rotate(${rotation}deg)`;
      confetti.style.animation = `confettiFall ${duration}s ease-in ${delay}s forwards`;

      particlesContainer.appendChild(confetti);

      // Remove after animation
      setTimeout(() => {
        confetti.remove();
      }, duration * 1000);
    }

    // Add confetti fall animation to styles
    const style = document.createElement("style");
    style.textContent = `
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }
});
