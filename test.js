012;
345;
678;
let gameboard = [" ", "x", " ", "x", " ", "x", " ", " ", "x"];
let userSpots = 0;
let blank = true;
let userPiece = "x";
let AI = "AI";
let limit = 6;
let limit2 = 2;
let directionRight = 1;
let directionUpDown = 3;
let x = 0;
for (let y = 0; y <= limit; y += directionUpDown) {
  userSpots = 0;
  blank = -1;

  for (x = 0; x <= limit2; x += directionRight) {
    if (gameboard[y + x] === userPiece) {
      userSpots++;
    } else if (gameboard[y + x] === " ") {
      blank = y + x;
    }
  }
  if (userSpots > 1 && blank != -1) {
    gameboard[blank] = AI;
  } else {
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

console.log(gameboard);
