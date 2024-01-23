import { dictionary } from "./words.js";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  query,
  orderBy,
  setDoc,
  limit,
  doc,
} from "firebase/firestore";
import "./styles/style.css";
import moment from "moment/moment.js";

const firebaseConfig = {
  apiKey: "AIzaSyDow6irU4JBsVVK0o2GMEB-hWsPRODIBqI",
  authDomain: "wordsearch-1c639.firebaseapp.com",
  projectId: "wordsearch-1c639",
  storageBucket: "wordsearch-1c639.appspot.com",
  messagingSenderId: "720872680972",
  appId: "1:720872680972:web:ae5dcf92a8bd69eab60829",
  measurementId: "G-RS70ZNN9BB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);




//Select DOM elements
const gridContainer = document.querySelector("#grid-container");
const selectedLetters = document.querySelector("#selected-letters");
const foundWords = document.querySelector("#found-words");
const timer = document.querySelector("#timer");
const overlay = document.querySelector("#overlay");
const newGame = document.querySelector("#new");
const winLose = document.querySelector("#win-lose");
const currentPlay = document.querySelector("#current-play");
const worldRecord = document.querySelector("#world-record");
const restartButton = document.querySelector("#restart");
const signInButton = document.getElementById("signInBtn");
// const signOutButton = document.getElementById("signOutBtn");


// const currentURL =  window.location.href;
// const url = new URL(currentURL);
// let numOfAttempts = url.searchParams.get('numberofAttempts') || 0;

const wordsToHide = 3; // Change number of words to hide in the grid here
const breakTime = 5; // in minutes;
const noOfAttemptsForBreak = 16; // add +1 to whatever number you want
const minWordLength = 4;
const maxWordLength = 4;
const enabledWordLangages = ["english"]; // check words.js to know what languages are available
const mustInclude = ["spanish", "french", "english"]; // will only work if words to hide == mustIncludelength. It will override enabled word languages variable if defined
let highlightColor;
let userSelected;
let win = false;
let lose = false;
const time = 12; // Change the time limit for the game here
let timeLimit = time;
let timeToFindWords = []; // The time taken to find each hidden word

// AUTHENTICATION

const provider = new GoogleAuthProvider();

signInButton.onclick = () =>
  signInWithPopup(auth, provider).then((res) => console.log(res));
// signOutButton.onclick = () => signOut(auth);
console.log("I changed");
auth.onAuthStateChanged((user) => {
  if (user) {
    restartButton.addEventListener("click", () => {
      startNewGame(user, "restart");
      
    });
    newGame.addEventListener("click", () => {
      startNewGame(user);
    });
    startNewGame(user);
    signInButton.hidden = true;
  } else {
    console.log("this is me");
    signInButton.hidden = false;
  }
});

async function startNewGame(user, mode) {
  const gameRef = collection(db, "test");
  const docRef = doc(gameRef, `${user.uid}`);
  const docSnap = await getDoc(docRef);

  

  if (
    docSnap.data() &&
    moment
      .duration(moment().diff(moment(docSnap.data().lastBreakTime)))
      .asMinutes() <= breakTime
  )
    return;
  wordDictionary = getWords();
  while (foundWords.hasChildNodes()) {
    foundWords.removeChild(foundWords.firstChild);
  }
  while (gridContainer.hasChildNodes()) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  win = false;
  lose = false;
  timeLimit = time;
  overlay.style.display = "none";
  timeToFindWords = [];
  

  startTimer(mode);
  setUpGame();

}

function getWords() {
  // Removing words longer than seven letters from the dictionary
  let language_keys = [];

  if (mustInclude && mustInclude.length == wordsToHide) {
    language_keys = mustInclude; // if words that must be included are there
  } else {
    for (let i = 0; i < wordsToHide; i++) {
      let currentRandLanguageIndex = Math.floor(
        Math.random() * enabledWordLangages.length
      );
      language_keys.push(enabledWordLangages[currentRandLanguageIndex]);
    }
  }

  console.log(language_keys);

  // Selecting words at random from the dictionary to input into the grid

  let word = [];

  for (let language_key of language_keys) {
    // fileter language array selection

    let filteredLanguageArray = dictionary[language_key].filter(
      (word) => word.length >= minWordLength && word.length <= maxWordLength
    );

    let potentialWord;

    do {
      potentialWord =
        filteredLanguageArray[
          Math.floor(Math.random() * filteredLanguageArray.length)
        ];
    } while (word.includes(potentialWord));

    word.push(potentialWord);
  }
  console.log(word);
  return word;
}

let wordDictionary = getWords(); // selected words from dictionary array

function startTimer(mode) {
  const interval = setInterval(() => {
    if (mode) {
      clearInterval(interval);
    }
    if (timeLimit === 0 || win || lose) {
      lose = true;
      overlay.style.display = "block";
      clearInterval(interval);

      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const gameRef = collection(db, "test");
          const docRef = doc(gameRef, `${user.uid}`);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            await setDoc(doc(gameRef, `${user.uid}`), {
              gamesPlayed: docSnap.data().gamesPlayed + 1,
              email: user.email,
              lastBreakTime:
                docSnap.data().sessions.length % noOfAttemptsForBreak ==
                noOfAttemptsForBreak - 1
                  ? moment().utc().format()
                  : docSnap.data().lastBreakTime,
              sessions: [
                ...docSnap.data().sessions,
                {
                  win,
                  finalTime: time - timeLimit,
                  timeToFindWords,
                },
              ],
              displayName: user.displayName,
            });
          } else {
            setDoc(doc(gameRef, `${user.uid}`), {
              gamesPlayed: 1,
              email: user.email,
              lastBreakTime: moment().subtract(1, "day").utc().format(),
              sessions: [
                {
                  win,
                  finalTime: time - timeLimit,
                  timeToFindWords,
                },
              ],
              displayName: auth.currentUser.displayName,
            });
          }
        }
      });



      winLose.innerText = win ? "You Win!!! 🎉" : `You Lose 😢`;
      currentPlay.innerText = `Current Time : ${120 - timeLimit}`;
      worldRecord.innerText = `World Record 🥇: `;
             
      return;
    }

    timer.innerText = `${Math.floor(timeLimit / 60)}:${
      timeLimit % 60 < 10 ? "0" + `${timeLimit % 60}` : `${timeLimit % 60}`
    }`;
    timeLimit--;
  }, 1000);
}

// setup new game

function setUpGame() {
  wordDictionary.forEach((word) => {
    let container = document.createElement("span");
    let found = document.createTextNode(word);
    container.append(found);
    foundWords.appendChild(container);
  });

  //Grid Customization
  const gridRowSize = 12;
  const gridColumnSize = 10;

  var options = {
    cols: gridColumnSize,
    rows: gridRowSize,
    dictionary: wordDictionary,
    maxWords: 20,
    backwardsProbability: 0.3,
    upperCase: true,
    diacritics: true,
  };

  let rawData = new WordSearch(options);
  let mainData = rawData.grid; // that is the array of arrays
  let mergedArray = mergeArray();

  // Merge Array data into a single array
  function mergeArray() {
    let gridData = rawData.grid;
    gridData = [].concat([], ...gridData);
    return gridData;
  }

  let itemPositions = [];
  // Store all grid letter positions in itempositions array
  mainData.forEach((arr, y) => {
    arr.forEach((letter, x) => {
      itemPositions = [...itemPositions, [x, y]];
    });
  });

  // Create grid items and store positions in a data attribute
  const createGridItems = (array) => {
    array.forEach((letter, index) => {
      const item = document.createElement("div");
      item.dataset.position = `[${itemPositions[index]}]`;
      const text = document.createTextNode(letter);
      item.appendChild(text);
      item.classList.add("grid-items");
      gridContainer.appendChild(item);
    });
  };

  createGridItems(mergedArray);

  // Dynamically change grid size by styling with js
  gridContainer.style.setProperty("--gridColumnSize", `${gridColumnSize}`);
  gridContainer.style.setProperty("--gridRowSize", `${gridRowSize}`);

  gridContainer.childNodes.forEach((item) => {
    item.addEventListener("touchstart", appendFirstLetter);
    item.addEventListener("mousedown", appendFirstLetter);
    item.addEventListener("mouseup", stopInteraction);

    item.addEventListener("touchend", stopInteraction);
  });
}

// To Handle Interactions

const handleMouseOver = (e) => {
  let firstSelectionX;
  let firstSelectionY;
  let secondSelectionX;
  let secondSelectionY;
  let previousSelectionX;
  let previousSelectionY;
  let currentSelectionX = JSON.parse(e.target.dataset.position)[0];
  let currentSelectionY = JSON.parse(e.target.dataset.position)[1];

  if (userSelected.length < 2) {
    userSelected = [...userSelected, e.target];
    e.target.style.backgroundColor = highlightColor;
    e.target.style.color = "white";
  } else {
    firstSelectionX = JSON.parse(userSelected[0].dataset.position)[0];
    firstSelectionY = JSON.parse(userSelected[0].dataset.position)[1];
    secondSelectionX = JSON.parse(userSelected[1].dataset.position)[0];
    secondSelectionY = JSON.parse(userSelected[1].dataset.position)[1];
    previousSelectionX = JSON.parse(
      userSelected[userSelected.length - 1].dataset.position
    )[0];
    previousSelectionY = JSON.parse(
      userSelected[userSelected.length - 1].dataset.position
    )[1];

    if (
      firstSelectionX + 1 == secondSelectionX &&
      firstSelectionY == secondSelectionY &&
      currentSelectionX == previousSelectionX + 1 &&
      currentSelectionY == previousSelectionY
    ) {
      userSelected = [...userSelected, e.target];
      e.target.style.backgroundColor = highlightColor;
      e.target.style.color = "white";
    }

    if (
      firstSelectionX + 1 == secondSelectionX &&
      firstSelectionY - 1 == secondSelectionY &&
      currentSelectionX - 1 == previousSelectionX &&
      currentSelectionY + 1 == previousSelectionY
    ) {
      userSelected = [...userSelected, e.target];
      e.target.style.backgroundColor = highlightColor;
      e.target.style.color = "white";
    }

    if (
      firstSelectionX - 1 == secondSelectionX &&
      firstSelectionY == secondSelectionY &&
      currentSelectionX == previousSelectionX - 1 &&
      currentSelectionY == previousSelectionY
    ) {
      userSelected = [...userSelected, e.target];
      e.target.style.backgroundColor = highlightColor;
      e.target.style.color = "white";
    }

    if (
      firstSelectionX - 1 == secondSelectionX &&
      firstSelectionY + 1 == secondSelectionY &&
      currentSelectionX + 1 == previousSelectionX &&
      currentSelectionY - 1 == previousSelectionY
    ) {
      userSelected = [...userSelected, e.target];
      e.target.style.backgroundColor = highlightColor;
      e.target.style.color = "white";
    }
    if (
      firstSelectionX == secondSelectionX + 1 &&
      firstSelectionY - 1 == secondSelectionY &&
      currentSelectionX + 1 == previousSelectionX &&
      currentSelectionY + 1 == previousSelectionY
    ) {
      userSelected = [...userSelected, e.target];
      e.target.style.backgroundColor = highlightColor;
      e.target.style.color = "white";
    }

    if (
      firstSelectionY + 1 == secondSelectionY &&
      firstSelectionX == secondSelectionX &&
      currentSelectionY == previousSelectionY + 1 &&
      currentSelectionX == previousSelectionX
    ) {
      userSelected = [...userSelected, e.target];
      e.target.style.backgroundColor = highlightColor;
      e.target.style.color = "white";
    }

    if (
      firstSelectionX + 1 == secondSelectionX &&
      firstSelectionY + 1 == secondSelectionY &&
      currentSelectionX - 1 == previousSelectionX &&
      currentSelectionY - 1 == previousSelectionY
    ) {
      userSelected = [...userSelected, e.target];
      e.target.style.backgroundColor = highlightColor;
      e.target.style.color = "white";
    }

    if (
      firstSelectionY - 1 == secondSelectionY &&
      firstSelectionX == secondSelectionX &&
      currentSelectionY == previousSelectionY - 1 &&
      currentSelectionX == previousSelectionX
    ) {
      userSelected = [...userSelected, e.target];
      e.target.style.backgroundColor = highlightColor;
      e.target.style.color = "white";
    }
  }

  let userWord = "";
  for (let i = 0; i < userSelected.length; i++) {
    userWord += userSelected[i].innerText.toLowerCase();
  }
  selectedLetters.innerText = userWord;
};

const handleTouch = (e) => {
  e.preventDefault();

  let element = document.elementFromPoint(
    e.touches[0].clientX,
    e.touches[0].clientY
  );

  if (
    userSelected.includes(element) ||
    !element.classList.contains("grid-items")
  ) {
    return;
  }
  console.dir(element);
  if (userSelected.length < 2) {
    userSelected = [...userSelected, element];
    element.style.backgroundColor = highlightColor;
    element.style.color = "white";
  } else {
    let firstSelectionX = JSON.parse(userSelected[0].dataset.position)[0];
    let firstSelectionY = JSON.parse(userSelected[0].dataset.position)[1];
    let secondSelectionX = JSON.parse(userSelected[1].dataset.position)[0];
    let secondSelectionY = JSON.parse(userSelected[1].dataset.position)[1];
    let previousSelectionX = JSON.parse(
      userSelected[userSelected.length - 1].dataset.position
    )[0];
    let previousSelectionY = JSON.parse(
      userSelected[userSelected.length - 1].dataset.position
    )[1];
    let currentSelectionX = JSON.parse(element.dataset.position)[0];
    let currentSelectionY = JSON.parse(element.dataset.position)[1];

    if (
      firstSelectionX + 1 == secondSelectionX &&
      firstSelectionY == secondSelectionY &&
      currentSelectionX == previousSelectionX + 1 &&
      currentSelectionY == previousSelectionY
    ) {
      userSelected = [...userSelected, element];
      element.style.backgroundColor = highlightColor;
      element.style.color = "white";
    }

    if (
      firstSelectionX + 1 == secondSelectionX &&
      firstSelectionY - 1 == secondSelectionY &&
      currentSelectionX - 1 == previousSelectionX &&
      currentSelectionY + 1 == previousSelectionY
    ) {
      userSelected = [...userSelected, element];
      element.style.backgroundColor = highlightColor;
      element.style.color = "white";
    }

    if (
      firstSelectionX - 1 == secondSelectionX &&
      firstSelectionY == secondSelectionY &&
      currentSelectionX == previousSelectionX - 1 &&
      currentSelectionY == previousSelectionY
    ) {
      userSelected = [...userSelected, element];
      element.style.backgroundColor = highlightColor;
      element.style.color = "white";
    }

    if (
      firstSelectionX - 1 == secondSelectionX &&
      firstSelectionY + 1 == secondSelectionY &&
      currentSelectionX + 1 == previousSelectionX &&
      currentSelectionY - 1 == previousSelectionY
    ) {
      userSelected = [...userSelected, element];
      element.style.backgroundColor = highlightColor;
      element.style.color = "white";
    }
    if (
      firstSelectionX == secondSelectionX + 1 &&
      firstSelectionY - 1 == secondSelectionY &&
      currentSelectionX + 1 == previousSelectionX &&
      currentSelectionY + 1 == previousSelectionY
    ) {
      userSelected = [...userSelected, element];
      element.style.backgroundColor = highlightColor;
      element.style.color = "white";
    }

    if (
      firstSelectionY + 1 == secondSelectionY &&
      firstSelectionX == secondSelectionX &&
      currentSelectionY == previousSelectionY + 1 &&
      currentSelectionX == previousSelectionX
    ) {
      userSelected = [...userSelected, element];
      element.style.backgroundColor = highlightColor;
      element.style.color = "white";
    }

    if (
      firstSelectionX + 1 == secondSelectionX &&
      firstSelectionY + 1 == secondSelectionY &&
      currentSelectionX - 1 == previousSelectionX &&
      currentSelectionY - 1 == previousSelectionY
    ) {
      userSelected = [...userSelected, element];
      element.style.backgroundColor = highlightColor;
      element.style.color = "white";
    }

    if (
      firstSelectionY - 1 == secondSelectionY &&
      firstSelectionX == secondSelectionX &&
      currentSelectionY == previousSelectionY - 1 &&
      currentSelectionX == previousSelectionX
    ) {
      userSelected = [...userSelected, element];
      element.style.backgroundColor = highlightColor;
      element.style.color = "white";
    }
  }

  let userWord = "";

  for (let i = 0; i < userSelected.length; i++) {
    userWord += userSelected[i].innerText.toLowerCase();
  }
  selectedLetters.innerText = userWord;
};

function stopInteraction() {
  checkInput();
  gridContainer.childNodes.forEach((item) => {
    item.removeEventListener("mouseover", handleMouseOver);
    item.removeEventListener("touchmove", handleTouch);
  });
}

function appendFirstLetter(e) {
  e.preventDefault();
  highlightColor = `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`;
  userSelected = [e.target];
  selectedLetters.innerText = e.target.innerText.toLowerCase(); // HUGE ORANGE TEXT
  e.target.style.backgroundColor = highlightColor;
  e.target.style.color = "white";

  gridContainer.childNodes.forEach((item) => {
    item.addEventListener("touchmove", handleTouch);
    item.addEventListener("mouseover", handleMouseOver);
  });
}
window.addEventListener("mouseup", stopInteraction); // to stop highlighting if user ends on a non grid item

function checkInput() {
  var userWord = "";

  for (let i = 0; i < userSelected.length; i++) {
    userWord += userSelected[i].innerText.toLowerCase();
  }

  if (wordDictionary.includes(userWord)) {
    userSelected.forEach((item) => {
      item.classList.add("correct");
    });

    if (timeToFindWords.length >= 1) {
      let final = timeToFindWords.reduce((prev, item) => {
        return prev + item;
      }, 0);

      timeToFindWords.push(time - final - timeLimit);
    } else {
      timeToFindWords.push(time - timeLimit);
    }

    userSelected = [];
    let highlightedWord;

    foundWords.childNodes.forEach((child) => {
      if (child.innerText === userWord) {
        highlightedWord = child;
      }
    });

    highlightedWord.style.color = highlightColor;
    highlightedWord.classList.add("found");
    highlightedWord.style.setProperty("--lineWidth", "100%");
    highlightedWord.style.setProperty("--lineColor", `${highlightColor}`);
    let array = [];

    foundWords.childNodes.forEach((child) => {
      if (child.classList.contains("found")) {
        array.push(child);
      }
    });
    if (array.length == wordsToHide) {
      win = true;
    }
  } else {
    userSelected.forEach((item) => {
      if (item.classList.contains("correct")) {
        return;
      } else {
        item.style.backgroundColor = "white";
        item.style.color = "black";
      }
    });
    userSelected = [];
  }
}
