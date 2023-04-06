const gameBtns = document.getElementsByClassName("gameBtn");
let player1;
let player2;
//factory function to create players
const playerFactory = (name, playerPiece) => {
  return { name, playerPiece };
};
player1 = playerFactory(
  localStorage.getItem("player1name"),
  localStorage.getItem("player1piece")
);
player2 = playerFactory(
  localStorage.getItem("player2name"),
  localStorage.getItem("player2piece")
);
console.log(localStorage.getItem("player2name"));
//object for game board
const gameboardObject = (() => {
  let gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  function displayBoard() {
    for (let x = 0; x < 9; x++) {
      gameBtns[x].innerHTML = gameboard[x];
    }
  }
  return { displayBoard, gameboard };
})();

//object for game
const game = (() => {
  let turn = player1;
  let winner = false;
  function checkForWinner() {
    const winners = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    for (let x = 0; x < 8; x++) {
      if (
        gameboardObject.gameboard[winners[x][0]] === turn.playerPiece &&
        gameboardObject.gameboard[winners[x][1]] === turn.playerPiece &&
        gameboardObject.gameboard[winners[x][2]] === turn.playerPiece
      ) {
        document.getElementById("winnerAlert").style.visibility = "visible";
        document.getElementById("winnerId").innerHTML =
          turn.name + " is The Winner";
        winner = true;
      }
    }
  }
  function addMove(x) {
    if (gameboardObject.gameboard[x] === " " && winner === false) {
      console.log(turn);
      gameboardObject.gameboard[x] = turn.playerPiece;
    }
    gameboardObject.displayBoard();
    checkForWinner();
    turn === player1 ? (turn = player2) : (turn = player1);
  }
  return { addMove, turn };
})();

//change turn on button click
function addEvents() {
  function changeItem(buttonNum) {
    gameBtns[buttonNum].innerHTML = "X";
  }
  for (let x = 0; x < 9; x++) {
    gameBtns[x].addEventListener("click", function () {
      game.addMove(x);
    });
  }
}
//player one piece chosen
let tempPlayer1;
let tempPlayer2;
function player1Chosen(playerPiece) {
  if (tempPlayer1) {
    if (document.getElementById("name").value) {
      tempPlayer2 = playerFactory(
        document.getElementById("name").value,
        playerPiece
      );
      localStorage.setItem("player1name", tempPlayer1.name);
      localStorage.setItem("player1piece", tempPlayer1.playerPiece);
      localStorage.setItem("player2name", tempPlayer2.name);
      localStorage.setItem("player2piece", tempPlayer2.playerPiece);
      window.location.href = "board.html";
    }
  } else if (document.getElementById("name").value) {
    tempPlayer1 = playerFactory(
      document.getElementById("name").value,
      playerPiece
    );
    document.getElementById("getUserInput").innerHTML =
      "Enter Name for Player 2";
    document.getElementById(playerPiece).parentElement.remove();
    document.getElementById("name").value = "";
  }
}
