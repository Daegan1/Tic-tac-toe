let x = `<svg xmlns='http://www.w3.org/2000/svg' height='100' viewBox='0 0 329.26933 329' width='100%'>
<path fill="white" d='m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0' />
</svg>`;

let o = `
<svg viewBox='0 0 100 100' width='100' height='100'>
<circle cx='50' cy='50' r='42' stroke='beige' stroke-width='12' fill='none' />
</svg>`;

// 1.) create array of arrays with each elment being a combo list of integer that equal a possible combo
// EXAMPLE ARRAY OF ARRAYS: =>  [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
const combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let playersTurn = true;
let postionsOfX = [];
let postionsOfO = [];
let board = [];
let tiles = document.querySelectorAll(".board  div");
let container = document.querySelector(".container");
let overlay = document.createElement("div");
let xoDiv = document.createElement("div");
let startNewGame = document.createElement("button");
let draw = () => postionsOfX.concat(postionsOfO).join("");

// o
// 3.)  create function for Anouncing winner

function announceWinner(player) {
  overlay.className = "overlay-win";
  xoDiv.innerHTML = player;
  overlay.append(xoDiv);
  container.append(overlay);
  startNewGame.innerHTML = "Start New Game";
  startNewGame.addEventListener("click", () => {
    newGame();
  });
  overlay.append(startNewGame);
}

// 4.) create frunction for announcing a draw
function announceDraw() {
  overlay.className = "overlay-draw";
  xoDiv.innerHTML = `${x} ${o}`;
  overlay.append(xoDiv);
  container.append(overlay);
  startNewGame.innerHTML = "Draw";
  startNewGame.addEventListener("click", () => {
    newGame();
  });
  overlay.append(startNewGame);
}

// 5.) create function for checking if a player won game
function checkWin(player, name) {
  for (let i = 0; i < combos.length; i++) {
    let reg = new RegExp("[" + player.join("") + "]{3}", "ig");
    let currentPlayer = combos[i].join("").match(reg);

    if (currentPlayer) {
      announceWinner(name);
    }
    if (draw().length === 9) {
      announceDraw();
    }
  }
}

// 6.) create function for handle Click for every tile when it is clicked it should take either x or o shape
function handleClick(e) {
  let t = e.target;

  if (playersTurn) {
    t.innerHTML = x;
    postionsOfX.push(t.id);
    checkWin(postionsOfX, x);
  } else {
    t.innerHTML = o;
    postionsOfO.push(t.id);
    checkWin(postionsOfO, o);
  }
  playersTurn = !playersTurn;
  board.push(t.id);
  t.removeEventListener("click", handleClick, true);
}

// 7.) create a function that activates all tiles so that they are ready to be clicked
function activateTiles() {
  tiles.forEach((tile) => {
    tile.addEventListener("click", handleClick, true);
  });
}

// 8.) create a function that will start a new game.
function newGame() {
  overlay.remove();
  tiles.forEach((tile) => {
    tile.innerHTML = "";
  });
  playersTurn = true;
  postionsOfX = [];
  postionsOfO = [];
  board = [];
  activateTiles();
}
activateTiles();
