# Word Search Project Documentation

## Overview

The Word Search project is a JavaScript-based application that allows users to play word search puzzles interactively. It includes functionalities for displaying the word search grid, listing the words to find, enabling users to select words by dragging over the grid, and solving the puzzle.

## Configuration

The project utilizes a configuration file (`config.js`) to specify various settings and parameters. This configuration file helps customize the behavior and appearance of the Word Search game. Below is an explanation of the configuration options:

```javascript
"use strict";

const config = {
  // Function to run before the game starts. Should return a boolean.
  validateGamePlay: () => {},

  // Configuration for the game board
  board: {
    boardSize: 10, // Size of the game board
    rows: 10, // Number of rows in the game board
    columns: 10, // Number of columns in the game board (should be greater than or equal to the number of rows)
    initGridStyling: function (gridContainerId) {
      // Function to initialize grid styling based on board size
    },
  },

  // ID of the container for the game grid
  gameContainerId: "#grid-container",

  // Configuration for the list of words
  listOfWords: {
    containerId: "#found-words", // ID of the container for the found words (words to find)
    wordLength: 4, // Length of words to find
    rowOfWords: 1, // Number of rows in the list of words
  },

  // Number of words to find in the game
  numberOfWordsToFind: 3,

  // Configuration for showing the solution
  showSolution: {
    show: false, // Whether to show the solution
    solveButtonId: "#solveButton", // ID of the solve button
  },

  // ID of the button to start a new game
  newGameButtonId: "#newGame",

  // Function to execute when starting a new game
  newGameCallback: function () {
    // Update attempt balance and wallet balance display
    // Hide overlay
  },

  // ID of the instructions element
  instructionsId: "instructions",

  // ID of the theme element
  themeId: "#wordTheme",

  // Configuration for the timer
  timer: {
    duration: 20, // Duration of the timer in seconds
    containerId: "#timer", // ID of the timer container
    timerCallback: function () {
      // Function to execute when the timer expires
    },
  },

  // Function to execute when the puzzle is successfully solved
  // Remember to call stopCountdownTimer
  onSuccess: function () {},
};
```


## Usage

To use the Word Search project, follow these steps:

1. Include the `config.js` file in your HTML document.

   ```html
   <script src="config.js"></script>
   ```

2. Create a `<div>` element in your HTML document with the specified `gameContainerId` and `listOfWords.containerId`.

   ```html
   <div id="wordSearchContainer"></div>
   <div id="wordListContainer"></div>
   ```

3. Optionally, include an `<h2>` element with the specified `instructionsId` to display instructions or status updates.

   ```html
   <h2 id="instructions"></h2>
   ```

4. Initialize the Word Search game by creating an instance of the `WordSearchView` class with the provided matrix and list of words.

   ```javascript
   const wordSearchView = new WordSearchView(matrix, list);
   wordSearchView.setUpView();
   ```

5. Trigger mouse events to enable users to interact with the word search grid.

   ```javascript
   wordSearchView.triggerMouseDrag();
   ```

6. (Optional) Customize the `onSuccess` callback function to perform specific actions when the puzzle is solved.

   ```javascript
   function puzzleSolvedCallback() {
     // Add custom logic here
     console.log("Congratulations! You have solved the puzzle!");
   }
   ```

## Conclusion

The Word Search project provides a customizable and interactive word search game experience. By configuring the settings in the `config.js` file, developers can tailor the game to suit their needs and preferences.
