const gameBtns = document.getElementsByClassName("gameBtn");
const player1Display = document.getElementById("player1");
const player2Display = document.getElementById("player2");

let player1;
let player2;
//factory function to create players
const playerFactory = (name, playerPiece) => {
  return { name, playerPiece };
};
player1 = playerFactory("User", "X");
player2 = playerFactory("AI", "O");
function setNames() {
  player1Display.innerHTML = "User" + "(X)";
  player2Display.innerHTML = "Computer" + "(O)";
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
      if (gameboardObject.gameboard[4] === " ") {
        game.addMove(4);
        return;
      } else if (gameboardObject.gameboard[0] === " ") {
        game.addMove(0);
        return;
      }
    }
    const cornerPieces = [0, 2, 6, 8];
    let userSpots = 0;
    let AIPieces = 0;
    let blank = true;
    let limit = 6;
    let limit2 = 2;
    let directionRight = 1;
    let directionUpDown = 3;
    let x = 0;
    //check if ia can win
    for (let y = 0; y <= limit; y += directionUpDown) {
      blank = -1;
      AIPieces = 0;
      for (x = 0; x <= limit2; x += directionRight) {
        if (gameboardObject.gameboard[y + x] === " ") {
          blank = y + x;
        }
        if (gameboardObject.gameboard[y + x] === AIPiece) {
          AIPieces++;
        }
      }
      if (AIPieces === 2 && blank != -1) {
        game.addMove(blank);
        return;
      }
      if (y === 6 && limit === 6) {
        directionRight = 3;
        directionUpDown = 1;
        limit = 3;
        limit2 = 6;
        y = -1;
        x = -3;
      }
    }
    limit = 6;
    limit2 = 2;
    directionRight = 1;
    directionUpDown = 3;
    //block user from winning
    for (let y = 0; y <= limit; y += directionUpDown) {
      userSpots = 0;
      blank = -1;
      AIPieces = 0;
      for (x = 0; x <= limit2; x += directionRight) {
        if (gameboardObject.gameboard[y + x] === userPiece) {
          userSpots++;
        } else if (gameboardObject.gameboard[y + x] === " ") {
          blank = y + x;
        }
      }
      if (userSpots > 1 && blank != -1) {
        game.addMove(blank);
        return;
      }
      if (y === 6 && limit === 6) {
        directionRight = 3;
        directionUpDown = 1;
        limit = 3;
        limit2 = 6;
        y = -1;
        x = -3;
      }
    }
    //check if ai can win
    const arrayDiagonal = [
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let x = 0; x < 2; x++) {
      blank = -1;
      AIPieces = 0;
      for (let y = 0; y < 3; y++) {
        if (gameboardObject.gameboard[arrayDiagonal[x][y]] === " ") {
          blank = arrayDiagonal[x][y];
        }
        if (gameboardObject.gameboard[arrayDiagonal[x][y]] === AIPiece) {
          AIPieces++;
        }
      }
      if (AIPieces === 2 && blank != -1) {
        game.addMove(blank);
        return;
      }
    }
    //block user from winning
    for (let x = 0; x < 2; x++) {
      userSpots = 0;
      blank = -1;
      for (let y = 0; y < 3; y++) {
        if (gameboardObject.gameboard[arrayDiagonal[x][y]] === userPiece) {
          userSpots++;
        } else if (gameboardObject.gameboard[arrayDiagonal[x][y]] === " ") {
          blank = arrayDiagonal[x][y];
        }
      }
      if (userSpots > 1 && blank != -1) {
        game.addMove(blank);
        return;
      }
    }
    userSpots = 0;
    AIPieces = 0;
    blank = -1;
    for (let x = 0; x < 4; x++) {
      if (gameboardObject.gameboard[cornerPieces[x]] === userPiece) {
        userSpots++;
      } else if (gameboardObject.gameboard[cornerPieces[x]] === AIPiece) {
        AIPieces++;
      } else if (gameboardObject.gameboard[cornerPieces[x]] === " ") {
        blank = cornerPieces[x];
      }
    }
    userSpots = 0;
    AIPieces = 0;
    blank = -1;
    if (userSpots > 1 && blank != -1 && AIPieces != 1) {
      game.addMove(blank);
      return;
    }
    /* if (game.turnNum === 3) {
      let cornerPiecesUser = 0;
      for (let x = 0; x < 4; x++) {
        if (gameboardObject.gameboard[cornerPieces[x]] === userPiece) {
          cornerPiecesUser++;
        }
      }
      if (
        cornerPiecesUser > 1 &&
        (gameboardObject.gameboard[0] !== userPiece ||
          gameboardObject.gameboard[2] !== userPiece) &&
        (gameboardObject.gameboard[6] !== userPiece ||
          gameboardObject.gameboard[8] !== userPiece)
      ) {
        game.addMove(3);
        return;
      }
    } */
    const cornerScenarios1 = [];
    const cornerScenarios2 = [];

    if (gameboardObject.gameboard[4] !== userPiece) {
      if (
        gameboardObject.gameboard[0] === userPiece &&
        (gameboardObject.gameboard[7] === userPiece ||
          gameboardObject.gameboard[8] === userPiece)
      ) {
        if (
          gameboardObject.gameboard[7] === userPiece &&
          gameboardObject.gameboard[6] === " "
        ) {
          game.addMove(6);
          return;
        } else if (gameboardObject.gameboard[7] === " ") {
          game.addMove(7);
          return;
        }
      }
    }

    if (gameboardObject.gameboard[4] !== userPiece) {
      if (
        gameboardObject.gameboard[6] === userPiece &&
        gameboardObject.gameboard[2] === userPiece
      ) {
        if (gameboardObject.gameboard[7] === " ") {
          game.addMove(7);
          return;
        }
      }
    }

    if (gameboardObject.gameboard[4] !== userPiece) {
      if (
        gameboardObject.gameboard[7] === userPiece &&
        gameboardObject.gameboard[2] === userPiece
      ) {
        if (gameboardObject.gameboard[5] === " ") {
          game.addMove(5);
          return;
        }
      }
    }

    for (let z = 0; z < 9; z++) {
      if (gameboardObject.gameboard[z] === " ") {
        game.addMove(z);
        return;
      }
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
    let spots = 0;

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
      if (
        gameboardObject.gameboard[winners[x][0]] !== " " &&
        gameboardObject.gameboard[winners[x][1]] !== " " &&
        gameboardObject.gameboard[winners[x][2]] !== " "
      ) {
        spots += 3;
      }
      if (spots === 9 && x === 2) {
        document.getElementById("winnerAlert").style.visibility = "visible";
        document.getElementById("winnerId").innerHTML = "Draw";
        winner = true;
        return;
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

function reset() {
  window.location.reload();
}
