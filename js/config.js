const config = {
  boardSize: 10, //a by a
  gameContainerId: "#wordboard",
  listOfWords: { //list of words to find
    containerId: "#wordlist",
    wordLength: 4, //length of words to find
    rowOfWords: 1, //by default this should be set to 1
  },
  numberOfWordsToFind: 5, //number of words to find
  showSolution: {
    show: true,
    solveButtonId: "#solveButton",
  },
  newGameButtonId: "newGameButton",
  instructionsId: "instructions",
  themeId: "#wordTheme",
  timer:{
    duration: 15,
    containerId: "#timer",
    timerCallback: ()=>{
      console.log("Game over")
    }
  },
  onSuccess: () => {
    console.log("You Won !!!")
  }
};
