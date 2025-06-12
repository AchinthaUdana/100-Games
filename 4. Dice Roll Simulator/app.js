document.addEventListener("DOMContentLoaded", () => {
  const dice1 = document.getElementById("dice1");
  const dice2 = document.getElementById("dice2");
  const rollBtn = document.getElementById("rollBtn");
  const historyList = document.getElementById("historyList");

  let rollHistory = [];
  let canRoll = true;

  // Function to get a random number between 1 and 6
  function getRandomRoll() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Function to rotate dice to show a specific face
  function rotateDice(dice, face) {
    const rotations = {
      1: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
      2: "rotateX(0deg) rotateY(180deg) rotateZ(0deg)",
      3: "rotateX(0deg) rotateY(90deg) rotateZ(0deg)",
      4: "rotateX(0deg) rotateY(-90deg) rotateZ(0deg)",
      5: "rotateX(90deg) rotateY(0deg) rotateZ(0deg)",
      6: "rotateX(-90deg) rotateY(0deg) rotateZ(0deg)",
    };

    dice.style.transform = rotations[face];
  }

  // Function to roll the dice
  function rollDice() {
    if (!canRoll) return;

    canRoll = false;
    rollBtn.disabled = true;

    // Add rolling animation
    dice1.classList.add("rolling");
    dice2.classList.add("rolling");

    // Generate random rolls
    const roll1 = getRandomRoll();
    const roll2 = getRandomRoll();

    // Add to history
    rollHistory.unshift(`${roll1} + ${roll2} = ${roll1 + roll2}`);
    if (rollHistory.length > 10) rollHistory.pop();

    // Update history display
    historyList.innerHTML = rollHistory
      .map((roll) => `<div class="history-item">${roll}</div>`)
      .join("");

    // After animation completes, show the result
    setTimeout(() => {
      dice1.classList.remove("rolling");
      dice2.classList.remove("rolling");

      rotateDice(dice1, roll1);
      rotateDice(dice2, roll2);

      canRoll = true;
      rollBtn.disabled = false;
    }, 1000);
  }

  // Event listeners
  rollBtn.addEventListener("click", rollDice);

  // Initialize dice to show random faces
  rotateDice(dice1, getRandomRoll());
  rotateDice(dice2, getRandomRoll());
});
