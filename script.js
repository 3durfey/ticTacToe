const gameBtns = document.getElementsByClassName("gameBtn");
const player1Display = document.getElementById("player1");
const player2Display = document.getElementById("player2");

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
function setNames() {
  player1Display.innerHTML =
    localStorage.getItem("player1name") +
    "(" +
    localStorage.getItem("player1piece") +
    ")";
  player2Display.innerHTML =
    localStorage.getItem("player2name") +
    "(" +
    localStorage.getItem("player2piece") +
    ")";
  player1Display.style.color = "green";
  game.AI = true;
}
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
//AI for move
const AIobject = (() => {
  let AIPiece = " ";
  let userPiece = " ";
  let userNum = 0;
  function randomMove() {
    for (let x = 0; x < 9; x++) {
      if (gameboardObject.gameboard[x] === " ") {
        game.addMove(x);
        break;
      }
    }
  }
  function move(AI) {
    //set piece values, x or o
    AIPiece = AI;
    AIPiece === "X" ? (userPiece = "O") : (userPiece = "X");
    //first turn
    if (game.turnNum === 1) {
      if (gameboardObject.gameboard[0] === "X") {
        game.addMove(4);
        return;
      } else if (gameboardObject.gameboard[2] === " ") {
        game.addMove(2);
        return;
      } else if (gameboardObject.gameboard[6] === " ") {
        game.addMove(6);
        return;
      } else if (gameboardObject.gameboard[8] === " ") {
        game.addMove(8);
        return;
      }
    }
    userNum = 0;
    for (let x = 0; x < 9; x++) {
      if (gameboardObject.gameboard[x] === userPiece) {
        userNum = userNum + x;
      }
    }
    switch (userNum) {
      case 1:
        game.addMove(2);
        break;
      case 2:
        game.addMove(1);
        break;
      case 3:
        if (gameboardObject.gameboard[1] === userPiece) {
          game.addMove(0);
        } else {
          game.addMove(6);
        }
        break;
      case 4:
        if (gameboardObject.gameboard[1] === userPiece) {
          game.addMove(6);
        } else {
          game.addMove(8);
        }
        break;
      case 5:
        game.addMove(7);
        break;
      case 7:
        if (gameboardObject.gameboard[2] === userPiece) {
          game.addMove(8);
        } else if (gameboardObject.gameboard[3] === userPiece) {
          game.addMove(5);
        } else {
          game.addMove(3);
        }
        break;
      case 6:
        if (gameboardObject.gameboard[0] === userPiece) {
          game.addMove(3);
        } else {
          game.addMove(6);
        }
        break;
      case 8:
        game.addMove(4);
        break;
      case 10:
        if (gameboardObject.gameboard[2] === userPiece || game.turnNum > 5) {
          game.addMove(5);
        } else {
          game.addMove(2);
        }
        break;
      case 9:
        if (gameboardObject.gameboard[2] === " ") {
          game.addMove(0);
        } else {
          randomMove();
        }
        break;
      case 11:
        game.addMove(1);
        break;
      case 12:
        game.addMove(0);
        break;
      case 13:
        if (gameboardObject.gameboard[5] === userPiece) {
          game.addMove(2);
        } else {
          game.addMove(8);
        }
        break;
      case 14:
        if (gameboardObject.gameboard[7] === " ") {
          game.addMove(7);
        } else {
          randomMove();
        }
        break;
      case 15:
        if (gameboardObject.gameboard[6] === " ") {
          game.addMove(6);
        } else {
          randomMove();
        }
        break;
      default:
        randomMove();
    }
  }
  return { move };
})();
//object for game
const game = (() => {
  let turnNum = 0;
  let turn = player1;
  let winner = false;
  let AI = false;
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
      gameboardObject.gameboard[x] = turn.playerPiece;
    }
    gameboardObject.displayBoard();
    checkForWinner();
    turn === player1 ? (turn = player2) : (turn = player1);
    if (turn === player1 && winner === false) {
      player1Display.style.color = "green";
      player2Display.style.color = "black";
    } else {
      player2Display.style.color = "green";
      player1Display.style.color = "black";
    }
    this.turnNum++;
    if ((AI = true && turn.name === "AI")) {
      AIobject.move(turn.playerPiece);
    }
  }
  return { addMove, turn, AI, turnNum };
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
//player one piece chosen-----------------------------------------------------------------
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
    document.getElementById("AI").style.visibility = "visible";
    document.getElementById("AI").style.position = "relative";
    document.getElementById("name").value = "";
  }
}
function reset() {
  window.location.href = "index.html";
}
function vsAI() {
  localStorage.setItem("player1name", tempPlayer1.name);
  localStorage.setItem("player1piece", tempPlayer1.playerPiece);

  localStorage.setItem("player2name", "AI");
  if (tempPlayer1.playerPiece === "X") {
    localStorage.setItem("player2piece", "O");
  } else {
    localStorage.setItem("player2piece", "X");
  }
  window.location.href = "board.html";
}
