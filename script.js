//object for game board
const gameboardObject = (() => {
  let gameboard = [
    ["1", "x", "x"],
    ["x", "x", "x"],
    ["x", "x", "9"],
  ];
  return { gameboard };
})();
//facotry function to create players
const playerFactory = (name) => {
  return { name };
};
//display board
const displayController = (() => {
  function display() {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        console.log(gameboardObject.gameboard[x][y]);
      }
    }
  }
  return { display };
})();
displayController.display();
