document.addEventListener("DOMContentLoaded", () => {
  const coin = document.getElementById("coin");
  const flipBtn = document.getElementById("flip-btn");
  const headsBtn = document.getElementById("heads-btn");
  const tailsBtn = document.getElementById("tails-btn");
  const resetBtn = document.getElementById("reset-btn");
  const result = document.getElementById("result");
  const headsCount = document.getElementById("heads-count");
  const tailsCount = document.getElementById("tails-count");
  const winCount = document.getElementById("win-count");

  let heads = 0;
  let tails = 0;
  let wins = 0;
  let userChoice = null;
  let isFlipping = false;

  // Event Listeners
  flipBtn.addEventListener("click", flipCoin);
  headsBtn.addEventListener("click", () => chooseSide("heads"));
  tailsBtn.addEventListener("click", () => chooseSide("tails"));
  resetBtn.addEventListener("click", resetGame);

  // Functions
  function chooseSide(side) {
    if (isFlipping) return;

    userChoice = side;
    result.textContent = `You chose ${side}`;
    result.classList.add("show");

    // Highlight selected button
    if (side === "heads") {
      headsBtn.style.transform = "scale(1.05)";
      headsBtn.style.boxShadow = "0 0 15px rgba(255, 158, 0, 0.5)";
      tailsBtn.style.transform = "";
      tailsBtn.style.boxShadow = "";
    } else {
      tailsBtn.style.transform = "scale(1.05)";
      tailsBtn.style.boxShadow = "0 0 15px rgba(76, 201, 240, 0.5)";
      headsBtn.style.transform = "";
      headsBtn.style.boxShadow = "";
    }
  }

  function flipCoin() {
    if (isFlipping || userChoice === null) {
      if (userChoice === null) {
        result.textContent = "Please choose Heads or Tails first!";
        result.classList.add("show");
        setTimeout(() => {
          result.classList.remove("show");
        }, 2000);
      }
      return;
    }

    isFlipping = true;
    flipBtn.disabled = true;
    headsBtn.disabled = true;
    tailsBtn.disabled = true;

    // Reset result display
    result.classList.remove("show");

    // Add flipping animation
    coin.classList.add("flipping");

    // Determine result after animation
    setTimeout(() => {
      const random = Math.random();
      const isHeads = random < 0.5;

      // Update counts
      if (isHeads) {
        heads++;
        headsCount.textContent = heads;
      } else {
        tails++;
        tailsCount.textContent = tails;
      }

      // Check if user won
      const userWon =
        (isHeads && userChoice === "heads") ||
        (!isHeads && userChoice === "tails");

      if (userWon) {
        wins++;
        winCount.textContent = wins;
        result.textContent = "You Win! 🎉";
        createConfetti();
      } else {
        result.textContent = "You Lose! 😢";
      }

      // Show result
      result.classList.add("show");

      // Reset coin position
      setTimeout(() => {
        coin.style.transform = `rotateY(${isHeads ? 0 : 1800}deg)`;
        coin.classList.remove("flipping");
        isFlipping = false;
        flipBtn.disabled = false;
        headsBtn.disabled = false;
        tailsBtn.disabled = false;
      }, 100);
    }, 3000);
  }

  function resetGame() {
    heads = 0;
    tails = 0;
    wins = 0;
    userChoice = null;

    headsCount.textContent = "0";
    tailsCount.textContent = "0";
    winCount.textContent = "0";

    result.textContent = "";
    result.classList.remove("show");

    coin.style.transform = "rotateY(0)";
    coin.classList.remove("flipping");

    headsBtn.style.transform = "";
    headsBtn.style.boxShadow = "";
    tailsBtn.style.transform = "";
    tailsBtn.style.boxShadow = "";

    isFlipping = false;
    flipBtn.disabled = false;
    headsBtn.disabled = false;
    tailsBtn.disabled = false;
  }

  function createConfetti() {
    const colors = ["#ff9e00", "#7b2cbf", "#4cc9f0", "#f72585", "#7209b7"];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  }
});
