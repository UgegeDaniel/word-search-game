const config = {
  board: {
    rows: 12,
    columns: 10,
    initGridStyling: function (gridContainerId) {
      const gridContainer = document.querySelector(gridContainerId);
      gridContainer.style.setProperty("--gridColumnSize", `${this.columns}`);
      gridContainer.style.setProperty("--gridRowSize", `${this.rows}`);
    },
  },
  gameContainerId: "#grid-container",
  listOfWords: {
    containerId: "#found-words",
    wordLength: 4,
    rowOfWords: 1,
  },
  numberOfWordsToFind: 3,
  showSolution: {
    show: true,
    solveButtonId: "#solveButton",
  },
  newGameButtonId: "#new",
  newGameCallback: function () {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
  },
  instructionsId: "instructions",
  themeId: "#wordTheme",
  timer: {
    duration: 20,
    containerId: "#timer",
    timerCallback: function () {
      const winLose = document.querySelector("#win-lose");
      const overlay = document.querySelector("#overlay");
      const currentPlay = document.querySelector("#current-play");
      const worldRecord = document.querySelector("#world-record");

      overlay.style.display = "block";
      winLose.innerText = `You Lose 😢`;
      currentPlay.innerText = `Current Time : ${100}`;
      worldRecord.innerText = `World Record 🥇: `;
    },
  },
  onSuccess: function () {
    console.log("You Won !!!");
  },
};
