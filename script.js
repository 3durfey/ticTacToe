const gameBtns = document.getElementsByClassName("gameBtn");

//object for game board
const gameboardObject = (() => {
  let gameboard = ["1", "x", "x", "x", "x", "x", "x", "x", "9"];
  function addMove(x, userPiece) {
    gameboard[x] = userPiece;
    for (let x = 0; x < 9; x++) {
      gameBtns[x].innerHTML = gameboardObject.gameboard[x];
    }
  }
  return { gameboard, addMove };
})();
//facotry function to create players
const playerFactory = (name) => {
  winner = false;
  return { name, winner };
};
//display board
const displayController = (() => {
  function display() {
    for (let x = 0; x < 9; x++) {
      gameBtns[x].innerHTML = gameboardObject.gameboard[x];
    }
  }
  return { display };
})();

displayController.display();

function changeItem(buttonNum) {
  gameBtns[buttonNum].innerHTML = "X";
}
for (let x = 0; x < 9; x++) {
  gameBtns[x].addEventListener("click", function () {
    gameboardObject.addMove(x, "O");
  });
}
