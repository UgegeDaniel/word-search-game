const config = {
  //function to run before game runs return boolean
  validateGamePlay: () => {
    //check if user attempts greater than 0
    //if user attempts is 0 show modal to buy more attempts
    //return false
    return true;
  },
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
    show: false,
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
      // const worldRecord = document.querySelector("#world-record");

      //reduce number of attempts
      overlay.style.display = "block";
      winLose.innerText = `You Lose 😢`;
      currentPlay.innerText = `Current Time : ${100}`;
      // worldRecord.innerText = `World Record 🥇: `;

      //Return to homepage button
      //Try again button
    },
  },
  onSuccess: function () {
    const winLose = document.querySelector("#win-lose");
    const overlay = document.querySelector("#overlay");
    const currentPlay = document.querySelector("#current-play");
    // const worldRecord = document.querySelector("#world-record");

    //reduce number of attempts
    //reward User functionality
    overlay.style.display = "block";
    winLose.innerText = `You Win 🎉`;
    currentPlay.innerText = `Current Time : ${100}`;
    // worldRecord.innerText = `World Record 🥇: `;

    //Return to homepage button
    //Keep playing button
  },
};
