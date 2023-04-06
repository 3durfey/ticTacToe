//factory function to create players
const playerFactory = (name) => {
  winner = false;
  return { name, winner };
};
const player1 = playerFactory("jon");

console.log();
