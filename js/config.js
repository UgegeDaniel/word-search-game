const config = {
  board: {
    rows: 12,
    columns: 10,
    initGridStyling: function (gridContainerId) {
      const gridContainer = document.querySelector(gridContainerId);
      console.log(gridContainer, gridContainerId);
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
  newGameButtonId: "newGameButton",
  instructionsId: "instructions",
  themeId: "#wordTheme",
  timer: {
    duration: 20,
    containerId: "#timer",
    timerCallback: function () {
      console.log("Game over");
    },
  },
  onSuccess: function () {
    console.log("You Won !!!");
  },
};
