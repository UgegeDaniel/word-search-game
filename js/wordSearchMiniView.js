"use strict";

/** This object contains the necessary functions to create the 'view' of the word search,
 * which essentially refers to displaying the puzzle and handling mouse events!
 *
 * @author Ugege Daniel
 *
 * @param {Array[]} matrix - 2D array containing the filled word search grid
 * @param {Array[]} list - 2D array containing the list of words in the grid
 * @param {String} config.gameContainerId - div ID for the word search container
 * @param {String} config.listOfWords.containerId - div ID for the container displaying list of words to find
 * @param {String} config.instructionsId - ID for the h2 heading, to update as necessary
 */

/** this function encapsulates all the touch events for making a move by breaking it down
 * into three main parts: touching down (touchstart), moving (touchmove),
 * and releasing the touch (touchend)!
 */

function WordSearchMiniView(matrix, list) {
  //variable to store if the puzzle was solved by the player or by the solve button!
  var selfSolved = true;

  //object to hold oft-used class/id/attribute names!
  var names = {
    cell: "cell",
    pivot: "pivot",
    selectable: "selectable",
    selected: "selected",
    path: "path",
  };

  //object to hold oft-used class/id selectors
  var select = {
    cells: "." + names.cell,
    pivot: "#" + names.pivot,
    selectable: "." + names.selectable,
    selected: "." + names.selected,
  };

  var searchGrid = {
    row: "row",
    column: "column",
  };

  /* creates the word search puzzle grid and the table containing the list
   * of words to find
   */
  this.setUpView = function () {
    createSearchGrid(
      matrix,
      names.cell,
      searchGrid.row,
      searchGrid.column,
      config.gameContainerId
    );
    createListOfWords(list, config.listOfWords.containerId);
  };

  /** used buttons because <td> would expand when adding border when found - stylistic purposes**/

  /** this funcion makes a 'table' of divs to store each letter in the matrix of letters
   * created in wordsearchlogic.js
   *
   * @param {Array[]} matrix
   * @param {String} cellName
   * @param {String} rowAttr
   * @param {String} colAttr
   * @param {String} boardId
   */
  function createSearchGrid(matrix, cellName, rowAttr, colAttr, boardId) {
    //loops through rows
    for (var i = 0; i < matrix.length; i++) {
      //creates a div for the table row and gives it a row class
      var row = $("<div/>");
      row.attr({ class: "boardRow" }); //only really used once, so it's not in a variable

      //loops through columns
      for (var j = 0; j < matrix[i].length; j++) {
        //each letter in the row is a button element
        var letter = $("<button/>"); //i hearbuttons are preferred for clickable actions

        //the letter is given a cell class, and given row and column attributes!
        letter
          .attr({
            class: cellName,
            [rowAttr]: i,
            [colAttr]: j,
          })
          .text(matrix[i][j]); //sets text of button to the respective matrix index

        //adds letter to the larger row element
        letter.appendTo(row);
      }

      //adds the row of letters to the larger game board element
      row.appendTo($(boardId));
    }
  }

  /** This function creates a table-type object to insert all the words
   * contained in the word search puzzle! players refer to this table
   * when looking for words to find
   *
   * @param {Array[]} wordList a matrix of words to insert into list container
   * @param {String} wordListId the ID of the container!
   */
  function createListOfWords(wordList, wordListId) {
    // Clear existing content of the container
    $(wordListId).empty();

    // Loop through rows
    // Create a div for the row
    var row = $("<div/>");
    row.attr({ class: "listRow" }); // Give the rows a list row class
    for (var i = 0; i < wordList.length; i++) {
      // Loop through columns (words in the row)
      for (var j = 0; j < wordList[i].length; j++) {
        var word = $("<span/>");

        // Check if the word is not empty
        if (wordList[i][j]) {
          // Give the word a class and set its text
          word.attr({
            class: "listWord",
            text: wordList[i][j].replace(/\W/g, ""),
          });

          // Set the text of the word
          word.text(wordList[i][j]);

          // Add the word to the row
          word.appendTo(row);
        }
      }

      // Add the row of words to the larger word list div
      row.appendTo($(wordListId));
    }
  }

  this.solve = function (wordLoc, matrix) {
    /** converts the object into an array and loops through each index to find
     * the word with the coordinates/orientation properties, setting the words to found!
     *
     * @param {String} word - the (trimmed) word placed in the puzzle
     */
    Object.keys(wordLoc).forEach(function (word) {
      //path of the word
      var p = wordLoc[word].p;

      //the x and y value the word starts from
      var startX = wordLoc[word].x;
      var startY = wordLoc[word].y;

      /** initialized variables: k - for word length
       *						   x - for starting x/row
       *						   y - for starting y/column
       *
       * conditions: k - less than total length of word
       *
       * increments: k - incremented by 1,
       *			   x & y - incremented by x & y functions for path p inside
       *			   object 'incr'
       */
      for (
        var k = 0, x = startX, y = startY;
        k < word.length;
        k++, x = incr[p](x, y).x, y = incr[p](x, y).y
      ) {
        //finds the puzzle cell with the respective x and y value and sets it as found
        $(select.cells + "[row = " + x + "][column = " + y + "]").addClass(
          "found"
        );
      }

      //set to false since the program solved it for the player
      selfSolved = false;

      //checks if valid word made (which it was)
      validWordMade(list, word, config.instructionsId);
    });
  };

  this.triggerTouchDrag = function () {
    // Empty array to store the selected cells in a move
    var selectedLetters = [];

    // Empty string to store the word made by a move
    var wordMade = "";

    // Variable to store if the touch is active
    var touchIsActive = false;

    // Function to handle the touchstart event
    function handleTouchStart(event) {
      // Prevent default touch behavior
      event.preventDefault();

      // Get the touch coordinates
      var touchX = event.touches[0].clientX;
      var touchY = event.touches[0].clientY;

      // Get the cell element under the touch coordinates
      var touchedCell = document.elementFromPoint(touchX, touchY);

      // Ensure that the touched element is a valid cell
      if (touchedCell && touchedCell.classList.contains(names.cell)) {
        // Set touch as active
        touchIsActive = true;

        // Select the touched cell
        touchedCell.classList.add(names.selected);

        // Set the touched cell as the pivot
        touchedCell.id = names.pivot;

        // Highlight valid directions
        highlightValidDirections($(touchedCell), matrix, names.selectable);
      }
    }

    // Function to handle the touchmove event
    function handleTouchMove(event) {
      // Prevent default touch behavior
      event.preventDefault();

      // Check if touch is active
      if (touchIsActive) {
        // Get the touch coordinates
        var touchX = event.touches[0].clientX;
        var touchY = event.touches[0].clientY;

        // Get the cell element under the touch coordinates
        var touchedCell = document.elementFromPoint(touchX, touchY);

        // Ensure that the touched element is a valid cell and selectable
        if (touchedCell && touchedCell.classList.contains(names.selectable)) {
          // Clear previous selection
          selectedLetters.forEach(function (cell) {
            if (cell && cell[0].classList.contains(names.selected)) {
              cell[0].classList.remove(names.selected);
            }
          });
          selectedLetters = [];

          // Reset word made
          wordMade = "";

          // Select range of cells
          var cells = selectCellRange(
            select.cells,
            $(touchedCell),
            names.path,
            touchedCell.getAttribute(names.path),
            selectedLetters,
            wordMade
          );

          wordMade = cells.word;
          selectedLetters = cells.array;
        }
      }
    }

    // Function to handle the touchend event
    function handleTouchEnd(event) {
      // Prevent default touch behavior
      event.preventDefault();

      // Check if touch was active
      if (touchIsActive) {
        // Set touch as inactive
        touchIsActive = false;

        // End the touch move
        endTouch();
      }
    }

    /* highlights all the valid directions in the matrix from where mouse is first clicked, like
     * top -> bottom, left -> right, and both diagonals!
     *
     * @param {jQuery} selectedCell - DOM element the mouse pressed down on (a cell in the word search puzzle!)
     * @param {Array[]} matrix - the puzzle 2D array
     * @param {String} makeSelectable - selector to make an element selectable
     */
    function highlightValidDirections(selectedCell, matrix, makeSelectable) {
      //gets the row and column of where the cell the mouse pressed on is
      var cellRow = parseInt(selectedCell.attr(searchGrid.row));
      var cellCol = parseInt(selectedCell.attr(searchGrid.column));

      //converts the global paths object into an array
      Object.keys(paths).forEach(function (path) {
        //path - each property's name (e.g. 'vert', 'priDiagBack')

        //makes each cell in each of the paths selectable
        makeRangeSelectable(
          cellRow,
          cellCol,
          matrix.length,
          paths[path],
          makeSelectable
        );
      });
    }
    function makeRangeSelectable(x, y, l, p, selectable) {
      /** initialized variables: x - starting row, incremented to exclude the pivot
       *						   y - starting column, incremented to exclude the pivot
       *
       * condition: x & y to stay within recommended bounds for path p
       *			  (determined by object bounds)
       *
       * increments: x & y - incremented by function determined for path p (by
       *			   object 'incr')
       */
      for (
        var i = incr[p](x, y).x, j = incr[p](x, y).y; //initialized variables
        bounds[p](i, j, l); //condition
        i = incr[p](i, j).x, j = incr[p](i, j).y
      ) {
        //increments

        //select the specific DOM elements with the specific row/column attribute values
        $(
          "[" +
            searchGrid.row +
            "= " +
            i +
            "][" +
            searchGrid.column +
            "= " +
            j +
            "]"
        )
          .addClass(selectable) //makes it selectable
          .attr({ [names.path]: p }); //gives it a path attribute with the value of p
      }
    }

    // Add touch event listeners to the game container
    document
      .querySelector(config.gameContainerId)
      .addEventListener("touchstart", handleTouchStart);
    document
      .querySelector(config.gameContainerId)
      .addEventListener("touchmove", handleTouchMove);
    document
      .querySelector(config.gameContainerId)
      .addEventListener("touchend", handleTouchEnd);

    $(select.cells).mouseup(function () {
      endTouch();
    });

    // Function to end touch movement
    function endTouch() {
      // Check if a valid word was made
      //checks if a word on the list was selected
      if (validWordMade(list, wordMade, config.instructionsId)) {
        $(select.selected).addClass("foundCell");
        document.querySelectorAll(".foundCell").forEach((foundCell) => {
          foundCell.style.backgroundColor = "#6D7CFF";
        });
      }

      $(select.selected).removeClass(names.selected);

      //removes the direction attributes of any cells (prevents strange behavior)
      $(select.cells).removeAttr(names.path);

      //removes the pivot's ID so a new pivot can be selected
      $(select.pivot).removeAttr("id");

      //remove selectability of selectable cells
      $(select.selectable).removeClass(names.selectable);

      //empties the word string and selected cells' array
      wordMade = "";
      selectedLetters = [];
    }
    function selectCellRange(
      cellsSelector,
      hoveredCell,
      pathAttr,
      path,
      selectedCells,
      wordConstructed
    ) {
      //variable to hold index of cell hovered on
      var hoverIndex;

      //variable to hold index of pivot
      var pivotIndex;

      //selector for cells in the particular path the mouse is on
      var cellRange = cellsSelector + "[" + pathAttr + " =" + path + "]";

      //setting indices depending on how the paths flow
      switch (path) {
        case paths.vert:
        case paths.horizon:
        case paths.priDiag:
        case paths.secDiag:
          //hoverIndex > pivotIndex
          hoverIndex = hoveredCell.index(cellRange) + 1;
          pivotIndex = 0;

          //sets up wordConstructed with the pivot's letter (to start it off)
          wordConstructed = $(select.pivot).text();

          //using the pivot text, selects cells and adds their text to wordConstructed
          wordConstructed = selectLetters(
            selectedCells,
            wordConstructed,
            cellRange,
            pivotIndex,
            hoverIndex
          );

          break;

        case paths.vertBack:
        case paths.horizonBack:
        case paths.priDiagBack:
        case paths.secDiagBack:
          //hoverIndex < pivotIndex
          hoverIndex = hoveredCell.index(cellRange);
          pivotIndex = $(cellRange).length;

          //selects range of cells between the pivot and the cell the mouse is on
          wordConstructed += selectLetters(
            selectedCells,
            wordConstructed,
            cellRange,
            hoverIndex,
            pivotIndex
          );

          //adds pivot text to the end
          wordConstructed += $(select.pivot).text();

          break;
      }

      return { word: wordConstructed, array: selectedCells };
    }

    /** this function selects the range of cells between the pivot cell and the
     * the cell the mouse is hovered, and adds their text to the constructed word's string
     *
     * @param {Array} selectedCells - array to hold
     * @param {String} wordConstructed - word being created by user
     * @param {String} range - the path on which to select cells
     * @param {Number} lowerIndex - index of the lower cell
     * @param {Number} upperIndex - index of the higher cell
     * @return returns the word made during the selection process!
     */
    function selectLetters(
      selectedCells,
      wordConstructed,
      range,
      lowerIndex,
      upperIndex
    ) {
      //only goes through the the range between the pivot and wherever the mouse is on the path!
      $(range)
        .slice(lowerIndex, upperIndex)
        .each(function () {
          //selects the cell
          $(this).addClass(names.selected);

          //adds it to the array of cells
          selectedCells.push($(this));

          //updates the word being made to include the newest cell's letter
          wordConstructed += $(this).text();
        });

      return wordConstructed;
    }

    /** checks if the word a user made after a move is an actual word to find, and
     * if so, sets the word as found! otherwise, nothing happens (so the move is
     * essentially ignored)
     *
     * @param {Array[]} wordList - matrix of words in the grid
     * @param {String} wordToCheck - word to check for validity
     * @param {String} config.instructionsId - selector for the h2 heading
     * @return true if the word made is a word in the list
     */
    function validWordMade(list, wordToCheck) {
      //loops through rows
      for (var i = 0; i < list.length; i++) {
        //loops through columns
        for (var j = 0; j < list[i].length; j++) {
          //trims the word at the index (to make comparison easier)
          var trimmedWord = list[i][j].replace(/\W/g, "");

          //if the word user made is the same as the trimmed word, or the reverse of it
          if (
            wordToCheck == trimmedWord ||
            wordToCheck == reversedWord(trimmedWord)
          ) {
            //sets the word inside the list div as found (changes color, strikethroughs text)
            $(".listWord[text = " + trimmedWord + "]").addClass("foundWord");

            //checks if the last word to find was found
            checkPuzzleSolved(
              ".listWord",
              ".listWord.found",
              config.instructionsId
            );

            return true;
          }
        }
      }
    }

    /** checks if all the words in the puzzle have been found, what method was used to
     * solve the puzzle, and updates the h2 instructions heading accordingly
     *
     * @param {String} fullList - selector for words in the wordlist div
     * @param {String} foundWordsList - selector found words in the wordlist div
     * @param {String} config.instructionsId - selector for h2 instructions heading
     * @return true if the entire word search has been solved
     */
    function checkPuzzleSolved(fullList, foundWordsList) {
      //if all the words in the list to find have been found (no. of words to find == no. of found words)
      if ($(fullList).length == $(foundWordsList).length) {
        //if user solved the puzzle themselves
        if (selfSolved) {
          config.onSuccess();
        } else {
          console.log("You clicked the auto solve button");
        }

        return true;
      }

      return false;
    }

    /** reverses a string! (e.g. 'muscat' becomes 'tacsum')
     *
     * @param {String} word - word to reverse
     * @return the reversed word
     */
    function reversedWord(word) {
      //creates empty string to store reversed word
      var reversedWord = "";

      //loops through from end of word to the beginning (instead of traditional beginning to end)
      for (var i = word.length - 1; i >= 0; i--) {
        //adds the character to reversed word
        reversedWord += word.charAt(i);
      }

      return reversedWord;
    }
  };
}
